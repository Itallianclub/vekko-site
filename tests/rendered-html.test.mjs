import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const serverUrl = new URL("../dist/server/index.js", import.meta.url);
  serverUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: handler } = await import(serverUrl.href);

  return handler(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
  );
}

test("server-renders the VEKKO institutional home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Cuidar do seu carro ficou/);
  assert.match(html, /data-magnetic-zone/);
  assert.match(html, /benefits-deck/);
  assert.match(html, /portal-button/);
  assert.match(html, /bi-arrow-up/);
  assert.match(html, /vekko-logo-navbar\.png/);
  assert.match(html, /vekko-symbol\.png/);
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
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
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
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("../app/components/VekkoScene.tsx", import.meta.url)));
  await assert.rejects(access(new URL("../app/chatgpt-auth.ts", import.meta.url)));
  await assert.rejects(access(new URL("../worker/index.ts", import.meta.url)));
  await assert.rejects(access(new URL("../db/index.ts", import.meta.url)));
  await access(new URL("../public/vekko-logo-navbar.png", import.meta.url));
  await access(new URL("../public/vekko-symbol.png", import.meta.url));
});
