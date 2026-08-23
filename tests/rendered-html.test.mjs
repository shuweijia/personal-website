import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

test("builds a Vercel-ready static portfolio", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const assets = await readdir(new URL("../dist/assets/", import.meta.url));

  assert.match(html, /<title>舒惟佳 · 产品经理与 AI 开发<\/title>/i);
  assert.match(html, /<div id="root"><\/div>/);
  assert.ok(assets.some((asset) => asset.endsWith(".js")));
  assert.ok(assets.some((asset) => asset.endsWith(".css")));

  assert.match(source, /用户研究、/);
  assert.match(source, /CAPABILITIES \/ 能力技能/);
  assert.match(source, /深圳市韶音科技有限公司/);
  assert.match(source, /MindAnchor 脑波锚点/);
  assert.match(source, /CargoWare CRM/);
  assert.doesNotMatch(source, /守呼卫士|秦溯/);
  assert.match(source, /BEE HIVE/);

  const projectsSection = source.slice(source.indexOf("const projects"), source.indexOf("const practices"));
  const practiceSection = source.slice(source.indexOf("const practices"), source.indexOf("const caseStudies"));
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
  assert.match(source, /CargoWare CRM：让销售跟进可追溯、可协同/);
  assert.match(source, /角色与权限定义/);
  assert.match(source, /产品版本演进规划/);
  assert.match(source, /蜓火 · 高楼消防无人机/);
  assert.match(source, /概念方案中的多模态交互/);
  assert.match(source, /BEE HIVE · 城市智能养蜂/);
  assert.match(source, /用户旅程与设计机会/);
  assert.match(source, /ICPB · 创意共享充电宝/);
  assert.match(source, /草图构想与最终方案/);
  assert.match(source, /dragonfly-exploded\.png/);
  assert.match(source, /beehive-ideation\.png/);
});

test("keeps the Shishi and merchant case-study visuals compact and source-backed", async () => {
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const styles = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  const shishiCard = source.slice(
    source.indexOf('if (project.visual === "shishi")'),
    source.indexOf('if (project.visual === "merchant")'),
  );
  assert.match(shishiCard, /IMG_9718\.PNG/);
  assert.match(shishiCard, /IMG_9738\.PNG/);
  assert.match(shishiCard, /IMG_9725\.PNG/);
  assert.doesNotMatch(shishiCard, /phone-shell|完成作品集首页/);
  assert.match(source, /IMG_9742\.PNG" alt="柿柿专注线上自习室空间选择界面"/);

  const merchantDashboard = source.slice(
    source.indexOf("function MerchantDashboardPreview"),
    source.indexOf("function MerchantCampaignPreview"),
  );
  assert.match(merchantDashboard, /门店经营看板/);
  assert.match(merchantDashboard, /结构示意 · 非真实数值/);
  assert.doesNotMatch(merchantDashboard, /platform-overview\.png/);
  assert.match(source, /merchant-campaign-workspace/);

  assert.match(styles, /\.shishi-case-sections \{ --green:var\(--red-dark\);--green-dark:var\(--ink\)/);
  assert.match(styles, /\.merchant-dashboard-preview\{[^}]*aspect-ratio:16\/9;min-height:0/);
  assert.match(styles, /\.merchant-ui-schematic\{min-width:0;width:100%\}/);
  assert.match(styles, /\.merchant-campaign-workspace\{grid-template-columns:1fr\}/);
  assert.doesNotMatch(styles, /\.phone-shell|\.merchant-dashboard-mock/);
});
