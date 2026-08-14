import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>舒惟佳 · 产品经理与 AI 开发<\/title>/i);
  assert.match(html, /让复杂系统/);
  assert.match(html, /02<\/span> INTERNSHIP \/ 实习经历/);
  assert.match(html, /深圳市韶音科技有限公司/);
  assert.match(html, /03<\/span> SELECTED PROJECTS \/ 项目/);
  assert.match(html, /04<\/span> PRACTICE \/ 练习/);
  assert.match(html, /05<\/span> CONNECT \/ 联系/);
  assert.match(html, /MindAnchor 脑波锚点/);
  assert.match(html, /CargoWare CRM/);
  assert.match(html, /守呼卫士/);
  assert.match(html, /秦溯/);
  assert.match(html, /BEE HIVE/);
  assert.doesNotMatch(html, /doodle doodle-(?:a|b)/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});
