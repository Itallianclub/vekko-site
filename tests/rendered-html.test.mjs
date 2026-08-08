import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the VEKKO institutional home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Cuidar do seu carro ficou/);
  assert.match(html, /data-magnetic-zone/);
  assert.match(html, /Planos VEKKO/);
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

test("keeps the institutional experience free of temporary and 3D assets", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /HomeExperience/);
  assert.match(layout, /VEKKO/);
  assert.match(layout, /bootstrap-icons\/font\/bootstrap-icons\.css/);
  assert.match(packageJson, /"bootstrap-icons":/);
  assert.match(packageJson, /"gsap": "3\.15\.0"/);
  assert.doesNotMatch(packageJson, /"three":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("../app/components/VekkoScene.tsx", import.meta.url)));
  await access(new URL("../public/vekko-icon.svg", import.meta.url));
});
