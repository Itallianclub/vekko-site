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

test("server-renders the VEKKO institutional home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Lave seu carro/);
  assert.match(html, /sem pagar por cada lavagem/);
  assert.match(html, /benefits-deck/);
  assert.match(html, /portal-button/);
  assert.match(html, /bi-arrow-up/);
  assert.match(html, /vekko-logo-navbar\.png/);
  assert.match(html, /vekko-symbol\.png/);
  assert.match(html, /golf\.png/);
  assert.match(html, /Planos VEKKO/);
  assert.match(html, /79,90/);
  assert.match(html, /379,90/);
  assert.match(html, /Uberlândia\/MG/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders partner and legal routes", async () => {
  const [partner, privacy, terms] = await Promise.all([
    render("/seja-parceiro"),
    render("/privacidade"),
    render("/termos"),
  ]);

  assert.equal(partner.status, 200);
  assert.equal(privacy.status, 200);
  assert.equal(terms.status, 200);
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
  assert.match(layout, /VEKKO/);
  assert.match(layout, /bootstrap-icons\/font\/bootstrap-icons\.css/);
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
