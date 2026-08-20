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
  visual?: "shishi" | "crm" | "practice";
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
      "把目标规划、专注执行、学习记录、AI 陪伴、积分权益与线下自习室连接成完整学习闭环。",
    outcome:
      "首版已上线，冷启动覆盖 3 家门店；拓展至 18 个品牌、60 余家自习室，并完成配套商家运营后台。",
    tags: ["0—1 产品", "AI 能力", "C 端 + B 端"],
    icon: "/handdrawn-assets/icon-focus.png",
    link: "https://wxmpurl.cn/U5Yn4WuV7jh",
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

const caseStudies: Record<string, CaseStudy> = {
  shishi: {
    label: "0 → 1 PRODUCT CASE STUDY · 2026",
    title: "柿柿专注 · 把学习计划带回真实执行",
    lead:
      "面向自习室用户与线下学习空间，构建一套连接目标规划、专注执行、学习记录、AI 陪伴、积分权益与门店运营的产品体系。项目并不止于提供一个计时器，而是尝试让用户从“想学”稳定走到“今天真正完成了什么”，同时让线下自习室获得持续连接用户和理解经营数据的能力。",
    hero: { src: "", alt: "柿柿专注微信小程序界面示意" },
    heroVisual: "project",
    stats: [
      { label: "项目类型", value: "C 端小程序 + B 端后台" },
      { label: "我的角色", value: "产品负责人 / 全栈开发" },
      { label: "上线时间", value: "2026.08.03" },
      { label: "首轮范围", value: "3 家自习室冷启动" },
    ],
    sections: [
      {
        title: "问题定义：学习工具与学习场景是断开的",
        lead: "用户不是缺少单点工具，而是缺少一条从目标到执行、从线上到线下能够持续运转的路径。",
        points: [
          { title: "计划难以落地", body: "长期目标往往停留在“想考什么、想学什么”，缺少根据当前水平、可用时间和真实节奏拆解为当周、当天可执行任务的过程。" },
          { title: "执行与记录割裂", body: "计时、任务、学习资料与复盘分散在不同工具中，用户完成一次专注后，难以自然回到下一步行动，也难以看到长期积累。" },
          { title: "线下空间连接短暂", body: "自习室能承接一次到店学习，却难以在用户离店后持续提供服务；经营者也缺少理解引流、学习行为与权益转化的数据工具。" },
        ],
      },
      {
        title: "产品策略：先验证核心闭环，再放大计划能力",
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
        title: "B 端商家运营：把 C 端行为转化为经营动作",
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
        title: "我的端到端职责",
        body: [
          "作为产品负责人 / 全栈开发，我负责整体功能架构、模块划分、页面体系和视觉方向；其中 AI 塔罗与计划室由我独立完成场景分析、需求优先级、信息架构、PRD、流程与交互设计、UI/UX、页面开发、接口联调、AI 接入、积分规则、埋点、测试及迭代。",
          "同时，我独立完成商家运营网站的产品规划、功能设计、前后端开发与线上数据接入，并参与云函数、用户数据隔离、跨页面任务联动与异常状态等实现，保证产品方案能够直接变为可测试、可验证的版本。",
        ],
      },
    ],
  },
  crm: {
    label: "PRODUCT REQUIREMENTS DOCUMENT · V1.0",
    title: "CRM 销售跟进管理系统体验重塑",
    lead:
      "在国际货代销售过程中，沟通高度碎片化，销售人员往往依赖个人微信或 QQ 与客户沟通，导致企业内部缺乏有效的历史追溯机制和量化的 KPI 评估手段。",
    hero: { src: "/legacy-images/cargoware.jpg", alt: "CargoWare 国际货代 CRM 销售跟进模块界面" },
    stats: [
      { label: "项目类型", value: "B 端 CRM" },
      { label: "我的角色", value: "原型产品设计 / UX" },
      { label: "交付周期", value: "1 周" },
      { label: "版本范围", value: "V1.0—V3.0" },
    ],
    sections: [
      {
        title: "核心目标",
        lead: "通过结构化设计沉淀客户资产，以可视化数据驱动销售效能和管理决策。",
        points: [
          { title: "沉淀客户资产", body: "通过结构化录入，将沟通记录从个人社交软件转移并沉淀到企业系统中。" },
          { title: "驱动销售效能", body: "提供直观的统计看板，量化当月工作量，激发销售动力。" },
          { title: "辅助业务决策", body: "为管理层提供真实、可追溯的过程数据，作为绩效考核的可靠依据。" },
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
          { title: "03 · 强管控操作中心", body: "集成时间、方式、结果与内容表单。选择“上门拜访”时强制上传含 GPS 水印的现场照片，并将跟进结果关联客户生命周期。" },
        ],
      },
      {
        title: "深度思考与体验优化",
        lead: "让产品不仅是记录工具，也成为驱动业务增长的引擎。",
        points: [
          { title: "公海池自动流转", body: "无效沟通且超过 30 天未维护时，自动触发移入公海池，释放并盘活客户资源。" },
          { title: "强制下一步计划", body: "保存记录时填写下次跟进时间，并自动写入系统日程，减少漏单与遗忘。" },
          { title: "智能 SOP 触发", body: "录入“明确需求”后自动推送询价模板或待办，缩短转化路径。" },
          { title: "移动端与语音识别", body: "覆盖户外销售场景，并支持语音转文字快捷录入，降低填写门槛。" },
          { title: "防作弊补录时限", body: "仅允许补录过去 3 天内的记录，超期需主管审批解锁，避免月末突击补录。" },
          { title: "生命周期自动映射", body: "正式签约后自动变更为合作中；连续 3 次无效沟通则提示放弃。" },
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
        title: "落地规则与业务联动",
        points: [
          { title: "记录锁定", body: "创建后仅保留 24 小时编辑窗口，过期锁定，保证考核严肃性。" },
          { title: "补录限制", body: "历史日期仅可回溯至过去 3 个自然日。" },
          { title: "真实性校验", body: "上门拜访需调用移动端相册或相机，并校验图片 EXIF GPS 坐标。" },
          { title: "基础资料联动", body: "客户签约状态变更后，反向同步至全局客户主档。" },
          { title: "销售报表联动", body: "跟进明细实时进入 BI 看板，生成销售员月度勤奋度分析。" },
        ],
      },
    ],
  },
  dragonfly: {
    label: "PRODUCT DESIGN PORTFOLIO · 2022",
    title: "蜓火 · 高楼消防无人机",
    lead:
      "面向高楼火灾中信息感知不足、受困者恐慌迷失和传统沟通低效等问题，建立被困人员、无人机与消防员之间的全新人机关系。",
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
        title: "功能与多模态交互创新",
        lead: "用灯光、手势和语音建立更直观、更有安全感的逃生引导。",
        points: [
          { title: "01 · 信号灯智能引导", body: "检测温度与烟气浓度：绿色常亮表示前进，黄色慢闪表示等待，红色快闪警告危险。" },
          { title: "02 · 智能手势识别", body: "识别受困者姿态和意愿，按身体状况动态调整逃生路线。" },
          { title: "03 · 语音与情绪安抚", body: "通过语音引导稳定情绪；识别“难受”“不能”等关键词后切换路线或联通救援人员。" },
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
        title: "硬件结构与技术架构",
        lead: "以模块化设计和多维传感器集群，构建高空消防的全场景掌控力。",
        points: [
          { title: "火灾探测技术", body: "实时分析火情，以红外探测内部结构和火源隐患。" },
          { title: "自动避障技术", body: "雷达与视觉协同，规避坠落物和复杂结构。" },
          { title: "室内外定位", body: "在高楼内部 GPS 信号弱的情况下仍保持三维定位与跟踪。" },
          { title: "集群控制", body: "多机共享资源、协同通信并智能分配任务。" },
          { title: "远程监控与测绘", body: "摄像机与红外扫描进行三维建模，实现全流程远程监控和余烬监管。" },
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
          { src: "/legacy-images/yonghuliuchengfengchao.jpg", alt: "BEE HIVE 智能监控 App 界面" },
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
          <p>{study.lead}</p>
          <div className="case-study-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
        <figure className="case-study-cover">
          {study.heroVisual === "project" ? <ProjectVisual project={project} /> : <img src={study.hero.src} alt={study.hero.alt} />}
          <figcaption>{study.hero.alt}</figcaption>
        </figure>
        <div className="case-study-stats">
          {study.stats.map((stat) => (
            <div key={stat.label}><small>{stat.label}</small><strong>{stat.value}</strong></div>
          ))}
        </div>
      </header>

      {project.id === "crm" ? <CargoCaseStudySections study={study} /> : <div className="case-study-sections">
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

  const allChecked = checks.every(Boolean);
  const activeCaseStudy = activeProject ? caseStudies[activeProject.id] : undefined;
  const showNextProject = () => {
    if (!activeProject) return;
    const currentIndex = portfolioItems.findIndex((project) => project.id === activeProject.id);
    setActiveProject(portfolioItems[(currentIndex + 1) % portfolioItems.length]);
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
          <section className={`project-modal${activeCaseStudy ? " case-study-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <button className="modal-close" onClick={() => setActiveProject(null)} aria-label="关闭项目详情">×</button>
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
