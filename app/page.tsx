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
  icon: string;
  image?: string;
  gallery?: string[];
  link?: string;
  visual?: "shishi" | "crm" | "practice";
  accent: string;
};

const portraitPhotos = [
  { src: "/legacy-images/zhengjianzhao.JPG", alt: "舒惟佳证件照", position: "center 28%" },
  { src: "/portrait-gallery/portrait-02-flowers.jpg", alt: "舒惟佳在窗边手捧花束", position: "center 42%" },
  { src: "/portrait-gallery/portrait-03-lamb.jpg", alt: "舒惟佳在草原抱着小羊", position: "center 38%" },
  { src: "/portrait-gallery/portrait-04-lake.jpg", alt: "舒惟佳站在湖边", position: "center 42%" },
  { src: "/portrait-gallery/portrait-05-grassland.jpg", alt: "舒惟佳在草原上张开双臂", position: "center 56%" },
  { src: "/portrait-gallery/portrait-06-autumn.jpg", alt: "舒惟佳在秋日山景前", position: "center 44%" },
];

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
    icon: "/handdrawn-assets/icon-focus.png",
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
    icon: "/handdrawn-assets/icon-tarot.png",
    image: "/legacy-images/mindanchor.jpg",
    gallery: ["/legacy-images/mindanchor.jpg"],
    link: "https://wcnp7sqisgpt.aiforce.cloud/app/app_4jpb099bjexa5/timeline",
    accent: "#8b78e6",
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
    icon: "/handdrawn-assets/icon-drone.png",
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
    icon: "/handdrawn-assets/icon-beehive.png",
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
    icon: "/handdrawn-assets/icon-powerbank.png",
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

const practices: Project[] = [
  {
    id: "crm",
    title: "CargoWare CRM",
    eyebrow: "B 端产品命题 · 销售跟进模块",
    year: "2026",
    category: "体验",
    role: "原型产品设计师 / UX 设计师",
    summary:
      "将分散在微信与 QQ 中的销售沟通，重构为客户筛选、跟进、追溯、统计和下一步行动的结构化闭环。",
    outcome:
      "在 1 周内完成需求分析、V1.0 PRD 与可交互高保真原型，并规划 V1—V3 的产品演进路线。",
    tags: ["B 端 CRM", "信息架构", "复杂规则"],
    icon: "/handdrawn-assets/icon-crm.png",
    image: "/legacy-images/cargoware.jpg",
    gallery: ["/legacy-images/cargoware.jpg"],
    accent: "#72c7bc",
  },
  {
    id: "mask-guardian",
    title: "守呼卫士",
    eyebrow: "服务设计练习 · 口罩回收",
    year: "2022",
    category: "智能硬件",
    role: "用户旅程 / 产品与界面设计",
    summary:
      "围绕废弃口罩回收场景，梳理从投放、消毒到分类处理的用户旅程，并探索设备形态与配套界面的协同体验。",
    outcome:
      "完成用户旅程、设备方案、三视图与配套 App 界面等系列设计练习。",
    tags: ["服务设计", "用户旅程", "软硬一体"],
    icon: "/handdrawn-assets/icon-mask.png",
    visual: "practice",
    accent: "#d88972",
  },
  {
    id: "qinsu",
    title: "秦溯",
    eyebrow: "文创产品练习 · 茶具设计",
    year: "2022",
    category: "智能硬件",
    role: "文化研究 / 产品造型 / 建模",
    summary:
      "从秦俑的形态与地域文化中提取设计语言，探索传统文化符号如何转译为更克制、可使用的当代茶具。",
    outcome:
      "完成文化意象研究、造型推演、三维建模与效果表达。",
    tags: ["文创设计", "造型推演", "三维建模"],
    icon: "/handdrawn-assets/icon-qinsu.png",
    visual: "practice",
    accent: "#c6a36a",
  },
];

const portfolioItems = [...projects, ...practices];

const categories = ["全部", "产品", "智能硬件"] as const;

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

  if (project.visual === "crm") return (
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

  return (
    <div className="project-image visual-practice" aria-label={`${project.title} 设计练习示意`}>
      <span>{project.eyebrow}</span>
      <img src={project.icon} alt="" aria-hidden="true" />
      <strong>{project.title}</strong>
      <small>PROCESS · FORM · EXPERIENCE</small>
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
        <img className="project-doodle-icon" src={project.icon} alt="" aria-hidden="true" />
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

function DraggablePortraitReveal() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const startRef = useRef({ pointerX: 0, pointerY: 0, x: 0, y: 0 });
  const activePhoto = portraitPhotos[photoIndex];

  function handlePointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    startRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      x: offset.x,
      y: offset.y,
    };
    setDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging) return;
    const nextX = startRef.current.x + event.clientX - startRef.current.pointerX;
    const nextY = startRef.current.y + event.clientY - startRef.current.pointerY;
    setOffset({ x: nextX, y: nextY });
  }

  function finishDrag(event: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }

  function resetPosition() {
    if (dragging) return;
    setOffset({ x: 0, y: 0 });
  }

  function showNextPhoto() {
    setPhotoIndex((current) => (current + 1) % portraitPhotos.length);
  }

  return (
    <div className="portrait-reveal" style={{ "--reveal-x": `${offset.x}px`, "--reveal-y": `${offset.y}px` } as React.CSSProperties}>
      <div className="portrait-photo-layer">
        <div className="portrait-stamp">SWJ</div>
        <button className="portrait-face" type="button" onClick={showNextPhoto} aria-label="点击切换到下一张舒惟佳的照片">
          <img key={activePhoto.src} src={activePhoto.src} alt={activePhoto.alt} style={{ objectPosition: activePhoto.position }} />
        </button>
        <p>Product thinker<br />Design maker</p>
      </div>
      <button
        type="button"
        className={`portrait-sketch-layer${dragging ? " is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onDoubleClick={resetPosition}
        aria-label="拖动手绘人物，查看下方真实照片"
      >
        <img src="/handdrawn-assets/generated/shuweijia-thinking-relaxed.png" alt="舒惟佳的红色手绘单人线稿" draggable={false} />
        <span>拖动查看照片 · 双击复位 ↗</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("全部");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [checks, setChecks] = useState([true, false, false]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

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

      const hero = heroRef.current;
      if (!hero) return;
      const travel = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const raw = Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / travel));
      const open = Math.min(1, raw / 0.38);
      const easedOpen = open * open * (3 - 2 * open);
      const turn = Math.min(1, Math.max(0, (raw - 0.38) / 0.28));
      const easedTurn = turn * turn * (3 - 2 * turn);
      const release = Math.min(1, Math.max(0, (raw - 0.68) / 0.32));
      const easedRelease = release * release * (3 - 2 * release);
      const handoff = Math.min(1, release / 0.45);
      const easedHandoff = handoff * handoff * (3 - 2 * handoff);
      const setCard = (
        index: number,
        startX: number,
        startY: number,
        startRotate: number,
        startScale: number,
        endX: number,
        endY: number,
        endRotate: number,
      ) => {
        hero.style.setProperty(`--pour-${index}-x`, `${startX + (endX - startX) * easedRelease}px`);
        hero.style.setProperty(`--pour-${index}-y`, `${startY + (endY - startY) * easedRelease + 640 * easedRelease}px`);
        hero.style.setProperty(`--pour-${index}-r`, `${startRotate + (endRotate - startRotate) * easedRelease}deg`);
        hero.style.setProperty(`--pour-${index}-s`, String(startScale + (1 - startScale) * easedRelease));
      };
      hero.style.setProperty("--cover-fold", `${-178 * easedOpen}deg`);
      hero.style.setProperty("--next-page-fold", `${-1.2 - 176.8 * easedTurn}deg`);
      hero.style.setProperty("--cover-z", raw >= 0.37 ? "5" : "100");
      hero.style.setProperty("--turn-z", raw >= 0.37 ? "70" : "20");
      hero.style.setProperty("--notes-z", release > 0.005 ? "90" : "15");
      hero.style.setProperty("--directory-01-opacity", String(1 - easedHandoff));
      hero.style.setProperty("--detached-01-opacity", String(easedHandoff));
      hero.style.setProperty("--book-x", `${-25 + easedOpen * 25}%`);
      hero.style.setProperty("--book-scale", String(0.94 + easedOpen * 0.06));
      hero.style.setProperty("--book-lift", `${-640 * easedRelease}px`);
      hero.style.setProperty("--book-content-opacity", String(Math.min(1, Math.max(0, (open - 0.16) / 0.4))));
      hero.style.setProperty("--scroll-cue-opacity", String(Math.max(0, 1 - raw * 4)));
      hero.style.setProperty("--cards-reveal", easedTurn > 0.999 ? "-500vw" : `${100 - easedTurn * 100}%`);
      setCard(1, -245, -90, -2.4, 1, -330, -115, -1.5);
      setCard(2, 90, 25, -9, 0.46, -270, 105, -5);
      setCard(3, 260, -15, 6, 0.37, 205, 78, 1);
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
      <div className="edge-rail left" aria-hidden="true">
        <img src="/handdrawn-assets/side-rail-left.png" alt="" />
        <img src="/handdrawn-assets/side-rail-left.png" alt="" />
      </div>
      <div className="edge-rail right" aria-hidden="true">
        <img src="/handdrawn-assets/side-rail-right.png" alt="" />
        <img src="/handdrawn-assets/side-rail-right.png" alt="" />
      </div>

      <nav className="top-nav" aria-label="主导航">
        <a className="nav-mark" href="#top" aria-label="返回首页">惟</a>
        <div>
          <a href="#about"><span>关于</span><img className="nav-doodle" src="/handdrawn-assets/icon-bird.png" alt="" aria-hidden="true" /></a>
          <a href="#experience"><span>实习</span><img className="nav-doodle" src="/handdrawn-assets/icon-run.png" alt="" aria-hidden="true" /></a>
          <a href="#projects"><span>项目</span><img className="nav-doodle" src="/handdrawn-assets/icon-tools.png" alt="" aria-hidden="true" /></a>
          <a href="#practice"><span>练习</span><img className="nav-doodle" src="/handdrawn-assets/icon-computer.png" alt="" aria-hidden="true" /></a>
          <a href="#connect"><span>联系</span><img className="nav-doodle" src="/handdrawn-assets/icon-tarot.png" alt="" aria-hidden="true" /></a>
        </div>
      </nav>

      <div className="scroll-meter" ref={progressRef} aria-hidden="true"><i /></div>

      <section className="hero hero-story section-shell" id="top" ref={heroRef}>
        <div className="hero-sticky">
          <div className="story-stage">
            <div className="book-object">
              <div className="hero-book">
                <div className="book-page next-page-base" aria-hidden="true">
                  <span>OPEN THE NEXT CHAPTER</span>
                  <i />
                </div>
              </div>
              <div className="book-turn-layer">
                <div className="turning-sheet">
                  <div className="book-page hero-illustration">
                    <div className="hero-scene-wrap">
                      <img
                        className="hero-scene"
                        src="/handdrawn-assets/generated/hero-shuweijia-relaxed.png"
                        alt="舒惟佳的手绘产品设计工作场景"
                      />
                    </div>
                    <div className="hero-caption">Research · Strategy · Interaction · Build</div>
                  </div>
                  <div className="book-page turning-page-back">
                    <i />
                    <div className="turning-directory" aria-label="作品集目录">
                      <div><b>01</b><span>ABOUT / 关于我</span></div>
                      <div><b>02</b><span>INTERNSHIP / 实习经历</span></div>
                      <div><b>03</b><span>PROJECTS / 项目</span></div>
                      <div><b>04</b><span>PRACTICE / 练习</span></div>
                      <div><b>05</b><span>CONNECT / 联系</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="closed-book-cover">
                <div className="cover-front">
                  <i />
                  <span>SHU WEIJIA</span>
                  <strong>作品集</strong>
                  <small>PRODUCT · EXPERIENCE</small>
                </div>
                <div className="cover-inside">
                  <div className="hero-copy cover-copy">
                    <span className="eyebrow">SHU WEIJIA · PRODUCT & AI DEVELOPMENT</span>
                    <div className="signature">舒惟佳</div>
                    <h1>让复杂系统，<br />变得自然好用。</h1>
                    <p>产品经理 × AI 开发<br />深圳 · GMT +8</p>
                    <a className="scribble-link" href="#experience">从实习经历开始 <span>↓</span></a>
                  </div>
                </div>
              </div>
              <div className="pour-landing" id="about" aria-label="关于我内容便签">
                <div className="poured-card poured-card-1 poured-title detached-directory-title">
                  <span><b>01</b> ABOUT / 关于我</span>
                </div>
                <div className="poured-card poured-card-2 poured-portrait">
                  <DraggablePortraitReveal />
                </div>
                <div className="poured-card poured-card-3 poured-about-copy education-card">
                  <span className="eyebrow">EDUCATION / 教育经历</span>
                  <div className="education-list">
                    <article className="education-item">
                      <div className="school-mark school-mark-cn" aria-hidden="true">华</div>
                      <div className="education-main">
                        <header><h2>华中科技大学 <small>985</small></h2><time>2024.09—2027.07</time></header>
                        <h3>设计学 <i /> 硕士 <i /> GPA 3.87/4.0</h3>
                        <p><b>核心成果：</b>二等奖学金；发表 HCII 会议论文</p>
                      </div>
                    </article>
                    <article className="education-item">
                      <div className="school-mark school-mark-cn" aria-hidden="true">重</div>
                      <div className="education-main">
                        <header><h2>重庆大学 <small>985</small></h2><time>2019.09—2023.07</time></header>
                        <h3>产品设计 <i /> 本科 <i /> GPA 3.59/4.0</h3>
                        <p><b>核心成果：</b>学院甲等奖学金；外观设计专利（已授权）；欧洲产品设计大赛 Winner 奖；“智博杯”及大学生工业设计大赛优秀奖</p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-story-cue" aria-hidden="true"><span>下滑翻开作品集</span><i>↓</i></div>
        </div>
      </section>

      <section className="experience section-shell" id="experience">
        <div className="experience-heading">
          <div className="tape-title"><span>02</span> INTERNSHIP / 实习经历</div>
          <h2>把用户洞察，<br />变成产品方向。</h2>
          <p>从真实运动场景出发，连接研究、策略与产品体验。</p>
        </div>

        <article className="experience-card">
          <header className="experience-card-head">
            <div>
              <span className="eyebrow">SHOKZ · SMART AUDIO & APP</span>
              <h3>深圳市韶音科技有限公司</h3>
              <p>APP 产品经理实习生</p>
            </div>
            <time>2026.06—至今</time>
            <img src="/handdrawn-assets/icon-run.png" alt="" aria-hidden="true" />
          </header>

          <p className="experience-summary">
            围绕跑者智能耳机及配套 App，负责 AI 随心记预研、产品方案验证，以及 Shokz App 未来 2—3 年个人知识、轻量社区、AI 与商业化规划。
          </p>

          <div className="experience-metrics" aria-label="实习工作数据摘要">
            <div><b>9 + 9</b><span>公开社区与 AI 记录产品调研</span></div>
            <div><b>97</b><span>行功能需求清单</span></div>
            <div><b>7</b><span>个页面层级交互 Demo</span></div>
          </div>

          <div className="experience-work">
            <article>
              <small>01 · AI 随心记</small>
              <h4>定义低打扰记录链路</h4>
              <p>按跑步 7 个阶段归纳 5 类记录需求，将“短语音记录—AI 处理—跑后回看”确定为核心交互。</p>
            </article>
            <article>
              <small>02 · 产品路线</small>
              <h4>规划 App 中长期演进</h4>
              <p>从个人知识库与被动式 AI，逐步演进至 AI 教练、AI 计划和主动式 AI，并探索会员与赛事权益协同。</p>
            </article>
            <article>
              <small>03 · 跨团队协作</small>
              <h4>让方案进入验证流程</h4>
              <p>与 UX/UI、测试及官网营销团队对齐信息架构、用户语料、社区定位和商业化承接方式。</p>
            </article>
          </div>
        </article>
      </section>

      <section className="work section-shell" id="projects">
        <div className="work-heading">
          <div className="tape-title"><span>03</span> SELECTED PROJECTS / 项目</div>
          <h2>把想法，<br />做成真实的产品。</h2>
          <p>悬停可以“拿起”卡片，点击打开完整项目摘要。</p>
        </div>

        <div className="filter-bar" role="group" aria-label="筛选项目分类">
          {categories.map((category) => (
            <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
              {category}<small>{category === "全部" ? projects.length : projects.filter((project) => project.category === category).length}</small>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filtered.map((project) => <TiltCard key={project.id} project={project} onOpen={() => setActiveProject(project)} />)}
        </div>

      </section>

      <section className="practice section-shell" id="practice">
        <div className="work-heading practice-heading">
          <div className="tape-title"><span>04</span> PRACTICE / 练习</div>
          <h2>在小题目里，<br />反复打磨方法。</h2>
          <p>命题笔试、服务设计与产品造型练习，记录不同尺度下的思考过程。</p>
        </div>

        <div className="practice-grid">
          {practices.map((practice) => (
            <TiltCard key={practice.id} project={practice} onOpen={() => setActiveProject(practice)} />
          ))}
        </div>

        <div className="archive-ticket">
          <div><span>DESIGN ARCHIVE</span><b>更多设计过程与造型探索</b><p>草图推演 · 用户旅程 · 产品造型 · CMF · 三维建模</p></div>
          <a href="/legacy-images/BEE HIVE.jpg" target="_blank" rel="noreferrer">打开档案 ↗</a>
          <i>2022</i>
        </div>
      </section>

      <section className="connect section-shell" id="connect">
        <div className="tape-title"><span>05</span> CONNECT / 联系</div>
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
            <p>产品经理 / AI 开发</p>
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
              <img className="modal-project-icon" src={activeProject.icon} alt="" aria-hidden="true" />
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
              <button className="next-project" onClick={() => setActiveProject(portfolioItems[(portfolioItems.findIndex((project) => project.id === activeProject.id) + 1) % portfolioItems.length])}>
                下一个内容 <span>→</span>
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
