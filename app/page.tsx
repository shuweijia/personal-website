"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArchiveRestore,
  BarChart3,
  CalendarClock,
  Database,
  MapPinned,
  Mic2,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserCog,
  UserRound,
  UsersRound,
  Workflow,
} from "lucide-react";

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
  merchantLink?: string;
  visual?: "shishi" | "merchant" | "crm" | "practice";
  accent: string;
};

type CaseStudyImage = {
  src: string;
  alt: string;
};

type CursorBurst = {
  id: number;
  x: number;
  y: number;
};

const contactDoodles = [
  { src: "/handdrawn-assets/generated/shuweijia-planning.png", alt: "舒惟佳正在规划" },
  { src: "/handdrawn-assets/generated/shuweijia-presenting.png", alt: "舒惟佳正在展示数据看板" },
  { src: "/handdrawn-assets/generated/shuweijia-thinking.png", alt: "舒惟佳正在思考" },
  { src: "/handdrawn-assets/generated/shuweijia-waving.png", alt: "舒惟佳挥手拿着电脑" },
  { src: "/handdrawn-assets/generated/shuweijia-celebrating.png", alt: "舒惟佳庆祝成功" },
  { src: "/handdrawn-assets/generated/shuweijia-drawing.png", alt: "舒惟佳正在画图" },
];

type CaseStudyPoint = {
  title: string;
  body: string;
};

type CaseStudySection = {
  title: string;
  lead?: string;
  body?: string[];
  points?: CaseStudyPoint[];
  images?: CaseStudyImage[];
};

type CaseStudy = {
  label: string;
  title: string;
  lead: string;
  hero: CaseStudyImage;
  heroVisual?: "project";
  stats: { label: string; value: string }[];
  sections: CaseStudySection[];
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
      "面向自习室用户与线下学习空间，搭建“目标设定—计划执行—专注记录—复盘调整”学习闭环，并以 AI 能力与积分权益连接 C 端体验和多门店运营。",
    outcome:
      "V1 已于 2026.08.03 上线，在 3 家自习室冷启动；合作资源拓展至 18 个品牌、60 余家门店，并完成连接线上数据的商家运营网站。",
    tags: ["0—1 产品", "AI 能力", "C 端 + B 端"],
    icon: "/handdrawn-assets/icon-focus.png",
    link: "https://wxmpurl.cn/U5Yn4WuV7jh",
    merchantLink: "https://merchant-admin-web-cloud1-7gb1r3mm0c292233.webapps.tcloudbase.com",
    visual: "shishi",
    accent: "#f05a45",
  },
  {
    id: "merchant",
    title: "柿柿专注 · 数据与经营平台",
    eyebrow: "B 端数据产品 · 多门店经营",
    year: "2026—至今",
    category: "产品",
    role: "产品负责人 / 全栈开发",
    summary:
      "面向平台、品牌与门店经营者，将小程序中的引流、专注、功能访问、积分、卡券与到店行为汇总为可解释的经营数据，并支持用户分层、行为回溯与活动方案设计。",
    outcome:
      "独立完成产品规划、指标与权限设计、交互界面、前后端开发、CloudBase 数据接入及线上部署；已支持规则画像、人群圈选和活动草稿，自动发券与营销转化验证尚未实现。",
    tags: ["B 端数据产品", "用户画像", "精细化运营"],
    icon: "/handdrawn-assets/icon-crm.png",
    merchantLink: "https://merchant-admin-web-cloud1-7gb1r3mm0c292233.webapps.tcloudbase.com",
    visual: "merchant",
    accent: "#236447",
  },
  {
    id: "mindanchor",
    title: "MindAnchor 脑波锚点",
    eyebrow: "ADHD 辅助 · AI 陪伴",
    year: "2025",
    category: "产品",
    role: "产品设计 / AI Coding",
    summary:
      "探索面向 ADHD 用户的任务拆解、专注反馈与 AI 陪伴体验。",
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
    id: "crm",
    title: "CargoWare CRM",
    eyebrow: "B 端产品命题 · 销售跟进模块",
    year: "2026",
    category: "体验",
    role: "原型产品设计师 / UX 设计师",
    summary:
      "面向国际货代销售跟进场景，设计客户筛选、跟进记录、历史追溯与下一步行动的 CRM 原型。",
    outcome:
      "在 1 周内完成需求分析、V1.0 PRD 与可交互高保真原型，并规划 V1—V3 的产品演进路线。",
    tags: ["B 端 CRM", "信息架构", "复杂规则"],
    icon: "/handdrawn-assets/icon-crm.png",
    image: "/legacy-images/cargoware.jpg",
    gallery: ["/legacy-images/cargoware.jpg"],
    accent: "#72c7bc",
  },
];

const practices: Project[] = [
  {
    id: "dragonfly",
    title: "蜓火",
    eyebrow: "多模态交互 · 消防救援",
    year: "2022",
    category: "智能硬件",
    role: "用户研究与交互设计",
    summary:
      "面向高层火灾救援场景，探索无人机如何协助消防人员获取信息、引导受困者并建立沟通。",
    outcome: "3 人团队完成概念体验方案；我负责前期调研、竞品分析、草图设计与部分三维建模。项目获 2022 年“智博杯”工业设计大赛优秀奖。",
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
      "城市智能养蜂概念设计，探索人蜂分离、自助取蜜与状态监测的一体化体验。",
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
      "围绕共享充电宝的取放与归还体验，进行产品造型与人机细节设计。",
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

const caseStudies: Record<string, CaseStudy> = {
  shishi: {
    label: "0 → 1 PRODUCT CASE STUDY · 2026",
    title: "柿柿专注：从目标到复盘的学习闭环",
    lead:
      "面向自习室用户与线下学习空间，柿柿专注将目标设定、计划执行、专注记录、复盘调整、积分权益和门店服务连接起来。作为核心成员，我负责产品整体架构，并独立推进 AI 塔罗、计划室及商家运营网站等模块的产品设计与开发落地；V1 已上线，项目正基于真实行为数据持续迭代。",
    hero: { src: "", alt: "柿柿专注微信小程序界面示意" },
    heroVisual: "project",
    stats: [
      { label: "项目类型", value: "C 端小程序 + B 端运营网站" },
      { label: "我的角色", value: "产品负责人 / 全栈开发" },
      { label: "上线时间", value: "2026.08.03" },
      { label: "首轮验证", value: "221 注册 / 88 核心行为" },
    ],
    sections: [
      {
        title: "为什么用户有计划，却难以持续执行",
        lead: "用户不是缺少单点工具，而是缺少一条从目标到执行、从线上到线下能够持续运转的路径。",
        points: [
          { title: "计划难以落地", body: "长期目标往往停留在“想考什么、想学什么”，缺少根据当前水平、可用时间和真实节奏拆解为当周、当天可执行任务的过程。" },
          { title: "执行与记录割裂", body: "计时、任务、学习资料与复盘分散在不同工具中，用户完成一次专注后，难以自然回到下一步行动，也难以看到长期积累。" },
          { title: "线下空间连接短暂", body: "自习室能承接一次到店学习，却难以在用户离店后持续提供服务；经营者也缺少理解引流、学习行为与权益转化的数据工具。" },
        ],
      },
      {
        title: "先让核心链路跑起来，再迭代计划室",
        lead: "第一版优先让关键链路可用，用小范围真实使用验证偏好、稳定性与需求；第二版再以计划室为重点，把“专注”延展为更完整的学习管理。",
        body: [
          "我先梳理了首页、专注学习、线上自习室、计划室、AI / 塔罗陪伴、学习搭子、积分权益、线下学习空间、个人中心与商家后台的整体架构，让 C 端体验与 B 端运营从一开始就能相互连接。",
          "版本策略上，第一版以核心可用为目标，在团队自有的 3 家自习室逐步推广，收集用户偏好、Bug 与新增需求；第二版将计划室作为重点新增模块，基于首轮反馈完善从规划到复盘的主链路。",
        ],
      },
      {
        title: "C 端学习闭环：从今天的一次专注开始",
        lead: "把目标、行动、记录与反馈放在同一产品里，降低用户重新开始学习的阻力。",
        points: [
          { title: "目标与任务入口", body: "用首页承接今日计划与学习状态，让用户进入产品后能够迅速明确“现在做什么”，而不是在功能间寻找下一步。" },
          { title: "专注执行与线上陪伴", body: "围绕专注计时、线上自习室和学习搭子建立执行场景，使个人学习不只是一段孤立的倒计时，也能获得陪伴与持续感。" },
          { title: "积分权益与线下空间", body: "将专注、AI 服务和线下自习室资源纳入同一权益体系，支持门店展示、卡券上传与分配、积分兑换及核销记录，为线上行为回流线下预留能力。" },
        ],
      },
      {
        title: "AI 塔罗：把 AI 能力做成一条可使用的服务链路",
        lead: "我独立负责从体验设计到开发联调，重点处理连续上下文、积分扣减和异常状态，而不只是把对话框嵌入页面。",
        points: [
          { title: "完整的仪式化流程", body: "设计“输入问题—选择单张 / 三张牌阵—洗牌—切牌—抽牌—翻牌—AI 结构化解读—连续追问”流程，支持 78 张完整牌组与正逆位。" },
          { title: "连续对话与历史沉淀", body: "用户可以围绕同一次抽牌在同一上下文继续追问，并保留历史记录，让一次服务不止停留在即时输出。" },
          { title: "商业与风险规则", body: "完成登录保护、免责声明、小柿饼积分扣减、余额不足提示、充值入口、服务端价格校验和异常兜底，使 AI 服务在真实使用中具备可控边界。" },
        ],
      },
      {
        title: "计划室：让 AI 建议经过用户确认，回到真实生活",
        lead: "计划室被定义为独立的学习计划工作台。关键不是“生成一份漂亮计划”，而是让计划能被用户接受、执行并根据结果调整。",
        points: [
          { title: "从目标到每日行动", body: "形成“目标设定—资料上传与识别确认—填写当前水平和可用时间—生成长期计划—确认周计划—生成每日任务—进入专注—记录真实结果—复盘调整”的完整闭环。" },
          { title: "保留用户决策权", body: "长期和月度计划只定义阶段方向，详细任务按周生成；周计划必须由用户确认后才能进入每日时间线，避免 AI 输出直接替代用户安排。" },
          { title: "为低能量日设计规则", body: "学习记录只统计真实完成内容；支持必须完成、最低完成、可选加练、低能量日与一键救场等执行状态，让计划能够适应现实波动而不是制造挫败感。" },
        ],
      },
      {
        title: "商家运营网站：从行为数据到活动方案",
        lead: "我独立规划、设计并开发配套运营网站，让平台、品牌方和门店管理者可以从“看数据”走到“找人群、定方案”。",
        points: [
          { title: "多角色经营工作台", body: "围绕不同角色的决策需求，规划经营看板、功能访问、用户画像、精准卡券和行为轨迹五个模块，连接引流、学习、权益与门店经营。" },
          { title: "可解释的数据口径", body: "统一注册、核心行为、生命周期和功能使用口径，提供 7 / 30 / 90 天周期分析；功能访问按“同一用户—同一功能—同一天”去重，避免重复进入造成数据虚高。" },
          { title: "从画像到活动方案", body: "整合学习、计划执行、到店、积分和卡券等行为，构建生命周期、价值、专注深度、时段偏好、门店关系等规则画像；支持按多种条件圈选人群并配置活动草稿。当前已完成分析到方案生成，尚未自动发券或将营销转化写作成果。" },
        ],
      },
      {
        title: "上线验证与下一步",
        lead: "第一版于 2026 年 8 月 3 日上线，先以小范围真实使用建立后续迭代的证据基础。",
        points: [
          { title: "首轮真实使用快照", body: "截至 2026 年 8 月 17 日，后台累计汇总 221 名注册用户；88 名完成首次核心行为，注册至首次核心行为转化率为 40%。专注计时累计覆盖 77 名用户。" },
          { title: "产品与渠道基础", body: "项目已在 3 家自习室开展冷启动；商业合作资源拓展至北京、武汉、苏州等地的 18 个自习室品牌、60 余家门店，为后续推广建立线下承接基础。" },
          { title: "持续迭代方向", body: "继续围绕计划室推进第二版设计、开发与联动验证，并用行为采集—指标分析—规则画像—人群圈选—活动方案的链路，为产品迭代与门店运营提供依据。" },
        ],
      },
      {
        title: "我负责的产品与开发范围",
        body: [
          "作为产品负责人 / 全栈开发，我负责整体功能架构、模块划分、页面体系和视觉方向；其中 AI 塔罗与计划室由我独立完成场景分析、需求优先级、信息架构、PRD、流程与交互设计、UI/UX、页面开发、接口联调、AI 接入、积分规则、埋点、测试及迭代。",
          "同时，我独立完成商家运营网站的产品规划、功能设计、前后端开发与线上数据接入，并参与云函数、用户数据隔离、跨页面任务联动与异常状态等实现，保证产品方案能够直接变为可测试、可验证的版本。",
        ],
      },
    ],
  },
  merchant: {
    label: "B2B DATA PRODUCT · 2026",
    title: "把小程序行为，变成门店下一步的经营依据。",
    lead:
      "线下自习室能看到到店和消费，却很难持续理解用户离店后的学习行为。我独立设计并开发数据与经营平台，将分散在小程序中的引流、专注、功能使用、积分、卡券与门店关系汇总为一条可回溯的证据链，帮助平台和门店从“看到数字”走向“识别人群、设计行动”。",
    hero: { src: "/merchant-ui/platform-overview.png", alt: "柿柿专注数据与经营平台界面" },
    stats: [
      { label: "项目类型", value: "B 端数据产品" },
      { label: "我的角色", value: "产品负责人 / 全栈开发" },
      { label: "数据状态", value: "已接入线上数据" },
      { label: "交付状态", value: "已部署可访问" },
    ],
    sections: [],
  },
  crm: {
    label: "PRODUCT REQUIREMENTS DOCUMENT · V1.0",
    title: "CargoWare CRM：让销售跟进可追溯、可协同",
    lead:
      "这是一个面向国际货代销售跟进场景的 B 端产品设计项目。我通过半结构化访谈、业务流程梳理和原型设计，将分散在微信、QQ 等渠道的沟通转化为“客户筛选—新增跟进—历史追溯—统计分析—下一步行动”的系统方案。",
    hero: { src: "/legacy-images/cargoware.jpg", alt: "CargoWare 国际货代 CRM 销售跟进模块界面" },
    stats: [
      { label: "项目类型", value: "B 端 CRM" },
      { label: "我的角色", value: "原型产品设计 / UX" },
      { label: "交付周期", value: "1 周" },
      { label: "版本范围", value: "V1.0—V3.0" },
    ],
    sections: [
      {
        title: "设计目标",
        lead: "通过结构化记录沉淀客户资产，并为销售过程管理提供可追溯的数据基础。",
        points: [
          { title: "沉淀客户资产", body: "设计结构化录入方式，将沟通记录从个人社交软件沉淀到企业系统。" },
          { title: "支持过程管理", body: "规划统计看板，用于呈现当月跟进量和过程投入。" },
          { title: "辅助管理判断", body: "为管理层提供可追溯的过程数据，作为后续考核与复盘的参考。" },
        ],
      },
      {
        title: "角色与权限定义",
        lead: "精细化权限管理，兼顾客户资源的数据安全与管理效能。",
        points: [
          { title: "销售人员", body: "仅能查看、新增、编辑归属于自己的客户跟进记录，保障客户资源的数据隔离与安全性。" },
          { title: "销售主管", body: "可查看下属所有销售的跟进统计与明细，但不可修改记录，确保考核数据客观真实。" },
          { title: "系统管理员", body: "维护全局配置，如自定义“跟进方式”“跟进结果”的配置字典，使系统适配企业业务阶段。" },
        ],
      },
      {
        title: "核心功能需求解析",
        lead: "通过结构化设计提升录入效率，通过可视化设计提升阅读体验。",
        points: [
          { title: "01 · 导航与全局布局", body: "入口设在“销售—跟进记录”。采用左侧列表、右侧详情的布局，批量处理多个客户时无需频繁跳页。" },
          { title: "02 · 智能客户列表看板", body: "展示公司、对接人、跟进状态与主营业务，支持模糊搜索和标签筛选；默认按最后跟进时间倒序，优先暴露长期未维护客户。" },
          { title: "03 · 跟进操作中心", body: "设计时间、方式、结果与内容表单；方案中要求上门拜访上传含 GPS 水印的现场照片，并将跟进结果关联客户生命周期。" },
        ],
      },
      {
        title: "规划中的规则与优化方向",
        lead: "以下规则用于补齐客户经营闭环，尚属于产品方案与版本规划范围。",
        points: [
          { title: "公海池回收规则", body: "规划无效沟通且超过 30 天未维护时进入公海池，以释放并盘活客户资源。" },
          { title: "下一步跟进计划", body: "设计保存记录时填写下次跟进时间，并同步进入系统日程的流程，减少漏单与遗忘。" },
          { title: "SOP 触发设想", body: "规划在录入“明确需求”后推送询价模板或待办，缩短后续处理路径。" },
          { title: "移动端与语音录入", body: "为户外销售场景预留移动端与语音转文字快捷录入方向。" },
          { title: "补录时限", body: "设计仅允许补录过去 3 天记录、超期由主管审批解锁的规则，减少月末突击补录。" },
          { title: "生命周期映射", body: "定义正式签约后变更为合作中、连续 3 次无效沟通后提示放弃的状态规则。" },
        ],
      },
      {
        title: "产品版本演进规划",
        points: [
          { title: "V1.0 · MVP 阶段", body: "结构化录入、客户列表、基础 KPI 看板和历史时间轴，先解决业务数字化“能看到”的问题。" },
          { title: "V2.0 · 智能提效版", body: "加入附件、智能日程、公海池回收与销售龙虎榜，解决流程自动化“管得住”的问题。" },
          { title: "V3.0 · 生态与 AI 版", body: "AI 自动提取语音摘要，对接企业信息服务更新客户资信，解决决策智能化“卖得好”的问题。" },
        ],
      },
      {
        title: "V1.0 的规则定义与联动设想",
        points: [
          { title: "记录锁定", body: "定义创建后保留 24 小时编辑窗口、过期锁定的规则，以保护过程数据口径。" },
          { title: "补录限制", body: "定义历史日期仅可回溯至过去 3 个自然日。" },
          { title: "真实性校验", body: "规划上门拜访调用移动端相册或相机，并校验图片 EXIF GPS 坐标。" },
          { title: "基础资料联动", body: "规划客户签约状态变更后同步至全局客户主档。" },
          { title: "销售报表联动", body: "规划将跟进明细接入 BI 看板，用于生成销售员月度过程分析。" },
        ],
      },
    ],
  },
  dragonfly: {
    label: "PRODUCT DESIGN PORTFOLIO · 2022",
    title: "蜓火 · 高楼消防无人机",
    lead:
      "一个为期 6 周的高楼消防辅助救援概念设计项目。团队从火灾信息延迟、受困者引导和现场沟通切入，提出视觉、语音与动作识别的多模态交互方案；我主要负责调研、竞品分析、草图与部分建模。",
    hero: { src: "/legacy-images/DRAGONFL UAV.jpg", alt: "蜓火无人机主渲染图" },
    stats: [
      { label: "成果", value: "智博杯优秀奖" },
      { label: "团队", value: "3 人" },
      { label: "周期", value: "6 周" },
      { label: "负责", value: "建模 / 草图 / 调研" },
    ],
    sections: [
      {
        title: "城市高楼火灾痛点分析",
        lead: "高楼火势蔓延快、疏散困难、结构复杂且人员密集，现有救援手段难以适应建筑发展。",
        points: [
          { title: "烟囱效应蔓延快", body: "楼梯、竖井形成烟囱效应，烟雾弥漫并助长火势迅速蔓延。" },
          { title: "断电与电梯瘫痪", body: "封闭楼内易断电失去照明，电梯失去供电并可能吸入烟气。" },
          { title: "火点难以确认", body: "高楼结构复杂，火点难以迅速确认，传统器材作用受限。" },
          { title: "人群恐慌疏散难", body: "黑暗与烟雾中容易拥挤、踩踏，错误判断进一步放大风险。" },
          { title: "自救与决策考验", body: "被困者逃生知识和外部消防员的及时决策均面临巨大考验。" },
          { title: "缺乏现场感知", body: "消防员无法及时掌握火场状况与全部被困者位置。" },
        ],
        images: [{ src: "/legacy-images/dragonfly-user-map.png", alt: "高楼火灾数据调研图表" }],
      },
      {
        title: "概念方案中的多模态交互",
        lead: "探索用灯光、手势和语音建立更直观、更有安全感的逃生引导。",
        points: [
          { title: "01 · 信号灯引导", body: "设想依据温度与烟气浓度传达状态：绿色常亮表示前进，黄色慢闪表示等待，红色快闪警告危险。" },
          { title: "02 · 手势识别", body: "探索识别受困者姿态和意愿，并据此辅助调整逃生路线。" },
          { title: "03 · 语音与情绪安抚", body: "设想通过语音引导稳定情绪；识别“难受”“不能”等关键词后辅助调整救治或路线方案。" },
          { title: "04 · 空陆状态转换", body: "借助尾部叶轮与折叠结构，在室外高空、室内和狭窄通道中切换移动方式。" },
        ],
        images: [
          { src: "/legacy-images/dengguang.jpg", alt: "信号灯交互界面" },
          { src: "/legacy-images/camera.jpg", alt: "手势识别镜头与交互演示" },
          { src: "/legacy-images/dragonfly-voice.jpg", alt: "语音模块与界面展示" },
          { src: "/legacy-images/sky-land.jpg", alt: "蜓火无人机空陆转换姿态" },
        ],
      },
      {
        title: "综合救援与灭火方案",
        points: [
          { title: "主动灭火", body: "通过声波灭火与精准投放干粉灭火球，提前开辟救援通道并扫除逃生障碍。" },
          { title: "医疗救治与显示", body: "机身搭载紧急医疗物资舱和高清屏幕，可投递急救包、防烟面罩并演示急救步骤或逃生地图。" },
        ],
        images: [
          { src: "/legacy-images/dragonfly-firefighting.png", alt: "蜓火无人机灭火模块细节" },
          { src: "/legacy-images/yaopin.jpg", alt: "医疗物资舱与高清显示屏幕" },
        ],
      },
      {
        title: "概念方案中的硬件与技术设想",
        lead: "以模块化结构和传感器组合，探索高楼消防场景下的信息获取与救援辅助方式。",
        points: [
          { title: "火灾探测", body: "设想以红外感知辅助识别火情、内部结构与火源隐患。" },
          { title: "避障", body: "探索雷达与视觉协同，用于规避坠落物和复杂结构。" },
          { title: "室内外定位", body: "探索在高楼内部 GPS 信号较弱时维持定位与跟踪的可行方式。" },
          { title: "多机协同", body: "提出多机共享信息、协同通信和任务分配的概念。" },
          { title: "远程监控与测绘", body: "设想通过摄像机与红外扫描获取现场信息，辅助救援判断。" },
        ],
        images: [{ src: "/legacy-images/dragonfly-exploded.png", alt: "蜓火无人机爆炸结构图" }],
      },
    ],
  },
  beehive: {
    label: "HARDWARE ECOSYSTEM · 2022",
    title: "BEE HIVE · 城市智能养蜂",
    lead:
      "针对传统养蜂操作门槛高、状态不可见、取蜜繁琐的问题，确立“人蜂分离 + 智能托管”的产品定位，并把硬件、监控 App 与成果分享串成完整体验。",
    hero: { src: "/legacy-images/BEE HIVE.jpg", alt: "BEE HIVE 城市智能蜂箱主效果图" },
    stats: [
      { label: "成果", value: "外观设计专利" },
      { label: "团队", value: "2 人" },
      { label: "周期", value: "7 周" },
      { label: "负责", value: "建模 / 草图 / 竞品" },
    ],
    sections: [
      {
        title: "背景与趋势",
        lead: "养蜂从“养蜂促农”逐步进入“人与自然和谐共处”的城市业余养蜂阶段。",
        points: [
          { title: "1970s · 初级阶段", body: "以养蜂促农、养蜂致富和养蜂脱贫为主要目标。" },
          { title: "1990s · 产业调整", body: "养蜂成为促进农业和养殖业结构调整的重要产业。" },
          { title: "新世纪 · 城市养蜂", body: "专业养蜂增势放缓，北京、珠三角等城市的业余养蜂逐渐兴起。" },
        ],
      },
      {
        title: "创意点与结构创新",
        points: [
          { title: "功能创意", body: "将蜂箱、采蜜机和蜜蜂观察箱结合，并以可自由组装的六边形单元吸引年轻用户。" },
          { title: "结构创意", body: "利用两个蜂脾错位使蜂蜜自行流出，并将接蜜盒与引蜜管连接，简化取蜜过程。" },
        ],
        images: [{ src: "/legacy-images/beehive-ideation.png", alt: "BEE HIVE 头脑风暴与结构创意" }],
      },
      {
        title: "用户旅程与设计机会",
        points: [
          { title: "箱体准备", body: "安装步骤繁琐、耐心不足 → 简化安装步骤，降低难度。" },
          { title: "前期准备", body: "准备周期长、好奇心下降 → 增加趣味互动，提高兴趣。" },
          { title: "养殖进行", body: "新鲜感消退后容易遗忘 → 通过 App 提醒并简化管理。" },
          { title: "养殖检查", body: "专业知识不足、手足无措 → 提供健康监管与可视化指导。" },
          { title: "蜂蜜收获", body: "传统取蜜繁琐且危险 → 用智能结构完成自动取蜜。" },
        ],
      },
      {
        title: "设计深化与 CMF",
        body: [
          "通过多轮仿生形态探索，确立正六边形模块化拼接形式，既保留蜂巢的自然美感，也适应城市阳台的垂直空间。",
          "材料选择覆盖 ABS 塑料、防腐木、尼龙网布与亚克力玻璃，兼顾轻量化、耐用性和蜜蜂生活习性。",
        ],
        images: [
          { src: "/legacy-images/caotufengchao.jpg", alt: "BEE HIVE 产品草图" },
          { src: "/legacy-images/baozhatufengchao.jpg", alt: "BEE HIVE CMF 与爆炸图" },
        ],
      },
      {
        title: "智能监控 App 与城市场景",
        points: [
          { title: "第一阶段", body: "创建用户档案并绑定蜂箱。" },
          { title: "第二阶段", body: "实时监控筑蜜进度，将数据可视化。" },
          { title: "第三阶段", body: "查看温度和健康状态，及时接收报警。" },
          { title: "第四阶段", body: "在社区分享养蜂成果，与同好交流。" },
        ],
        body: ["六边形单元可自由拼接成不同造型，让用户获得 DIY 参与感，同时成为城市建筑外立面中的自然景观。"],
        images: [
          { src: "/legacy-images/beehive-city-effect.jpg", alt: "BEE HIVE 城市应用效果图" },
          { src: "/legacy-images/fengchaochangjing.jpg", alt: "BEE HIVE 城市应用场景" },
        ],
      },
    ],
  },
  icpb: {
    label: "CONSUMER ELECTRONICS · 2022",
    title: "ICPB · 创意共享充电宝",
    lead:
      "针对共享充电宝外形同质化、弹出后难以拿取和归还方向不清的问题，以“雪糕棍”手柄完成兼顾辨识度与人机体验的微创新。",
    hero: { src: "/legacy-images/ICPB.jpg", alt: "ICPB 创意共享充电宝主效果图" },
    stats: [
      { label: "成果", value: "欧洲产品设计奖 Winner" },
      { label: "团队", value: "3 人" },
      { label: "周期", value: "2 周" },
      { label: "负责", value: "草图 / 竞品 / 调研" },
    ],
    sections: [
      {
        title: "项目背景",
        body: ["共享充电宝普遍采用方正、单调的外形。在多品牌依赖场所投放争夺用户注意力的环境中，项目希望通过创意造型形成更直接的产品吸引力。"],
      },
      {
        title: "用户需求与痛点",
        points: [
          { title: "寻找与选择", body: "产品种类众多但外形相近，缺乏能快速建立兴趣和记忆的视觉特征。" },
          { title: "扫码拿取", body: "充电宝弹出距离不足，用户经常需要用手指抠出。" },
          { title: "归还设备", body: "外形正反面相近，用户难以快速判断插回方向。" },
        ],
      },
      {
        title: "草图构想与最终方案",
        body: [
          "从概念到实物持续探索更符合人机工程学、同时具有趣味性的雪糕造型。",
          "最终仅在尾部增加“雪糕棍”手柄，并配合清新 CMF：手柄帮助用户判断归还方向，也让拿取和放回更省力；像拿雪糕一样的动作进一步强化趣味性和记忆点。",
        ],
        images: [{ src: "/legacy-images/cdb-caotu.jpg", alt: "ICPB 草图构想" }],
      },
      {
        title: "使用流程与最终呈现",
        points: [
          { title: "01 · 扫码弹出", body: "完成租借后设备弹出，手柄为用户提供清晰抓取点。" },
          { title: "02 · 拿出充电宝", body: "无需抠取，直接握住手柄抽出设备。" },
          { title: "03 · 给手机充电", body: "轻量化造型与清新配色强化日常携带体验。" },
          { title: "04 · 归还设备", body: "手柄位置天然提示插入方向，降低操作判断成本。" },
        ],
        images: [
          { src: "/legacy-images/cdb-tanchu.jpg", alt: "ICPB 扫码弹出充电宝" },
          { src: "/legacy-images/cdb-naqu.jpg", alt: "ICPB 拿出充电宝" },
          { src: "/legacy-images/cdb-chongdian.jpg", alt: "ICPB 给手机充电" },
          { src: "/legacy-images/cdbchangjing.jpg", alt: "ICPB 最终方案渲染图" },
        ],
      },
    ],
  },
};

const portfolioItems = [...projects, ...practices];

const categories = ["全部", "产品", "体验"] as const;

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.id === "mindanchor") {
    return (
      <div className="project-image visual-mindanchor" role="img" aria-label="MindAnchor 任务节奏与专注陪伴界面示意">
        <span className="project-cover-kicker">ADHD · AI COMPANION</span>
        <div className="project-cover-board"><img src="/legacy-images/mindanchor.jpg" alt="MindAnchor 任务时间线界面" loading="lazy" /></div>
      </div>
    );
  }

  if (project.id === "crm") {
    return (
      <div className="project-image visual-cargoware" role="img" aria-label="CargoWare CRM 客户跟进界面示意">
        <span className="project-cover-kicker">SALES · FOLLOW-UP · CRM</span>
        <div className="project-cover-board"><img src="/legacy-images/cargoware.jpg" alt="CargoWare CRM 销售跟进界面" loading="lazy" /></div>
      </div>
    );
  }

  if (project.image) {
    return (
      <div className={`project-image ${compact ? "compact" : ""}`}>
        <img src={project.image} alt={`${project.title} 项目封面`} loading="lazy" />
      </div>
    );
  }

  if (project.visual === "shishi") {
    return (
      <div className="project-image visual-shishi" role="img" aria-label="柿柿专注首页、计划室与 AI 服务真实界面组合">
        <span className="shishi-card-kicker">FOCUS · PLAN · SPACE</span>
        <div className="shishi-card-screens" aria-hidden="true">
          <figure className="shishi-card-screen shishi-card-screen-home"><img src="/shishi-ui/IMG_9718-card.jpg" alt="" loading="lazy" /></figure>
          <figure className="shishi-card-screen shishi-card-screen-plan"><img src="/shishi-ui/IMG_9738-card.jpg" alt="" loading="lazy" /></figure>
          <figure className="shishi-card-screen shishi-card-screen-ai"><img src="/shishi-ui/IMG_9725-card.jpg" alt="" loading="lazy" /></figure>
        </div>
      </div>
    );
  }

  if (project.visual === "merchant") {
    return (
      <div className="project-image visual-merchant" aria-label="柿柿专注数据与经营平台界面示意">
        <span className="merchant-card-note">DATA → AUDIENCE → ACTION</span>
        <div className="merchant-card-board">
          <div className="merchant-card-shot"><img src="/merchant-ui/platform-overview-card.png" alt="柿柿专注平台数据总览" loading="lazy" /></div>
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

function CargoFeatureDiagram({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <div className="cargo-diagram cargo-layout-diagram" aria-label="左侧列表与右侧详情布局示意">
        <div className="cargo-diagram-list"><i /><b /><b /><b /></div>
        <div className="cargo-diagram-detail"><i /><b /><b /></div>
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="cargo-diagram cargo-list-diagram" aria-label="智能客户列表看板示意">
        <div><span>按状态筛选</span><span>长期未维护</span></div>
        <article><b>宁波港联运通</b><em>超30天未跟进</em></article>
        <article><b>北京中铁快运</b><small>2天前跟进</small></article>
      </div>
    );
  }
  return (
    <div className="cargo-diagram cargo-form-diagram" aria-label="强管控跟进表单示意">
      <div><i /><strong>✓ 上门拜访</strong></div>
      <b />
      <p><MapPinned size={16} /> 必须上传包含 GPS 水印的拜访现场照片</p>
    </div>
  );
}

function CargoCaseStudySections({ study }: { study: CaseStudy }) {
  const goals = study.sections[0];
  const roles = study.sections[1];
  const features = study.sections[2];
  const ideas = study.sections[3];
  const roadmap = study.sections[4];
  const rules = study.sections[5];
  const goalIcons = [ArchiveRestore, BarChart3, Database];
  const roleIcons = [UserRound, UsersRound, UserCog];
  const ideaIcons = [RefreshCw, CalendarClock, Sparkles, Mic2, ShieldCheck, Workflow];

  return (
    <div className="case-study-sections cargo-study-sections">
      <section className="case-study-section cargo-goals-section">
        <div className="case-section-heading"><span>01</span><div><h3>{goals.title}</h3>{goals.lead && <p>{goals.lead}</p>}</div></div>
        <div className="cargo-icon-cards cargo-goal-cards">
          {goals.points?.map((point, index) => {
            const Icon = goalIcons[index];
            return <article key={point.title}><i><Icon /></i><h4>{point.title}</h4><p>{point.body}</p></article>;
          })}
        </div>
      </section>

      <section className="case-study-section cargo-roles-section">
        <div className="case-section-heading"><span>02</span><div><h3>{roles.title}</h3>{roles.lead && <p>{roles.lead}</p>}</div></div>
        <div className="cargo-icon-cards cargo-role-cards">
          {roles.points?.map((point, index) => {
            const Icon = roleIcons[index];
            return <article key={point.title}><i><Icon /></i><h4>{point.title}</h4><p>{point.body}</p></article>;
          })}
        </div>
      </section>

      <section className="case-study-section cargo-features-section">
        <div className="case-section-heading"><span>03</span><div><h3>{features.title}</h3>{features.lead && <p>{features.lead}</p>}</div></div>
        <div className="cargo-feature-flow">
          {features.points?.map((point, index) => (
            <article key={point.title}>
              <div className="cargo-feature-copy"><span>0{index + 1}</span><h4>{point.title.replace(/^\d+ · /, "")}</h4><p>{point.body}</p></div>
              <CargoFeatureDiagram variant={index} />
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-section cargo-ideas-section">
        <div className="case-section-heading"><span>04</span><div><h3>{ideas.title}</h3>{ideas.lead && <p>{ideas.lead}</p>}</div></div>
        <div className="cargo-icon-cards cargo-idea-cards">
          {ideas.points?.map((point, index) => {
            const Icon = ideaIcons[index];
            return <article key={point.title}><i><Icon /></i><h4>{point.title}</h4><p>{point.body}</p></article>;
          })}
        </div>
      </section>

      <section className="case-study-section cargo-planning-section">
        <div className="cargo-planning-grid">
          <div className="cargo-roadmap-column">
            <h3>{roadmap.title}</h3>
            <div className="cargo-roadmap">
              {roadmap.points?.map((point, index) => (
                <article key={point.title}>
                  <span>{index + 1}</span>
                  <div><h4>{point.title}</h4>{index === 0 && <small>当前范围</small>}<p>{point.body}</p></div>
                </article>
              ))}
            </div>
          </div>
          <div className="cargo-rules-column">
            <h3>{rules.title}</h3>
            <article><h4><ShieldCheck /> 规则限制 / Risk Mitigation</h4>{rules.points?.slice(0, 3).map((point) => <p key={point.title}><b>{point.title}：</b>{point.body}</p>)}</article>
            <article><h4><Workflow /> 数据联动 / Business Linkage</h4>{rules.points?.slice(3).map((point) => <p key={point.title}><b>{point.title}：</b>{point.body}</p>)}</article>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShishiCaseCover() {
  return (
    <div className="shishi-cover-art" aria-label="柿柿专注小程序核心界面组合封面">
      <div className="shishi-cover-copy"><span>FOCUS · PLAN · SPACE</span><strong>把“想学”<br />带回今天。</strong><small>小程序 × AI × 线下自习室</small></div>
      <div className="shishi-cover-phones" aria-hidden="true">
        <img src="/shishi-ui/IMG_9738.PNG" alt="" />
        <img src="/shishi-ui/IMG_9718.PNG" alt="" />
        <img src="/shishi-ui/IMG_9725.PNG" alt="" />
      </div>
      <i className="shishi-cover-sun" /><i className="shishi-cover-grid" />
    </div>
  );
}

function ShishiPhone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <figure className={`shishi-phone ${className}`}><img src={src} alt={alt} loading="lazy" /></figure>;
}

function ShishiSectionHeading({ number, eyebrow, title, lead }: { number: string; eyebrow: string; title: string; lead?: string }) {
  return <div className="shishi-section-heading"><span>{number}</span><div><small>{eyebrow}</small><h3>{title}</h3>{lead && <p>{lead}</p>}</div></div>;
}

function ShishiCaseStudySections({ onOpenMerchant }: { onOpenMerchant: () => void }) {
  return (
    <div className="shishi-case-sections">
      <section className="shishi-origin">
        <ShishiSectionHeading number="01" eyebrow="ORIGIN / 项目来源" title="从一次到店自习，延长为一段持续的学习关系" />
        <div className="shishi-origin-layout">
          <blockquote>用户并不缺一个计时器。<br />真正缺少的是：离开自习室以后，仍然知道下一步该做什么。</blockquote>
          <div><p>项目源于线下自习室的真实经营场景：门店能够承接一次到店学习，却很难继续参与用户之后的计划、执行与复盘；用户手里的目标、计时、资料和记录也分散在不同工具中。</p><p>因此，我们没有把柿柿专注定义成单点效率工具，而是从“目标如何落到今天”出发，连接计划、专注、学习记录、线上自习、线下门店与积分权益，同时为经营者补上理解用户行为的 B 端工具。</p></div>
        </div>
        <div className="shishi-context-strip"><div><b>2026.05</b><span>项目启动</span></div><div><b>C 端 + B 端</b><span>小程序与商家运营网站</span></div><div><b>2026.08.03</b><span>V1 上线并开始冷启动</span></div></div>
      </section>

      <section className="shishi-loop-section">
        <ShishiSectionHeading number="02" eyebrow="PRODUCT STRATEGY / 产品策略" title="不是堆功能，而是让每一步自然走向下一步" lead="我先定义一条最小可验证闭环，再让 AI、空间与权益围绕这条主链路生长。" />
        <div className="shishi-loop" aria-label="柿柿专注学习闭环">
          {[["01","定目标","知道为什么学"],["02","拆到今天","明确现在做什么"],["03","进入专注","减少启动阻力"],["04","留下记录","只记录真实发生"],["05","复盘调整","让计划适应现实"]].map(([n,title,note]) => <article key={n}><b>{n}</b><strong>{title}</strong><span>{note}</span></article>)}
        </div>
        <div className="shishi-version-note"><b>版本取舍</b><p>V1 先验证专注、AI 服务、权益与空间入口是否被真实使用；计划室作为 V2 重点模块推进，避免在缺少行为证据时一次性做成庞大系统。</p></div>
      </section>

      <section className="shishi-feature shishi-feature-home">
        <ShishiSectionHeading number="03" eyebrow="CORE EXPERIENCE / 首页与专注" title="打开首页，就能回答“我现在该做什么”" />
        <div className="shishi-split-feature">
          <div className="shishi-copy-stack"><article><small>WHY / 为什么做</small><h4>学习的第一道阻力，往往是重新进入状态。</h4><p>如果首页只是功能入口集合，用户仍要自己判断从哪里开始。我们需要先呈现今天的状态，再给出最短行动路径。</p></article><article><small>WHAT / 做成什么</small><h4>把今日学习、快捷专注与累计反馈放在同一视线。</h4><p>首页聚合公共自习室、签到、番茄钟和学习数据；用户既可以快速开始一次专注，也能看到持续学习留下的结果。</p></article></div>
          <div className="shishi-phone-scene home-scene"><ShishiPhone src="/shishi-ui/IMG_9718.PNG" alt="柿柿专注首页，展示公共自习室、番茄钟与学习数据" /></div>
        </div>
        <div className="shishi-wide-story"><ShishiPhone src="/shishi-ui/IMG_9742.PNG" alt="柿柿专注线上自习室空间选择界面" /><ShishiPhone src="/shishi-ui/IMG_9743.PNG" alt="柿柿专注亮区公共自习室实时选座界面" /><div><small>ONLINE STUDY ROOM / 线上自习室</small><h4>专注不只是一个人的倒计时。</h4><p>用户可按明暗、交流氛围选择线上空间，再进入公共教室选座。空间状态、实时人数和座位占用让“有人一起学”变得可感知，同时保留安静区不发弹幕的边界。</p></div></div>
      </section>

      <section className="shishi-feature shishi-tarot-section">
        <ShishiSectionHeading number="04" eyebrow="AI SERVICE / AI 塔罗" title="不把 AI 塞进聊天框，而是设计一段完整服务" lead="这是我独立负责产品设计、开发联调与 AI 接入的核心模块。" />
        <div className="shishi-feature-rationale"><article><b>为什么需要</b><p>用户需要的不是一次随机答案，而是一段能够承接问题、建立期待、解释结果并继续追问的体验。</p></article><article><b>产品判断</b><p>用牌阵和抽牌建立明确流程，用上下文连续对话保留服务深度，再用积分、登录与异常规则控制真实使用边界。</p></article></div>
        <div className="shishi-tarot-flow">
          {[["/shishi-ui/IMG_9719.PNG","01","提出问题","先帮助用户说清此刻真正关心的事。"],["/shishi-ui/IMG_9720.PNG","02","选择牌阵","单张快速指引或过去／现在／未来三张牌。"],["/shishi-ui/IMG_9725.PNG","03","结构化解读","结合正逆位与牌面关系输出可阅读的解释。"],["/shishi-ui/IMG_9728.PNG","04","继续追问","保留同一次抽牌上下文，让问题可以被继续展开。"]].map(([src,n,title,note]) => <article key={n}><ShishiPhone src={src} alt={`柿柿专注 AI 塔罗${title}界面`} /><div><b>{n}</b><h4>{title}</h4><p>{note}</p></div></article>)}
        </div>
        <div className="shishi-rule-line"><span>78 张完整牌组</span><span>正／逆位</span><span>连续上下文</span><span>小柿饼扣减</span><span>服务端价格校验</span><span>异常兜底</span></div>
      </section>

      <section className="shishi-feature shishi-plan-section">
        <ShishiSectionHeading number="05" eyebrow="AI PLANNING / 计划室" title="计划不是生成完就结束，而要经得起每天的变化" lead="计划室正在作为第二版重点模块推进；以下界面展示的是已完成的产品与交互方案，不将其表述为首版上线结果。" />
        <div className="shishi-plan-hero"><div><small>WHY / 为什么做</small><h4>长期目标太远，普通待办又看不到全局。</h4><p>用户需要一条介于“我要上岸”和“今天背 20 个词”之间的可调整路径；AI 可以计算，但不能替用户决定。</p><blockquote>长期阶段定方向，周计划由用户确认，今日任务才进入执行。</blockquote></div><ShishiPhone src="/shishi-ui/IMG_9738.PNG" alt="柿柿专注计划室总览界面" /></div>
        <div className="shishi-plan-steps"><article><ShishiPhone src="/shishi-ui/IMG_9739.PNG" alt="AI 生成学习路线后的计划确认界面" /><div><b>01</b><h4>先确认路线</h4><p>结合目标日期、当前水平、资料与可用时间生成阶段计划；用户确认后再继续，不让 AI 直接覆盖现实安排。</p></div></article><article><ShishiPhone src="/shishi-ui/IMG_9740.PNG" alt="计划室每日任务清单界面" /><div><b>02</b><h4>再落到今天</h4><p>把阶段目标拆成按学科、用时和完成标准组织的今日任务，并提供“按计划来／今天有点赶”的节奏选择。</p></div></article><article><ShishiPhone src="/shishi-ui/IMG_9741.PNG" alt="真实学习完成数据与记录界面" /><div><b>03</b><h4>只记录真实发生</h4><p>日、周、月、年维度保留实际完成与真实专注时长，后续计划调整也不会覆盖已经发生的学习。</p></div></article></div>
        <div className="shishi-plan-flow">目标与资料 <i>→</i> AI 阶段计划 <i>→</i> 用户确认周计划 <i>→</i> 今日任务 <i>→</i> 专注记录 <i>→</i> 复盘调整</div>
      </section>

      <section className="shishi-feature shishi-space-section">
        <ShishiSectionHeading number="06" eyebrow="ONLINE × OFFLINE / 空间与权益" title="让线上学习留下的积累，能在线下继续发生" />
        <div className="shishi-space-grid"><article><ShishiPhone src="/shishi-ui/IMG_9736.PNG" alt="柿柿专注线下学习空间列表界面" /><div><small>找到空间</small><h4>从城市到门店</h4><p>按省市筛选门店，查看地址、营业时间、距离与特色，再进入预约或导航。</p></div></article><article><ShishiPhone src="/shishi-ui/IMG_9733.PNG" alt="柿柿专注积分与会员权益中心界面" /><div><small>积累权益</small><h4>把学习行为变成可感知资产</h4><p>小柿饼、会员、排行榜和门店权益集中呈现，让专注后的反馈不止是一串分钟数。</p></div></article></div>
      </section>

      <section className="shishi-feature shishi-merchant-section">
        <ShishiSectionHeading number="07" eyebrow="B-SIDE EXTENSION / B 端延伸" title="为了让门店理解这些行为，我又做了一套独立的经营平台" />
        <div className="shishi-merchant-bridge">
          <div><small>INDEPENDENT CASE STUDY</small><h4>柿柿专注 · 数据与经营平台</h4><p>把小程序中的引流、专注、功能访问、积分、卡券与到店行为，转化成可下钻的经营数据、规则画像和人群圈选工具。</p><button onClick={onOpenMerchant}>查看独立 B 端项目 <span>→</span></button></div>
          <div className="shishi-merchant-bridge-screen"><img src="/merchant-ui/platform-overview.png" alt="柿柿专注数据与经营平台总览" loading="lazy" /></div>
        </div>
      </section>

      <section className="shishi-results-section">
        <ShishiSectionHeading number="08" eyebrow="VALIDATION & ROLE / 验证与职责" title="先用真实行为判断产品，再决定下一版做什么" />
        <div className="shishi-results-grid"><article><strong>221</strong><span>累计注册用户</span></article><article><strong>88</strong><span>完成首次核心行为</span></article><article><strong>40%</strong><span>注册至首次核心行为</span></article><article><strong>3 家</strong><span>自习室冷启动</span></article></div>
        <p className="shishi-data-note">数据快照截至 2026.08.17。合作资源覆盖 18 个自习室品牌、60 余家门店；这里将“商业资源”与“已激活用户”严格分开表达。</p>
        <div className="shishi-role-panel"><div><small>MY ROLE / 我的职责</small><h4>产品负责人 × 全栈开发</h4></div><p>负责整体架构、版本策略、页面体系与视觉方向；独立推进 AI 塔罗和计划室的场景分析、需求优先级、信息架构、PRD、交互与 UI、页面开发、接口联调、AI 接入、积分规则、埋点、测试和迭代。B 端经营平台作为独立项目另页展开。</p></div>
      </section>
    </div>
  );
}

function MerchantSectionHeading({ number, eyebrow, title, lead }: { number: string; eyebrow: string; title: string; lead?: string }) {
  return <div className="merchant-section-heading"><span>{number}</span><div><small>{eyebrow}</small><h3>{title}</h3>{lead && <p>{lead}</p>}</div></div>;
}

function MerchantBrowserShot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <figure className={`merchant-browser-shot ${className}`}>
      <div className="merchant-browser-bar"><i /><i /><i /><span>柿柿专注 · 数据与经营平台</span></div>
      <div className="merchant-shot-viewport"><img src={src} alt={alt} loading="lazy" /></div>
    </figure>
  );
}

function MerchantDashboardPreview() {
  const summary = [
    ["引流结构", "用户从哪里来", "门店入口 · 用户分享"],
    ["学习表现", "用户是否真实学习", "专注时长 · 活跃周期"],
    ["经营机会", "谁值得继续服务", "权益状态 · 长期客线索"],
  ];
  const signals = [
    ["关联用户", "去重用户口径"],
    ["专注趋势", "按日观察变化"],
    ["门店贡献", "授权范围对比"],
  ];

  return (
    <div className="merchant-ui-schematic merchant-dashboard-preview" role="img" aria-label="门店经营看板结构示意，仅展示授权门店范围内的引流、学习表现、经营机会与权益回流信息，不含真实业务数字">
      <header className="merchant-dashboard-toolbar">
        <div><small>MERCHANT VIEW · 示意</small><b>门店经营看板</b></div>
        <span>按授权门店</span>
      </header>
      <div className="merchant-dashboard-canvas">
        <div className="merchant-dashboard-summary">
          {summary.map(([label, question, scope]) => <article key={label}><small>{label}</small><b>{question}</b><span>{scope}</span></article>)}
        </div>
        <div className="merchant-dashboard-analysis">
          <article className="merchant-dashboard-signals">
            <header><b>趋势与口径</b><span>结构示意 · 非真实数值</span></header>
            <div>{signals.map(([label, note]) => <p key={label}><span>{label}</span><b>{note}</b></p>)}</div>
          </article>
          <article className="merchant-dashboard-return">
            <header><b>权益回流</b><span>链路拆分</span></header>
            <div><span>领取</span><em>→</em><span>使用</span><em>→</em><span>核销</span></div>
            <p>分开查看线上领取与线下核销状态</p>
            <footer><b>下一步</b><span>进入人群圈选与活动设计</span></footer>
          </article>
        </div>
      </div>
    </div>
  );
}

function MerchantCampaignPreview() {
  const filters = [
    ["活动门店", "从授权门店中选择"],
    ["生命周期", "选择用户阶段"],
    ["用户价值", "选择价值等级"],
  ];
  const draftFields = [
    ["活动名称", "待填写"],
    ["卡券权益", "待选择"],
    ["活动目标", "待填写"],
  ];

  return (
    <div className="merchant-ui-schematic merchant-campaign-preview" role="img" aria-label="已脱敏的精准卡券人群圈选与活动草稿界面示意">
      <header className="merchant-preview-toolbar">
        <div><small>SMART AUDIENCE</small><b>精准卡券 · 活动草稿</b></div>
        <span>草稿模式 · 不会触达用户</span>
      </header>
      <div className="merchant-campaign-workspace">
        <aside>
          <div className="merchant-preview-panel-title"><span>01</span><b>圈选目标人群</b><small>AND 组合筛选</small></div>
          <div className="merchant-filter-grid">
            {filters.map(([label, value]) => <div className="merchant-preview-field" key={label}>{label}<span>{value}</span></div>)}
          </div>
          <div className="merchant-segment-tags">{["活跃用户", "深度专注", "下午学习", "已关注门店", "计划室偏好"].map(tag => <i key={tag}>{tag}</i>)}</div>
          <div className="merchant-match-state"><b>匹配结果</b><span>随筛选条件实时更新</span></div>
        </aside>
        <main>
          <div className="merchant-preview-panel-title"><span>02</span><b>设计卡券权益</b><small>保存为活动草稿</small></div>
          <div className="merchant-draft-grid">
            {draftFields.map(([label, value]) => <div className="merchant-preview-field" key={label}>{label}<span>{value}</span></div>)}
          </div>
          <div className="merchant-preview-actions"><small>仅保存草稿，不会直接发券或发送通知</small><span>保存活动草稿</span></div>
        </main>
      </div>
    </div>
  );
}

function MerchantCaseCover() {
  return (
    <div className="merchant-case-cover-art" aria-label="柿柿专注数据与经营平台核心界面组合封面">
      <span className="merchant-cover-note">DATA → AUDIENCE → ACTION</span>
      <MerchantBrowserShot src="/merchant-ui/platform-overview.png" alt="平台数据总览" className="merchant-cover-main" />
      <div className="merchant-cover-card merchant-cover-kpi"><small>核心路径</small><strong>行为 → 人群</strong><span>已接入线上数据</span></div>
      <div className="merchant-cover-card merchant-cover-action"><small>活动方案</small><strong>动态</strong><span>实时匹配人数</span></div>
    </div>
  );
}

function MerchantCaseStudySections() {
  const loop = ["行为采集", "统一指标", "规则画像", "人群圈选", "活动草稿", "后续验证"];
  return (
    <div className="merchant-case-sections">
      <section className="merchant-origin-section">
        <MerchantSectionHeading number="01" eyebrow="ORIGIN / 项目起点" title="为什么要单独做一套 B 端产品" />
        <div className="merchant-origin-grid">
          <blockquote>门店看得到一次到店，<br />却看不清用户离店后发生了什么。</blockquote>
          <div className="merchant-problem-list">
            <article><b>01</b><div><h4>用户从哪里来？</h4><p>直接扫码、用户分享和不同品牌门店的引流关系散落在多套记录里。</p></div></article>
            <article><b>02</b><div><h4>用户为什么留下？</h4><p>专注、计划、塔罗、积分和卡券分别发生，门店很难判断真实使用偏好。</p></div></article>
            <article><b>03</b><div><h4>下一步该做什么？</h4><p>只有汇总数字，仍无法回答应该服务哪类用户、设计什么活动。</p></div></article>
          </div>
        </div>
        <div className="merchant-role-triangle"><article><b>平台</b><span>看整体增长与经营健康</span></article><i>→</i><article><b>品牌</b><span>比较门店与引流结构</span></article><i>→</i><article><b>门店</b><span>识别人群并设计行动</span></article></div>
      </section>

      <section className="merchant-loop-section">
        <MerchantSectionHeading number="02" eyebrow="PRODUCT LOOP / 产品闭环" title="先让数据成为证据，再让证据进入行动" lead="产品不是停在看板展示，而是从行为采集一路走到人群与活动方案；尚未完成的转化回看被明确放在下一阶段。" />
        <div className="merchant-action-loop">{loop.map((item, index) => <article className={index === loop.length - 1 ? "is-next" : ""} key={item}><b>{String(index + 1).padStart(2,"0")}</b><strong>{item}</strong>{index < loop.length - 1 && <span>→</span>}</article>)}</div>
        <p className="merchant-loop-boundary"><b>NEXT</b> 自动发券、用户通知、活动归因与营销转化验证尚未实现。</p>
      </section>

      <section className="merchant-overview-section">
        <MerchantSectionHeading number="03" eyebrow="PLATFORM VIEW / 平台总览" title="先看全局，再下钻到门店与用户" lead="平台需要同时判断今天发生了什么、增长是否健康，以及不同门店贡献了什么。" />
        <MerchantBrowserShot src="/merchant-ui/platform-overview.png" alt="平台增长与经营总览，包含实时指标和趋势" className="merchant-overview-shot" />
        <p className="merchant-snapshot-note">界面数据为 2026.08.23 的实时快照，仅用于说明产品结构，不作为稳定业务成果。</p>
        <div className="merchant-overview-notes">
          <article><small>实时与今日</small><h4>判断当下是否正常</h4><p>在线、活跃、启动、新增等指标帮助平台快速发现当天变化。</p></article>
          <article><small>趋势与漏斗</small><h4>判断增长是否健康</h4><p>近 30 天趋势和首次核心行为漏斗，避免只关注累计注册。</p></article>
          <article><small>品牌与门店</small><h4>判断流量来自哪里</h4><p>按品牌和门店下钻，并区分门店直接流量与用户裂变流量。</p></article>
        </div>
      </section>

      <section className="merchant-dashboard-section">
        <MerchantSectionHeading number="04" eyebrow="MERCHANT VIEW / 经营看板" title="把指标翻译成门店真正要回答的问题" />
        <div className="merchant-dashboard-story">
          <div className="merchant-question-map">
            {[['引流用户','门店带来了多少线上用户？','调整入口与推广方式'],['专注时长','用户有没有真正学习？','设计深度学习权益'],['卡券领取／核销','线上权益是否回到线下？','优化权益与核销链路'],['潜在长期客','谁值得持续经营？','进入人群圈选']].map(([metric,question,action]) => <article key={metric}><small>{metric}</small><h4>{question}</h4><p>下一步：{action}</p></article>)}
          </div>
          <MerchantDashboardPreview />
        </div>
      </section>

      <section className="merchant-metric-section">
        <MerchantSectionHeading number="05" eyebrow="METRIC PROOF / 功能访问" title="在比较功能偏好之前，先把使用口径算对" />
        <div className="merchant-metric-proof">
          <MerchantBrowserShot src="/merchant-ui/feature-analytics.png" alt="关联用户功能访问与周期分析" />
          <div><article><b>01</b><h4>7／30／90 天切换</h4><p>用同一套周期比较功能表现和前后变化。</p></article><article><b>02</b><h4>用户 × 功能 × 日期去重</h4><p>同一用户同一天反复进入只计算一次，避免 PV 虚高。</p></article><article><b>03</b><h4>人数、活跃人天与人均天次</h4><p>把覆盖广度和使用频率拆开理解；活跃人天不等于访问次数。</p></article></div>
        </div>
      </section>

      <section className="merchant-profile-section">
        <MerchantSectionHeading number="06" eyebrow="RULE-BASED PROFILE / 用户画像" title="每一个标签，都应该能解释它从哪里来" lead="画像不是 AI 给出的模糊结论，而是根据学习、门店和权益行为形成的规则判断。" />
        <div className="merchant-profile-formula"><span>专注记录</span><i>+</i><span>功能访问</span><i>+</i><span>门店行为</span><i>+</i><span>权益行为</span><b>=</b><strong>可解释用户画像</strong></div>
        <div className="merchant-profile-lab">
          <div className="merchant-anon-table"><header><b>匿名用户</b><span>生命周期</span><span>价值</span><span>画像证据</span></header>{[['用户 A','活跃','中价值','深度专注 · 已领取卡券'],['用户 B','沉默','低价值','下午学习 · 访问过门店'],['用户 C','活跃','高价值','计划室偏好 · 高频到店'],['用户 D','新用户','待判断','数据积累中']].map(row => <article key={row[0]}>{row.map(cell => <span key={cell}>{cell}</span>)}</article>)}</div>
          <aside><small>标签标本盒</small>{['生命周期','用户价值','专注深度','学习时段','计划执行','门店关系','卡券状态'].map(tag => <span key={tag}>{tag}</span>)}<p>标签保留证据数量、置信度、有效期与数据不足提示，并随新行为增量更新。</p></aside>
        </div>
      </section>

      <section className="merchant-campaign-section">
        <MerchantSectionHeading number="07" eyebrow="SMART AUDIENCE / 精准卡券" title="先圈选人群，再设计权益" />
        <div className="merchant-stage-stamps"><span>① 先圈选人群</span><span>② 再设计权益</span></div>
        <MerchantCampaignPreview />
        <div className="merchant-campaign-notes"><article><b>AND 组合筛选</b><p>门店、生命周期、价值、学习时段与画像标签需要同时满足。</p></article><article><b>实时匹配人数</b><p>在设计权益前先确认目标人群是否存在，避免方案脱离数据。</p></article><article className="boundary"><b>当前边界</b><p>目前只保存活动草稿，不会直接发券；尚无营销转化成果。</p></article></div>
      </section>

      <section className="merchant-trace-section">
        <MerchantSectionHeading number="08" eyebrow="EVIDENCE TRAIL / 行为轨迹" title="画像告诉我们“他是哪类用户”，轨迹解释“为什么这样判断”" />
        <div className="merchant-trace-story">
          <div className="merchant-trace-mock"><aside><b>匿名用户 A</b><span>匿名用户 B</span><span>匿名用户 C</span><span>匿名用户 D</span></aside><main>{[['20:18','回到小程序','小程序'],['19:35','进入页面','首页'],['19:32','完成专注','专注计时'],['18:50','领取卡券','权益中心']].map(([time,action,page]) => <article key={time}><time>{time}</time><i /><b>{action}</b><span>{page}</span></article>)}</main></div>
          <div><blockquote>标签负责归纳，<br />轨迹负责举证。</blockquote><p>支持按用户、行为类型和日期回看启动、页面进入、停留与结构化操作；新埋点启用后的轨迹才完整，不暗示覆盖全部历史。</p><div className="merchant-event-chips"><span>启动</span><span>进入页面</span><span>完成专注</span><span>领取卡券</span><span>核销</span></div></div>
        </div>
      </section>

      <section className="merchant-privacy-section">
        <MerchantSectionHeading number="09" eyebrow="PRIVACY BY DESIGN / 权限与隐私" title="经营数据只能在被授权的范围内流动" />
        <div className="merchant-privacy-layout">
          <div className="merchant-permission-steps"><article><b>平台</b><span>独立平台权限</span></article><article><b>品牌</b><span>品牌授权门店范围</span></article><article><b>门店</b><span>仅查看本店关联用户</span></article></div>
          <div className="merchant-privacy-board"><article><ShieldCheck /><h4>数据范围隔离</h4><p>服务端按账号授权的门店 ID 过滤。</p></article><article><UserRound /><h4>手机号脱敏</h4><p>前台只返回脱敏值，不展示完整号码。</p></article><article><Database /><h4>受控云函数汇总</h4><p>浏览器不直接读取业务与埋点集合。</p></article><article><BarChart3 /><h4>统计口径去重</h4><p>功能使用按用户、功能与日期聚合。</p></article></div>
        </div>
      </section>

      <section className="merchant-close-section">
        <MerchantSectionHeading number="10" eyebrow="DELIVERY & BOUNDARY / 交付与边界" title="从产品定义到线上数据，我负责把整条链路真正接起来" />
        <div className="merchant-scope-line">{['产品规划','信息架构','指标口径','UX／UI','前后端开发','CloudBase','权限设计','测试部署'].map(item => <span key={item}>{item}</span>)}</div>
        <div className="merchant-close-grid"><article><small>DELIVERED / 已完成</small><h4>可以被真实使用的经营工作台</h4><ul><li>平台／门店看板、功能分析与规则画像</li><li>行为轨迹、人群组合圈选与活动草稿</li><li>线上数据、账号权限、脱敏与统计测试</li></ul></article><article><small>NOT YET / 不夸大</small><h4>仍需要下一阶段验证</h4><ul><li>自动发券、用户通知和活动归因尚未实现</li><li>尚无增收、留存或营销转化提升结论</li></ul></article></div>
        <div className="merchant-final-line"><span>已部署 · 已接入线上数据</span><strong>从看见数据，到知道下一步做什么。</strong></div>
      </section>
    </div>
  );
}

function CaseStudyDetail({
  project,
  study,
  onNext,
}: {
  project: Project;
  study: CaseStudy;
  onNext: () => void;
}) {
  return (
    <div className="case-study" style={{ "--accent": project.accent } as React.CSSProperties}>
      <header className="case-study-hero">
        <div className="case-study-intro">
          <span className="case-label">{study.label}</span>
          <img className="case-study-icon" src={project.icon} alt="" aria-hidden="true" />
          <h2 id="project-modal-title">{study.title}</h2>
          {(project.link || project.merchantLink) && (
            <div className="case-study-launches">
              {project.link && <a className="case-study-launch" href={project.link} target="_blank" rel="noreferrer">打开小程序 ↗</a>}
              {project.merchantLink && <a className="case-study-launch" href={project.merchantLink} target="_blank" rel="noreferrer">打开商家网站 ↗</a>}
            </div>
          )}
          <p>{study.lead}</p>
          <div className="case-study-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <figure className={`case-study-cover${project.id === "shishi" ? " shishi-case-cover" : ""}${project.id === "merchant" ? " merchant-case-cover" : ""}`}>
          {project.id === "shishi" ? <ShishiCaseCover /> : project.id === "merchant" ? <MerchantCaseCover /> : study.heroVisual === "project" ? <ProjectVisual project={project} /> : <img src={study.hero.src} alt={study.hero.alt} />}
          <figcaption>{study.hero.alt}</figcaption>
        </figure>
        <div className="case-study-stats">
          {study.stats.map((stat) => (
            <div key={stat.label}><small>{stat.label}</small><strong>{stat.value}</strong></div>
          ))}
        </div>
      </header>

      {project.id === "shishi" ? <ShishiCaseStudySections onOpenMerchant={onNext} /> : project.id === "merchant" ? <MerchantCaseStudySections /> : project.id === "crm" ? <CargoCaseStudySections study={study} /> : <div className="case-study-sections">
        {study.sections.map((section, sectionIndex) => {
          const pairedStory = Boolean(section.points?.length && section.images?.length === section.points.length);
          return (
          <section className="case-study-section" key={section.title}>
            <div className="case-section-heading">
              <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
              <div>
                <h3>{section.title}</h3>
                {section.lead && <p>{section.lead}</p>}
              </div>
            </div>
            {section.body?.map((paragraph) => <p className="case-section-body" key={paragraph}>{paragraph}</p>)}
            {pairedStory && (
              <div className="case-story-flow">
                {section.points?.map((point, index) => (
                  <article key={point.title}>
                    <div><span>{String(index + 1).padStart(2, "0")}</span><h4>{point.title.replace(/^\d+ · /, "")}</h4><p>{point.body}</p></div>
                    <figure><img src={section.images?.[index]?.src ?? ""} alt={section.images?.[index]?.alt ?? ""} loading="lazy" /><figcaption>{section.images?.[index]?.alt}</figcaption></figure>
                  </article>
                ))}
              </div>
            )}
            {section.points && !pairedStory && (
              <div className="case-points">
                {section.points.map((point) => (
                  <article key={point.title}>
                    <h4>{point.title}</h4>
                    <p>{point.body}</p>
                  </article>
                ))}
              </div>
            )}
            {section.images && !pairedStory && (
              <div className={`case-image-grid${section.images.length === 1 ? " one" : ""}`}>
                {section.images.map((image) => (
                  <figure key={image.src}>
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>{image.alt}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>
        )})}
      </div>}

      <footer className="case-study-footer">
        <div><span>{project.year}</span><strong>{project.title}</strong></div>
        <button className="next-project" onClick={onNext}>下一个内容 <span>→</span></button>
      </footer>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("全部");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [checks, setChecks] = useState([false, false, false]);
  const [contactDoodleIndex, setContactDoodleIndex] = useState(4);
  const [cursorBursts, setCursorBursts] = useState<CursorBurst[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBurstIdRef = useRef(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);
  const jobDeckClickTimesRef = useRef<number[]>([]);

  const filtered = useMemo(
    () => (filter === "全部" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  useEffect(() => {
    const move = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const burst = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const id = cursorBurstIdRef.current++;
      setCursorBursts((current) => [...current.slice(-4), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setCursorBursts((current) => current.filter((item) => item.id !== id)), 520);
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
      setCard(1, -245, -90, -2.4, 1, -330, -205, -1.5);
      setCard(2, 90, 25, -9, 0.46, -270, 105, -5);
      setCard(3, 260, -15, 6, 0.37, 205, 78, 1);
      setCard(4, 230, 130, 3, 0.28, 0, 510, -0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", burst, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", burst);
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

  useEffect(() => {
    if (!activeProject) return;
    window.requestAnimationFrame(() => {
      modalRef.current?.scrollTo({ top: 0, behavior: "auto" });
      modalCloseRef.current?.focus({ preventScroll: true });
    });
  }, [activeProject]);

  const allChecked = checks.every(Boolean);
  const activeCaseStudy = activeProject ? caseStudies[activeProject.id] : undefined;
  const showNextProject = () => {
    if (!activeProject) return;
    const currentIndex = portfolioItems.findIndex((project) => project.id === activeProject.id);
    setActiveProject(portfolioItems[(currentIndex + 1) % portfolioItems.length]);
  };
  const openJobDeckAfterSecretClick = () => {
    const now = Date.now();
    jobDeckClickTimesRef.current = [...jobDeckClickTimesRef.current, now].filter((time) => now - time <= 1500);
    if (jobDeckClickTimesRef.current.length < 5) return;

    jobDeckClickTimesRef.current = [];
    window.open("https://www.shucan.xyz/recruiting", "_blank", "noopener,noreferrer");
  };

  return (
    <main>
      <div className="cursor-orbit" ref={cursorRef} aria-hidden="true">
        <svg viewBox="0 0 28 35" fill="none" aria-hidden="true">
          <path d="M2 1.5 2.8 26l6.4-7 5.3 13 5.1-2.2-5.5-12.8 11.5-1.5Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="m5.5 5.2 12.3 8.8M5.3 10l8.8 11.5" stroke="#F7EAD7" strokeWidth="1.1" strokeLinecap="round" opacity=".72" />
        </svg>
      </div>
      {cursorBursts.map((burst) => (
        <span className={`cursor-burst burst-${burst.id % 3}`} key={burst.id} style={{ left: burst.x, top: burst.y }} aria-hidden="true">
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M20 27c-4-2-5-5-4-8" />
            <path d="M15 34c-4 0-6-2-8-5" />
            <path d="M20 40c-3 3-6 3-9 1" />
            <path d="M43 27c4-2 5-5 4-8" />
            <path d="M49 34c4 0 6-2 8-5" />
            <path d="M43 40c3 3 6 3 9 1" />
          </svg>
        </span>
      ))}
      <div className="edge-rail left" aria-hidden="true">
        <img src="/handdrawn-assets/side-rail-left.png" alt="" />
        <img src="/handdrawn-assets/side-rail-left.png" alt="" />
      </div>
      <div className="edge-rail right" aria-hidden="true">
        <img src="/handdrawn-assets/side-rail-right.png" alt="" />
        <img src="/handdrawn-assets/side-rail-right.png" alt="" />
      </div>

      <nav className="top-nav" aria-label="主导航">
        <a className="nav-mark" href="#top" aria-label="返回首页"><span>惟</span><img className="nav-mark-doodle" src="/handdrawn-assets/generated/shuweijia-nav-wave-small.png" alt="" aria-hidden="true" /></a>
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
                      <div><b>02</b><span>WORK EXPERIENCE / 工作经历</span></div>
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
                  <strong>舒惟佳</strong>
                  <small>PRODUCT · EXPERIENCE</small>
                </div>
                <div className="cover-inside">
                  <div className="hero-copy cover-copy">
                    <span className="eyebrow">SHU WEIJIA · PRODUCT & AI DEVELOPMENT</span>
                    <div className="signature">舒惟佳</div>
                    <h1>用户研究、<br />产品设计与 AI 开发。</h1>
                    <p>产品经理 × AI 开发<br />深圳 · GMT +8</p>
                    <a className="scribble-link" href="#experience">向下滑动查看工作与项目 <span>↓</span></a>
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
                  <aside className="profile-note" aria-label="个人概述">
                    <span>PROFILE / 个人概述</span>
                    <p>985 本硕，具备智能硬件 App AI 产品预研、AI Agent 接入及 C 端／B 端产品从 0 到 1 落地经验。在韶音负责跑者 AI 记录功能预研与 Shokz App 未来 2—3 年 AI 路线规划；作为核心成员参与「柿柿专注」小程序及商家运营网站落地，其中独立负责 AI 塔罗、计划室和 B 端运营网站等核心模块。能够从用户研究、产品定义推进至开发上线，并结合用户行为数据持续迭代。</p>
                    <small>研究驱动 · AI 落地 · 体验设计</small>
                  </aside>
                </div>
                <div className="poured-card poured-card-4 skills-card">
                  <header className="skills-card-header">
                    <span className="eyebrow">CAPABILITIES / 能力技能</span>
                    <small>PRODUCT · AI · DESIGN · BUILD</small>
                  </header>
                  <div className="skills-grid">
                    <article>
                      <b>01</b>
                      <h3>产品与策略</h3>
                      <p>用户研究 · 竞品分析<br />需求拆解 · 产品路线</p>
                    </article>
                    <article>
                      <b>02</b>
                      <h3>体验与设计</h3>
                      <p>信息架构 · PRD<br />交互原型 · 服务设计</p>
                    </article>
                    <article>
                      <b>03</b>
                      <h3>AI 与开发</h3>
                      <p>AI Agent · Prompt<br />React · TypeScript</p>
                    </article>
                    <article>
                      <b>04</b>
                      <h3>数据与协作</h3>
                      <p>指标体系 · 数据看板<br />跨团队推进 · 项目管理</p>
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
          <div className="tape-title"><span>02</span> WORK EXPERIENCE / 工作经历</div>
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
            面向跑者智能耳机及配套 App，围绕“跑中不看屏、少操作”的需求，完成设备／媒体控制、场景化音乐、运动数据语音查询与 AI 随心记四类能力预研，并参与 Shokz App 未来 2—3 年个人知识、轻量社区、AI 与商业化策略探索。
          </p>

          <div className="experience-metrics" aria-label="工作经历数据摘要">
            <div><b>9 + 9</b><span>公开社区与 AI 记录产品调研</span></div>
            <div><b>30 → 10</b><span>分钟 / 单人语料测试（含准备）</span></div>
            <div><b>约 3 倍</b><span>相同时间内的测试吞吐提升</span></div>
          </div>

          <div className="experience-work">
            <article>
              <small>01 · AI 随心记</small>
              <h4>定义低打扰记录链路</h4>
              <p>按跑步 7 个阶段归纳 5 类记录需求，确定“短语音记录—后台转写与提取—跑后回看”的低打扰交互；App 承接摘要、待办、历史与后续查询。</p>
            </article>
            <article>
              <small>02 · 产品路线</small>
              <h4>规划 App 中长期演进</h4>
              <p>先沉淀运动数据、随心记与用户确认结果，形成可复用的个人知识库；再规划 AI 教练、AI 计划与主动建议，并探索赛事、会员与品牌权益协同。</p>
            </article>
            <article>
              <small>03 · 测试流程优化</small>
              <h4>把 AI 语料测试做得更高效</h4>
              <p>将 Dump 操作、场景化语料呈现、静音／停顿提醒、音频转存与命名归档整合为 AI 辅助的可视化采集流程；单人测试连同前后准备由约 30 分钟缩短至约 10 分钟。</p>
            </article>
          </div>
        </article>
      </section>

      <section className="work section-shell" id="projects">
        <div className="work-heading">
          <div className="tape-title"><span>03</span> SELECTED PROJECTS / 项目</div>
          <h2>从 0 到 1 产品、<br />B 端系统与智能硬件概念。</h2>
          <p>点击查看每个项目的背景、我的职责、方案范围与实际产出。</p>
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
          <p>工业设计、服务设计与产品造型练习，记录不同尺度下的思考过程。</p>
        </div>

        <div className="practice-grid">
          {practices.map((practice) => (
            <TiltCard key={practice.id} project={practice} onOpen={() => setActiveProject(practice)} />
          ))}
        </div>

      </section>

      <section className="connect section-shell" id="connect">
        <div className="tape-title"><span>05</span> CONNECT / 联系</div>
        <div className="connect-card">
          <div className="connect-list">
            <span className="eyebrow">我期待的合作</span>
            <h2>一起做点<br />值得发生的事。</h2>
            <div className="checklist">
              {["有真实价值的问题", "有意义的工作", "探索性团队"].map((item, index) => (
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
            <button
              className="contact-doodle"
              type="button"
              onClick={() => setContactDoodleIndex((current) => (current + 1) % contactDoodles.length)}
              aria-label={`点击切换人物插画，当前为${contactDoodles[contactDoodleIndex].alt}`}
              title="点击换一张人物插画"
            >
              <img src={contactDoodles[contactDoodleIndex].src} alt="" draggable={false} />
            </button>
            <small>CONTACT CARD · 2026</small>
            <strong>舒惟佳</strong>
            <p>产品经理 / AI 开发</p>
            <a href="mailto:swj011021@163.com">swj011021@163.com</a>
            <a href="tel:+8613212785002">+86 132 1278 5002</a>
            <button
              className="qr-faux hidden-job-deck-link"
              type="button"
              onClick={openJobDeckAfterSecretClick}
              aria-label="个人印章"
            >
              惟
            </button>
          </div>
        </div>
        <footer>
          <span>© 2026 SHU WEIJIA</span>
          <a className="back-to-top" href="#top" aria-label="回到页面顶部"><i aria-hidden="true">↗</i><span>回到开场</span></a>
          <span>深圳 · 可接受城市不限</span>
        </footer>
      </section>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveProject(null)}>
          <section ref={modalRef} className={`project-modal${activeCaseStudy ? " case-study-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button ref={modalCloseRef} className="modal-close" onClick={() => setActiveProject(null)} aria-label="关闭项目详情">×</button>
            {activeCaseStudy ? (
              <CaseStudyDetail project={activeProject} study={activeCaseStudy} onNext={showNextProject} />
            ) : (
              <>
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
                  <button className="next-project" onClick={showNextProject}>下一个内容 <span>→</span></button>
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
