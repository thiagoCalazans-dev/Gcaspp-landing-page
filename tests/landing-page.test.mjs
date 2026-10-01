import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { after, before, test } from "node:test";
import { chromium } from "playwright";
import { createStaticServer } from "../scripts/static-server.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
let server;
let browser;
let baseUrl;

before(async () => {
  server = createStaticServer(root);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  const localBrave = "/opt/brave.com/brave-origin/brave";
  browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || (existsSync(localBrave) ? localBrave : undefined),
    headless: true,
    args: ["--no-sandbox"],
  });
});

after(async () => {
  await browser?.close();
  await new Promise((resolve) => server?.close(resolve));
});

test("a visitante vê a oferta e navega entre as seções da página", async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl);
  await assert.doesNotReject(() => page.getByRole("heading", { level: 1, name: /gestão pública/i }).waitFor());
  await page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Soluções", exact: true }).click();
  assert.equal(new URL(page.url()).hash, "#solucoes");
  await assert.doesNotReject(() => page.getByRole("heading", { name: /contabilidade/i }).waitFor());
  await page.close();
});

test("a pergunta digitada abre o WhatsApp comercial com o texto preservado", async () => {
  const context = await browser.newContext();
  await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, body: "OK" }));
  const page = await context.newPage();
  await page.goto(baseUrl);
  await page.getByRole("textbox", { name: /pergunta/i }).fill("  Como funciona a arrecadação & licitação?  ");
  const destination = page.waitForEvent("popup");
  await page.getByRole("button", { name: /enviar pergunta/i }).click();
  const popup = await destination;
  const url = new URL(popup.url());
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/5511933711956");
  assert.equal(url.searchParams.get("text"), "Como funciona a arrecadação & licitação?");
  await context.close();
});

test("uma pergunta vazia permanece na página e orienta a visitante", async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl);
  const input = page.getByRole("textbox", { name: /pergunta/i });
  await input.fill("   ");
  await page.getByRole("button", { name: /enviar pergunta/i }).click();
  assert.equal(await input.getAttribute("aria-invalid"), "true");
  assert.equal(await page.getByRole("alert").textContent(), "Escreva uma pergunta para continuar.");
  assert.equal(page.url(), `${baseUrl}/`);
  await page.close();
});

test("o pedido de demonstração aponta ao WhatsApp comercial", async () => {
  const page = await browser.newPage();
  await page.goto(baseUrl);
  const action = page.getByRole("link", { name: /agendar uma demonstração/i }).first();
  assert.match(await action.textContent(), /WhatsApp/i);
  const href = await action.getAttribute("href");
  const url = new URL(href);
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/5511933711956");
  assert.match(url.searchParams.get("text"), /agendar uma demonstração/i);
  await page.close();
});

test("a navegação móvel alcança as seções sem rolagem lateral", async () => {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(baseUrl);
  await page.locator("summary").click();
  await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Contato" }).click();
  assert.equal(new URL(page.url()).hash, "#contato");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  await page.close();
});
