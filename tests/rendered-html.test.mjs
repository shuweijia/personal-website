import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(html, /CAPABILITIES \/ 能力技能/);
  assert.match(html, /产品与策略/);
  assert.match(html, /AI 与开发/);
  assert.match(html, /02<\/span> INTERNSHIP \/ 实习经历/);
  assert.match(html, /深圳市韶音科技有限公司/);
  assert.match(html, /03<\/span> SELECTED PROJECTS \/ 项目/);
  assert.match(html, /04<\/span> PRACTICE \/ 练习/);
  assert.match(html, /05<\/span> CONNECT \/ 联系/);
  assert.match(html, /MindAnchor 脑波锚点/);
  assert.match(html, /CargoWare CRM/);
  assert.doesNotMatch(html, /守呼卫士|秦溯/);
  assert.match(html, /BEE HIVE/);

  const projectsSection = html.slice(html.indexOf('id="projects"'), html.indexOf('id="practice"'));
  const practiceSection = html.slice(html.indexOf('id="practice"'), html.indexOf('id="connect"'));
  assert.match(projectsSection, /CargoWare CRM/);
  assert.doesNotMatch(projectsSection, /BEE HIVE|蜓火|ICPB/);
  assert.match(practiceSection, /BEE HIVE/);
  assert.match(practiceSection, /蜓火/);
  assert.match(practiceSection, /ICPB/);
  assert.doesNotMatch(practiceSection, /CargoWare CRM/);
  assert.doesNotMatch(html, /DESIGN ARCHIVE|更多设计过程与造型探索|打开档案/);
  assert.doesNotMatch(html, /doodle doodle-(?:a|b)/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("includes the migrated legacy case studies", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /CRM 销售跟进管理系统体验重塑/);
  assert.match(source, /角色与权限定义/);
  assert.match(source, /产品版本演进规划/);
  assert.match(source, /蜓火 · 高楼消防无人机/);
  assert.match(source, /功能与多模态交互创新/);
  assert.match(source, /BEE HIVE · 城市智能养蜂/);
  assert.match(source, /用户旅程与设计机会/);
  assert.match(source, /ICPB · 创意共享充电宝/);
  assert.match(source, /草图构想与最终方案/);
  assert.match(source, /dragonfly-exploded\.png/);
  assert.match(source, /beehive-ideation\.png/);
});
