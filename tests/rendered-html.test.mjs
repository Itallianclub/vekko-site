import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test, { after, before } from "node:test";

const port = 43000 + (process.pid % 1000);
const origin = `http://127.0.0.1:${port}`;
let productionServer;

before(async () => {
  const serverEntry = fileURLToPath(
    new URL("../.output/server/index.mjs", import.meta.url),
  );

  productionServer = spawn(process.execPath, [serverEntry], {
    env: {
      ...process.env,
      NITRO_HOST: "127.0.0.1",
      NITRO_PORT: String(port),
    },
    stdio: "ignore",
  });

  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (productionServer.exitCode !== null) {
      throw new Error("A saída de produção encerrou antes de iniciar.");
    }

    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // O servidor ainda está inicializando.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("A saída de produção não respondeu dentro do tempo limite.");
});

after(() => {
  productionServer?.kill();
});

async function render(pathname = "/") {
  return fetch(`${origin}${pathname}`, {
    headers: { accept: "text/html" },
  });
}

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
const ANDROID = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/130 Mobile Safari/537.36";

async function renderAs(userAgent, pathname = "/") {
  const response = await fetch(`${origin}${pathname}`, {
    headers: { accept: "text/html", "user-agent": userAgent },
  });
  return response.text();
}

const visibleText = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

test("server-renders the VEKKO download landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const head = html.slice(0, html.indexOf("</head>"));
  const text = visibleText(html);

  // SEO e Smart App Banner no <head>
  assert.match(head, /<title>VEKKO \| Lavagem de carro por assinatura<\/title>/);
  assert.match(head, /Assine um plano e lave seu carro nos parceiros VEKKO perto de você\. Baixe o app na App Store ou no Google Play\./);
  assert.match(head, /<meta name="apple-itunes-app" content="app-id=6833514367"/);

  // Estrutura e acessibilidade
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1);
  assert.match(html, /<main[^>]*id="conteudo"/);
  assert.match(html, /Pular para o conteúdo/);
  for (const id of ["como-funciona", "planos", "duvidas", "baixar"]) assert.match(html, new RegExp(`id="${id}"`));

  // Header: 3 links + portal, sem menu mobile duplicado
  for (const label of ["Como funciona", "Planos", "Seja parceiro", "Acessar portal"]) assert.match(text, new RegExp(label));
  assert.doesNotMatch(html, /mobile-menu/);

  // Copy aprovada
  assert.match(text, /Seu carro limpo o mês inteiro\. Sem lavar, sem pensar\./);
  assert.match(text, /Ver planos/);
  assert.match(text, /Você já adiou essa lavagem umas três vezes\./);
  assert.match(text, /Da assinatura ao carro limpo em quatro passos\./);
  for (const step of ["Cadastre seu carro.", "Escolha seu plano.", "Ache um parceiro perto.", "Mostre o QR Code e lave."]) {
    assert.ok(text.includes(step), step);
  }
  assert.match(text, /Quantas lavagens você usa por mês\?/);
  for (const price of ["R$ 99,90", "R$ 179,90", "R$ 349,90"]) assert.ok(text.includes(price), price);
  assert.match(text, /Mais escolhido/);
  assert.equal((text.match(/Quero esse plano/g) ?? []).length, 3);
  assert.equal((html.match(/<details class="faq-item"/g) ?? []).length, 4);
  assert.match(text, /Receba clientes recorrentes com a VEKKO\./);
  assert.match(text, /Seu próximo carro limpo está a um download de distância\./);
  assert.match(text, /Grátis para baixar\./);
  // Barra fixa de download + linhas da História
  assert.match(html, /class="download-bar/);
  assert.match(text, /Baixe o app VEKKO/);
  assert.equal((html.match(/class="story-line"/g) ?? []).length, 3);

  // Computador: as duas lojas + QR code
  assert.match(text, /Baixar na App Store/);
  assert.match(text, /Baixar no Google Play/);
  assert.match(text, /Aponte a câmera do celular e baixe em segundos/);

  // O que saiu do site
  assert.doesNotMatch(text, /Ilimitado|Uberlândia|Piloto|Acompanhar lançamento|Em breve/i);
  assert.doesNotMatch(html, /benefits-deck|bootstrap-icons/);
  assert.doesNotMatch(html, /mascot|mascote|swaay|codex-preview|react-loading-skeleton/i);
});

test("shows only the device's store on phones", async () => {
  const [iphone, android] = await Promise.all([renderAs(IPHONE), renderAs(ANDROID)]);
  const iphoneText = visibleText(iphone);
  const androidText = visibleText(android);

  assert.match(iphoneText, /Baixar na App Store/);
  assert.doesNotMatch(iphoneText, /Baixar no Google Play|Aponte a câmera/);
  assert.match(iphone, /href="https:\/\/apps\.apple\.com\/[^"]+"[^>]*>Quero esse plano/);

  assert.match(androidText, /Baixar no Google Play/);
  assert.doesNotMatch(androidText, /Baixar na App Store|Aponte a câmera/);
  assert.match(android, /href="https:\/\/play\.google\.com\/[^"]+"[^>]*>Quero esse plano/);
});

test("redirects the QR code route to the right store", async () => {
  const go = (userAgent) => fetch(`${origin}/baixar`, { headers: { "user-agent": userAgent }, redirect: "manual" });
  const [iphone, android, desktop] = await Promise.all([go(IPHONE), go(ANDROID), go("Mozilla/5.0 (X11; Linux x86_64)")]);
  assert.equal(iphone.status, 302);
  assert.match(iphone.headers.get("location") ?? "", /^https:\/\/apps\.apple\.com\//);
  assert.match(android.headers.get("location") ?? "", /^https:\/\/play\.google\.com\//);
  assert.match(desktop.headers.get("location") ?? "", /\/#baixar$/);
});

test("renders partner, legal and account routes", async () => {
  const [partner, privacy, terms, reset, deleteAccount] = await Promise.all([
    render("/seja-parceiro"),
    render("/privacidade"),
    render("/termos"),
    render("/reset-password"),
    render("/excluir-conta"),
  ]);

  assert.equal(partner.status, 200);
  assert.equal(privacy.status, 200);
  assert.equal(terms.status, 200);
  assert.equal(reset.status, 200);
  assert.equal(deleteAccount.status, 200);
  assert.match(await partner.text(), /Mais clientes para o seu estabelecimento/);
  assert.match(await privacy.text(), /Política de Privacidade/);
  assert.match(await terms.text(), /Termos de Uso/);
});

test("keeps only the dependencies and assets used by the institutional site", async () => {
  const [page, layout, packageJson, viteConfig, vercelConfig] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HomeExperience/);
  assert.match(page, /apple-itunes-app/);
  assert.match(layout, /VEKKO/);
  assert.match(layout, /vekko-symbol\.png/);
  assert.match(packageJson, /"bootstrap-icons":/);
  assert.match(packageJson, /"gsap": "3\.15\.0"/);
  assert.doesNotMatch(packageJson, /"three":/);
  assert.doesNotMatch(packageJson, /@cloudflare\/vite-plugin|drizzle|wrangler/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(packageJson, /"node": "22\.x"/);
  assert.match(packageJson, /"build": "vite build"/);
  assert.match(viteConfig, /nitro\/vite/);
  assert.equal(JSON.parse(vercelConfig).outputDirectory, ".output");
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("../app/components/VekkoScene.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/chatgpt-auth.ts", import.meta.url)));
  await assert.rejects(access(new URL("../worker/index.ts", import.meta.url)));
  await assert.rejects(access(new URL("../db/index.ts", import.meta.url)));
  await access(new URL("../public/vekko-logo-navbar.png", import.meta.url));
  await access(new URL("../public/vekko-symbol.png", import.meta.url));
  await access(new URL("../.output/server/index.mjs", import.meta.url));
});
