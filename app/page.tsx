"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
  id: string;
  title: string;
  eyebrow: string;
  year: string;
  category: "产品" | "体验" | "智能硬件";
  role: string;
  summary: string;
  outcome: string;
  tags: string[];
  image?: string;
  gallery?: string[];
  link?: string;
  visual?: "shishi" | "crm";
  accent: string;
};

const projects: Project[] = [
  {
    id: "shishi",
    title: "柿柿专注",
    eyebrow: "从 0 到 1 · 微信小程序",
    year: "2026—至今",
    category: "产品",
    role: "产品负责人 / 全栈开发",
    summary:
      "把目标规划、专注执行、学习记录、AI 陪伴、积分权益与线下自习室连接成完整学习闭环。",
    outcome:
      "首版已上线，冷启动覆盖 3 家门店；拓展至 18 个品牌、60 余家自习室，并完成配套商家运营后台。",
    tags: ["0—1 产品", "AI 能力", "C 端 + B 端"],
    visual: "shishi",
    accent: "#f05a45",
  },
  {
    id: "mindanchor",
    title: "MindAnchor 脑波锚点",
    eyebrow: "ADHD 辅助 · AI 陪伴",
    year: "2025",
    category: "产品",
    role: "产品设计 / AI Coding",
    summary:
      "面向 ADHD 人群的专注力管理工具，把任务拆解、专注反馈与 AI 陪伴放进一条更低负担的使用路径。",
    outcome:
      "独立推进需求拆解、体验方案和 AI Coding 落地，并完成可访问的交互产品版本。",
    tags: ["AI 陪伴", "ADHD 辅助", "全栈落地"],
    image: "/legacy-images/mindanchor.jpg",
    gallery: ["/legacy-images/mindanchor.jpg"],
    link: "https://wcnp7sqisgpt.aiforce.cloud/app/app_4jpb099bjexa5/timeline",
    accent: "#8b78e6",
  },
  {
    id: "crm",
    title: "CargoWare CRM",
    eyebrow: "B 端系统 · 销售跟进模块",
    year: "2026",
    category: "体验",
    role: "原型产品设计师 / UX 设计师",
    summary:
      "将分散在微信与 QQ 中的销售沟通，重构为客户筛选、跟进、追溯、统计和下一步行动的结构化闭环。",
    outcome:
      "完成 V1.0 PRD 与可交互原型，定义角色权限、24 小时编辑锁定、KPI 看板与 V1—V3 演进路线。",
    tags: ["B 端 CRM", "信息架构", "复杂规则"],
    image: "/legacy-images/cargoware.jpg",
    gallery: ["/legacy-images/cargoware.jpg"],
    accent: "#72c7bc",
  },
  {
    id: "dragonfly",
    title: "蜓火",
    eyebrow: "多模态交互 · 消防救援",
    year: "2022",
    category: "智能硬件",
    role: "用户研究与交互设计",
    summary:
      "面向高层火灾受困者与消防员，设计视觉、语音和手势识别三类交互，帮助引导逃生与现场沟通。",
    outcome: "完成完整概念体验设计，获得 2022 年“智博杯”工业设计大赛优秀奖。",
    tags: ["用户研究", "多模态交互", "三维建模"],
    image: "/legacy-images/DRAGONFL UAV.jpg",
    gallery: [
      "/legacy-images/DRAGONFL UAV.jpg",
      "/legacy-images/sky-land.jpg",
      "/legacy-images/dengguang.jpg",
      "/legacy-images/camera.jpg",
      "/legacy-images/ganfen.jpg",
      "/legacy-images/yaopin.jpg",
    ],
    accent: "#d94a3f",
  },
  {
    id: "beehive",
    title: "BEE HIVE",
    eyebrow: "城市养蜂 · IoT 软硬一体",
    year: "2022",
    category: "智能硬件",
    role: "产品设计 / 建模 / 竞品分析",
    summary:
      "针对城市养蜂操作门槛高、状态不可见和取蜜繁琐的问题，设计人蜂分离、自助取蜜与智能监控的一体化体验。",
    outcome: "完成硬件、配套 App 与成果分享流程的全链路设计，并获得外观设计专利。",
    tags: ["IoT", "软硬一体", "外观专利"],
    image: "/legacy-images/BEE HIVE.jpg",
    gallery: [
      "/legacy-images/BEE HIVE.jpg",
      "/legacy-images/fengchaochangjing.jpg",
      "/legacy-images/caotufengchao.jpg",
      "/legacy-images/baozhatufengchao.jpg",
      "/legacy-images/yonghuliuchengfengchao.jpg",
    ],
    accent: "#e1a63f",
  },
  {
    id: "icpb",
    title: "ICPB",
    eyebrow: "共享充电 · 产品外观",
    year: "2022",
    category: "智能硬件",
    role: "建模 / 草图 / 竞品分析",
    summary:
      "用“雪糕棍”手柄同时解决取放、方向识别与趣味性问题，让共享充电宝形成更鲜明的使用记忆。",
    outcome: "获得 European Product Design Award Winner。",
    tags: ["产品设计", "CMF", "人机细节"],
    image: "/legacy-images/ICPB.jpg",
    gallery: [
      "/legacy-images/ICPB.jpg",
      "/legacy-images/cdb-caotu.jpg",
      "/legacy-images/cdb-tanchu.jpg",
      "/legacy-images/cdb-naqu.jpg",
      "/legacy-images/cdb-chongdian.jpg",
      "/legacy-images/cdbchangjing.jpg",
    ],
    accent: "#79bdd8",
  },
];

const categories = ["全部", "产品", "体验", "智能硬件"] as const;

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.image) {
    return (
      <div className={`project-image ${compact ? "compact" : ""}`}>
        <img src={project.image} alt={`${project.title} 项目封面`} />
      </div>
    );
  }

  if (project.visual === "shishi") {
    return (
      <div className="project-image visual-shishi" aria-label="柿柿专注产品界面示意">
        <div className="phone-shell">
          <div className="phone-top"><i /> 柿柿专注 <b>···</b></div>
          <div className="focus-ring"><span>42</span><small>今日专注 / 分钟</small></div>
          <div className="today-task"><span>今日计划</span><strong>完成作品集首页</strong></div>
          <div className="mini-nav"><b>◉</b><b>⌁</b><b>✦</b><b>◎</b></div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-image visual-crm" aria-label="CargoWare CRM 产品界面示意">
      <div className="crm-shell">
        <div className="crm-side"><b>CRM</b><span>客户列表</span><span>跟进记录</span><span>数据看板</span></div>
        <div className="crm-main">
          <div className="crm-head"><b>客户跟进</b><i>＋ 新增跟进</i></div>
          {["上海澄运物流", "思迈国际货运", "安达供应链"].map((name, index) => (
            <div className="crm-row" key={name}><span>{name}<small>{index === 1 ? "等待回复" : "今日已联系"}</small></span><em>{index + 2} 条记录</em></div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TiltCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);

  function tilt(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "touch") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${-y * 8}deg`);
    card.style.setProperty("--ry", `${x * 10}deg`);
    card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  }

  function reset() {
    cardRef.current?.style.setProperty("--rx", "0deg");
    cardRef.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <button
      ref={cardRef}
      className="project-card"
      style={{ "--accent": project.accent } as React.CSSProperties}
      onPointerMove={tilt}
      onPointerLeave={reset}
      onClick={onOpen}
      aria-label={`打开 ${project.title} 项目详情`}
    >
      <div className="project-photo-frame">
        <ProjectVisual project={project} compact />
        <span className="view-project">打开项目 ↗</span>
      </div>
      <div className="project-card-copy">
        <span className="project-index">{project.year}</span>
        <p>{project.eyebrow}</p>
        <h3>{project.title}</h3>
        <div className="project-tags">{project.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </button>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("全部");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [checks, setChecks] = useState([true, false, false]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (filter === "全部" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progressRef.current?.style.setProperty("--progress", String(value));
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject]);

  const allChecked = checks.every(Boolean);

  return (
    <main>
      <div className="cursor-orbit" ref={cursorRef} aria-hidden="true" />
      <div className="edge-rail left" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <span key={i}>{i % 4 === 0 ? "舒" : i % 4 === 1 ? "✦" : i % 4 === 2 ? "⌁" : "设"}</span>)}</div>
      <div className="edge-rail right" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <span key={i}>{i % 4 === 0 ? "惟" : i % 4 === 1 ? "◉" : i % 4 === 2 ? "✣" : "计"}</span>)}</div>

      <nav className="top-nav" aria-label="主导航">
        <a className="nav-mark" href="#top" aria-label="返回首页">惟</a>
        <div>
          <a href="#about">关于</a>
          <a href="#work">作品</a>
          <a href="#connect">联系</a>
        </div>
      </nav>

      <div className="scroll-meter" ref={progressRef} aria-hidden="true"><i /></div>

      <section className="hero section-shell" id="top">
        <span className="doodle doodle-a" aria-hidden="true">⌁</span>
        <span className="doodle doodle-b" aria-hidden="true">✦</span>
        <div className="hero-book">
          <div className="book-page hero-copy">
            <span className="eyebrow">SHU WEIJIA · PRODUCT & EXPERIENCE</span>
            <div className="signature">舒惟佳</div>
            <h1>让复杂系统，<br />变得自然好用。</h1>
            <p>产品经理 × 体验设计师<br />深圳 · GMT +8</p>
            <a className="scribble-link" href="#work">看看我的作品 <span>↓</span></a>
          </div>
          <div className="book-page hero-illustration" aria-label="作品界面拼贴">
            <div className="paper-grid" />
            <div className="browser-sketch">
              <div className="browser-bar"><i /><i /><i /><span>WEIJIA&apos;S WORKBENCH</span></div>
              <div className="browser-canvas">
                <div className="mini-card one">目标<br /><b>专注 42 min</b></div>
                <div className="mini-card two"><b>AI 随心记</b><br />跑后自动整理</div>
                <div className="mini-card three">CRM<br /><b>今日跟进 8</b></div>
                <span className="tiny-person">◠</span>
              </div>
            </div>
            <div className="hero-caption">Research · Strategy · Interaction · Build</div>
          </div>
        </div>
        <div className="belief-strip">
          <span>我相信的三件事</span>
          <strong>先把问题讲清楚</strong>
          <strong>让系统贴近人的自然习惯</strong>
          <strong>让方案真的跑起来</strong>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="tape-title"><span>01</span> ABOUT / 关于我</div>
        <div className="about-grid">
          <div className="portrait-card">
            <div className="portrait-stamp">SWJ</div>
            <div className="portrait-face"><img src="/legacy-images/zhengjianzhao.JPG" alt="舒惟佳个人照片" /></div>
            <p>Product thinker<br />Design maker</p>
          </div>
          <div className="about-copy">
            <span className="eyebrow">跨越产品、体验与实现</span>
            <h2>我喜欢把模糊的问题，<br />做成可验证的产品。</h2>
            <p>现为华中科技大学设计学硕士，拥有产品设计背景与产品经理实践。我能从研究、策略、信息架构、PRD 和原型一路走到前端实现，也会认真标注每个结论的证据边界。</p>
            <div className="about-facts">
              <div><b>3.87</b><span>硕士 GPA / 4.0</span></div>
              <div><b>0→1</b><span>产品规划与落地</span></div>
              <div><b>C + B</b><span>用户端与运营端</span></div>
            </div>
          </div>
        </div>
        <div className="skill-marquee" aria-label="能力标签">
          <div>用户研究 ✦ 产品策略 ✦ 交互设计 ✦ AI 产品 ✦ 数据与指标 ✦ 商业化探索 ✦ Vibe Coding ✦ 用户研究 ✦ 产品策略 ✦ 交互设计 ✦ AI 产品 ✦ 数据与指标 ✦ 商业化探索 ✦ Vibe Coding ✦</div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="work-heading">
          <div className="tape-title"><span>02</span> SELECTED WORK / 作品</div>
          <h2>做过的地方，<br />学到的事情。</h2>
          <p>悬停可以“拿起”卡片，点击打开完整项目摘要。</p>
        </div>

        <div className="filter-bar" role="group" aria-label="筛选作品分类">
          {categories.map((category) => (
            <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
              {category}<small>{category === "全部" ? projects.length : projects.filter((project) => project.category === category).length}</small>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filtered.map((project) => <TiltCard key={project.id} project={project} onOpen={() => setActiveProject(project)} />)}
        </div>

        <div className="archive-ticket">
          <div><span>DESIGN ARCHIVE</span><b>更多工业设计作品</b><p>城市蜂巢 · 秦溯文创茶具 · 产品造型与 CMF</p></div>
          <a href="/projects/beehive.png" target="_blank" rel="noreferrer">打开档案 ↗</a>
          <i>2022</i>
        </div>
      </section>

      <section className="connect section-shell" id="connect">
        <div className="tape-title"><span>03</span> CONNECT / 联系</div>
        <div className="connect-card">
          <div className="connect-list">
            <span className="eyebrow">我期待的合作</span>
            <h2>一起做点<br />值得发生的事。</h2>
            <div className="checklist">
              {["有真实价值的问题", "重视体验与证据的团队", "允许设计走到落地"].map((item, index) => (
                <button key={item} onClick={() => setChecks((current) => current.map((value, i) => i === index ? !value : value))} aria-pressed={checks[index]}>
                  <i>{checks[index] ? "✓" : ""}</i>{item}
                </button>
              ))}
            </div>
            <a className={`contact-button ${allChecked ? "ready" : ""}`} href="mailto:swj011021@163.com">
              {allChecked ? "条件匹配，来聊聊吧 ↗" : "给我发邮件 ↗"}
            </a>
          </div>
          <div className="contact-paper">
            <span className="paper-pin" />
            <small>CONTACT CARD · 2026</small>
            <strong>舒惟佳</strong>
            <p>产品经理 / 体验设计师</p>
            <a href="mailto:swj011021@163.com">swj011021@163.com</a>
            <a href="tel:+8613212785002">+86 132 1278 5002</a>
            <div className="qr-faux" aria-hidden="true">惟</div>
          </div>
        </div>
        <footer>
          <span>© 2026 SHU WEIJIA</span>
          <a href="#top">回到顶部 ↑</a>
          <span>深圳 · 可接受城市不限</span>
        </footer>
      </section>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveProject(null)}>
          <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="关闭项目详情">×</button>
            <div className="modal-visual" style={{ "--accent": activeProject.accent } as React.CSSProperties}>
              <ProjectVisual project={activeProject} />
              <span>{activeProject.year}</span>
            </div>
            <div className="modal-copy">
              <span className="eyebrow">{activeProject.eyebrow}</span>
              <h2 id="project-modal-title">{activeProject.title}</h2>
              <p className="modal-role">我的角色 · {activeProject.role}</p>
              <div className="modal-section"><small>问题与方案</small><p>{activeProject.summary}</p></div>
              <div className="modal-section"><small>产出与结果</small><p>{activeProject.outcome}</p></div>
              <div className="modal-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {activeProject.gallery && activeProject.gallery.length > 1 && (
                <div className="modal-gallery" aria-label={`${activeProject.title} 项目更多画面`}>
                  {activeProject.gallery.slice(1, 4).map((image) => <img key={image} src={image} alt="" />)}
                </div>
              )}
              {activeProject.link && (
                <a className="external-project" href={activeProject.link} target="_blank" rel="noreferrer">打开原项目 ↗</a>
              )}
              <button className="next-project" onClick={() => setActiveProject(projects[(projects.findIndex((project) => project.id === activeProject.id) + 1) % projects.length])}>
                下一个项目 <span>→</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
