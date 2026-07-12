import { Milestone, SkillNode, ProjectWorld, Achievement } from "../types";

export const timelineMilestones: Milestone[] = [
  {
    id: "m1",
    year: "2018 - 2020",
    title: "STEM Spawn Point",
    subtitle: "Curuan National High School",
    description: "Acquired critical foundational knowledge in Science, Technology, Engineering, and Mathematics (STEM strands), igniting logical reasoning and early coding steps.",
    xpReward: 150,
    category: "Origin",
    details: [
      "Rigorous pre-engineering focus on mathematics and analytical logic",
      "Gained foundational algorithmic and computational problem-solving skills",
      "Graduated with top-tier scientific and logical methodology honors"
    ],
    icon: "Tv"
  },
  {
    id: "m2",
    year: "2020 - 2025",
    title: "University Academics",
    subtitle: "Western Mindanao State University",
    description: "Enrolled in BS Computer Science, mastering software engineering, relational databases, data structures, and computer science theory.",
    xpReward: 200,
    category: "Training",
    details: [
      "Pioneered object-oriented systems and software design architectures",
      "Collaborated in student developer cohorts to construct custom app prototypes",
      "Actively participated as a Google Developer Student Club Member, networking and attending DevFest"
    ],
    icon: "BookOpen"
  },
  {
    id: "m3",
    year: "2023 - 2024",
    title: "UPress CMS Quest",
    subtitle: "Full-stack Developer - Purchase Order System",
    description: "Commissioned to build a web-based Purchase Order System for WMSU UPRESS to streamline seasonal procurement demand and departmental requests.",
    xpReward: 300,
    category: "First Quest",
    details: [
      "Enabled order tracking by academic year and appointment scheduling",
      "Organized departmental requests, improving university operational efficiency",
      "Crafted php routing logic and data persistence mapping"
    ],
    icon: "ShieldAlert"
  },
  {
    id: "m4",
    year: "2023 - 2024",
    title: "Agri-Map GIS Raid",
    subtitle: "Full-stack GIS Developer - Agri-Map Project",
    description: "Designed and engineered Zamboanga City's first GIS-powered agricultural rice sector centralization platform to support sustainable planning.",
    xpReward: 450,
    category: "Level Up",
    details: [
      "Developed interactive GIS capabilities with Google Maps API and Laravel",
      "Centralized land profile visualization and tracking of crop yield trends",
      "Enabled real-time decision metrics for municipal local government planners"
    ],
    icon: "Sword"
  },
  {
    id: "m5",
    year: "2025+",
    title: "Vanguard Professional",
    subtitle: "Junior Solutions Developer - Capytech",
    description: "Stepped into professional service as a solutions developer, managing secure server environments and custom plugin designs.",
    xpReward: 600,
    category: "Level Up",
    details: [
      "Maintained WordPress websites and Learning Management Systems (LMS) servers",
      "Developed client-specific custom plugins and system optimizations",
      "Administered cloud infrastructures across AWS and Hetzner hosting servers"
    ],
    icon: "Zap"
  }
];

export const initialSkills: SkillNode[] = [
  // --- FRONT-END DEVELOPMENT ---
  {
    id: "s_html",
    name: "Pure HTML",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Semantic web structuring and compliant browser rendering configurations.",
    icon: "FileCode",
    stats: ["Standard HTML5", "W3C Compliance", "Semantic DOM layouts"],
    unlocked: true
  },
  {
    id: "s_css",
    name: "CSS",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Sophisticated document styling, responsive layouts, grid systems, flexbox alignment, and animation transitions.",
    icon: "Sparkles",
    parentIds: ["s_html"],
    stats: ["Advanced flexbox & grid", "Media Queries", "Keyframe animations"],
    unlocked: true
  },
  {
    id: "s_tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Highly rapid visual styling with utility-first frameworks, custom utility configurations, and component compilation.",
    icon: "Sparkles",
    parentIds: ["s_css"],
    stats: ["Utility-first paradigm", "Custom design tokens", "+40% Prototyping speed"],
    unlocked: true
  },
  {
    id: "s_bootstrap",
    name: "Bootstrap",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Creating rapid layouts, template grids, and robust legacy layouts using component framework classes.",
    icon: "FileCode",
    parentIds: ["s_css"],
    stats: ["Grid templates", "+30% Prototyping velocity", "Responsive columns"],
    unlocked: true
  },
  {
    id: "s_react",
    name: "React JS",
    category: "frontend",
    level: 1,
    maxLevel: 5,
    cost: 150,
    description: "Declarative UI engineering, functional state hooks, parent-child flows, and virtual DOM reconciliation.",
    icon: "Cpu",
    parentIds: ["s_html"],
    stats: ["Functional Hooks State", "Dynamic state flows", "+30% Reusability"],
    unlocked: true
  },
  {
    id: "s_typescript",
    name: "TypeScript",
    category: "frontend",
    level: 1,
    maxLevel: 5,
    cost: 150,
    description: "Strongly typed application security, interfaces, compile-time validation, and code autocompletion.",
    icon: "Shield",
    parentIds: ["s_react"],
    stats: ["Strict type declarations", "Zero compile-time bugs", "Intelligent autocompletion"],
    unlocked: true
  },
  {
    id: "s_vue",
    name: "Vue JS",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 150,
    description: "Developing responsive single-page visual layers and progressive modules utilizing the Composition API.",
    icon: "Box",
    parentIds: ["s_react"],
    stats: ["Composition API", "Directives & reactivity", "Lightweight components"],
    unlocked: true
  },
  {
    id: "s_angular",
    name: "Angular",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 150,
    description: "Developing scalable enterprise-grade single-page applications utilizing robust modular component systems.",
    icon: "Cpu",
    parentIds: ["s_typescript"],
    stats: ["Angular CLI & Modules", "RxJS Reactive Programming", "Dependency Injection"],
    unlocked: true
  },
  {
    id: "s_react_native",
    name: "React Native",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 180,
    description: "Architecting cross-platform native iOS and Android experiences using standard React methodologies.",
    icon: "Smartphone",
    parentIds: ["s_react"],
    stats: ["Cross-platform pipelines", "Native UI performance", "Unified JS architecture"],
    unlocked: true
  },
  {
    id: "s_web_design",
    name: "Web Designing (Figma, Adobe XD)",
    category: "frontend",
    level: 1,
    maxLevel: 3,
    cost: 120,
    description: "Drafting layout blueprints, custom UI components, mockups, vector artwork, and pixel-perfect design assets.",
    icon: "PenTool",
    stats: ["Figma UI Design", "Adobe XD layouts", "Design systems setup"],
    unlocked: true
  },

  // --- BACK-END DEVELOPMENT ---
  {
    id: "s_js",
    name: "JavaScript",
    category: "backend",
    level: 1,
    maxLevel: 5,
    cost: 100,
    description: "Universal asynchronous server and scripting logic, powering modern backend runtimes like Node.js.",
    icon: "Terminal",
    stats: ["Asynchronous Event Loop", "ES6+ Standards", "Backend script logic"],
    unlocked: true
  },
  {
    id: "s_php",
    name: "PHP",
    category: "backend",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Solid foundational server scripting, forms processing, native sessions, and relational database connections.",
    icon: "Terminal",
    stats: ["Server OOP logic", "Data processing workflows", "+25% Execution speed"],
    unlocked: true
  },
  {
    id: "s_laravel",
    name: "PHP Laravel",
    category: "backend",
    level: 1,
    maxLevel: 5,
    cost: 150,
    description: "MVC software engineering, secure Eloquent ORM queries, administrative controllers, and robust security middleware.",
    icon: "Network",
    parentIds: ["s_php"],
    stats: ["Eloquent Relations", "Secure router pipelines", "Database Migrations"],
    unlocked: true
  },
  {
    id: "s_nextjs",
    name: "Next.js",
    category: "backend",
    level: 1,
    maxLevel: 4,
    cost: 150,
    description: "Constructing fast server-rendered React pipelines, static generation, server-side APIs, and file routing routes.",
    icon: "Cpu",
    parentIds: ["s_js"],
    stats: ["Server-Side Rendering (SSR)", "Full-stack hybrid routers", "Optimized Web Vitals"],
    unlocked: true
  },
  {
    id: "s_express",
    name: "Express",
    category: "backend",
    level: 1,
    maxLevel: 4,
    cost: 120,
    description: "Minimalist, highly flexible web application framework for Node.js backend servers and RESTful APIs.",
    icon: "Network",
    parentIds: ["s_js"],
    stats: ["REST API Endpoints", "Middleware pipelines", "Router architecture"],
    unlocked: true
  },
  {
    id: "s_python",
    name: "Python",
    category: "backend",
    level: 1,
    maxLevel: 4,
    cost: 120,
    description: "Versatile scripting, structural logic, server administration, automated data scraping, and API integrations.",
    icon: "Terminal",
    stats: ["Versatile scripting", "Structural Logic", "System automation"],
    unlocked: true
  },
  {
    id: "s_django",
    name: "Django",
    category: "backend",
    level: 1,
    maxLevel: 4,
    cost: 150,
    description: "Deploying Pythonic server architectures, built-in administrative dashboard panels, and secure user models.",
    icon: "Shield",
    parentIds: ["s_python"],
    stats: ["Pythonic backend flow", "Admin panel automation", "High-security default bindings"],
    unlocked: true
  },
  {
    id: "s_sql",
    name: "SQL",
    category: "backend",
    level: 1,
    maxLevel: 4,
    cost: 100,
    description: "Formulating relational queries, table joins, transactions, aggregations, and performance-tuned indexing.",
    icon: "Database",
    stats: ["Structured query optimization", "+50% Query efficiency", "Complex joins mapping"],
    unlocked: true
  },
  {
    id: "s_mysql",
    name: "MySQL",
    category: "backend",
    level: 1,
    maxLevel: 4,
    cost: 120,
    description: "Designing, administering, and optimization-indexing relational database schemas and tables.",
    icon: "Database",
    parentIds: ["s_sql"],
    stats: ["Relational normalized schemas", "Transaction durability", "Indexed speed queries"],
    unlocked: true
  },
  {
    id: "s_supabase",
    name: "Supabase",
    category: "backend",
    level: 1,
    maxLevel: 3,
    cost: 150,
    description: "Relational cloud storage integration with secure database auth triggers, bucket storage, and real-time database feeds.",
    icon: "Cloud",
    parentIds: ["s_sql"],
    stats: ["Postgres cloud servers", "Instant secure API endpoints", "Row Level Security (RLS)"],
    unlocked: true
  },
  {
    id: "s_cpp",
    name: "C++",
    category: "backend",
    level: 1,
    maxLevel: 3,
    cost: 150,
    description: "High-performance systems programming, structural memory management, and algorithmic optimizations.",
    icon: "Cpu",
    stats: ["STL Libraries", "Manual Memory Allocation", "Object-Oriented Architecture"],
    unlocked: true
  },

  // --- API INTEGRATION ---
  {
    id: "s_google_api",
    name: "Google API",
    category: "special",
    level: 1,
    maxLevel: 3,
    cost: 120,
    description: "Embedding geographic GIS systems, coordinate calculations, and administrative boundaries for agricultural Agri-Map grids.",
    icon: "Globe",
    stats: ["GIS coordinate systems", "Interactive vector pins", "Custom zone overlays"],
    unlocked: true
  },
  {
    id: "s_gemini_api",
    name: "Gemini API",
    category: "special",
    level: 1,
    maxLevel: 3,
    cost: 120,
    description: "Deploying Google's native Gemini models server-side for advanced multimodal text-and-vision context analysis.",
    icon: "Zap",
    stats: ["Multimodal prompt pipelines", "Low-latency context windows", "Efficient AI logic setups"],
    unlocked: true
  },
  {
    id: "s_chatgpt_api",
    name: "ChatGPT API",
    category: "special",
    level: 1,
    maxLevel: 3,
    cost: 120,
    description: "Integrating intelligent LLM model chains to automate reports, structured JSON schemas, and process user prompts.",
    icon: "Flame",
    parentIds: ["s_gemini_api"],
    stats: ["Advanced model chains", "Structured JSON interfaces", "Automated system text analysis"],
    unlocked: true
  },
  {
    id: "s_zoom_api",
    name: "Zoom API",
    category: "special",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Embedding real-time video meetings, webinars, and scheduling workflows using the Zoom API.",
    icon: "Smartphone",
    parentIds: ["s_google_api"],
    stats: ["Zoom Web SDK", "Meeting JWT/OAuth Auth", "Webhook Event Listeners"],
    unlocked: true
  },

  // --- SERVER ---
  {
    id: "s_aws",
    name: "AWS",
    category: "tools",
    level: 1,
    maxLevel: 3,
    cost: 150,
    description: "Administering server hosting, storage buckets, network security layers, and cloud infrastructure setups.",
    icon: "Cloud",
    stats: ["AWS Cloud console control", "S3 file storage pipelines", "+99.9% App Uptime Stability"],
    unlocked: true
  },
  {
    id: "s_hetzner",
    name: "Hetzner",
    category: "tools",
    level: 1,
    maxLevel: 3,
    cost: 120,
    description: "Deploying VPS servers, setting up LMS configurations, deploying custom plugins, and direct cloud setups.",
    icon: "Terminal",
    stats: ["VPS server optimization", "Secure SSH deployment", "Optimal budget-to-resource tuning"],
    unlocked: true
  },
  {
    id: "s_git",
    name: "Git Version Control",
    category: "tools",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Managing source integrity, coordinating team commits, and organizing release branching structures.",
    icon: "GitBranch",
    stats: ["Branching timelines", "-50% Integration Conflicts", "Secure upstream code syncing"],
    unlocked: true
  },

  // --- COMMUNICATION SKILLS ---
  {
    id: "s_comms_tech_writing",
    name: "Technical Documentation",
    category: "comms",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Formulating crisp developer blueprints, system workflows, and markdown specifications to ensure project clarity.",
    icon: "PenTool",
    stats: ["+30% Documentation Precision", "Structured code annotations", "Clear specifications blueprints"],
    unlocked: true
  },
  {
    id: "s_comms_client",
    name: "Client Collaboration",
    category: "comms",
    level: 0,
    maxLevel: 3,
    cost: 120,
    description: "Interfacing directly with clients, demonstrating milestone progress, gathering user feedback loops, and aligning requirements.",
    icon: "Users",
    parentIds: ["s_comms_tech_writing"],
    stats: ["+25% Requirements Accuracy", "Iterative feedback alignment", "Seamless client delivery"],
    unlocked: false
  },
  {
    id: "s_comms_community",
    name: "GDSC & Developer Networking",
    category: "comms",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Engaging in local developer circles and workshops, collaborating on tech stack integrations as an active GDSC member.",
    icon: "MessageSquare",
    stats: ["+40% Collaborative Synergy", "DevFest event collaborations", "Peer-to-peer technical mentorship"],
    unlocked: true
  },

  // --- LANGUAGES ---
  {
    id: "s_lang_english",
    name: "English Language",
    category: "language",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Command of high-fidelity technical, written, and spoken English for global engineering team alignment.",
    icon: "Languages",
    stats: ["Professional Working Fluency", "Global remote readiness", "Crisp technical presentation"],
    unlocked: true
  },
  {
    id: "s_lang_tagalog",
    name: "Tagalog & Filipino",
    category: "language",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Fluent verbal and written communication in Tagalog/Filipino, assisting in national developer community networking.",
    icon: "Globe",
    stats: ["Native / Bilingual Fluency", "National collaboration synergy", "Community facilitation"],
    unlocked: true
  },
  {
    id: "s_lang_chavacano",
    name: "Chavacano Dialect",
    category: "language",
    level: 1,
    maxLevel: 3,
    cost: 100,
    description: "Spanish-based Creole native to Zamboanga City, ideal for local client, government, and community relationships.",
    icon: "MessageSquare",
    stats: ["Native Fluency", "Local LGU engagement multiplier", "Zamboanga regional coordination"],
    unlocked: true
  }
];

export const projectWorlds: ProjectWorld[] = [
  {
    id: "p_synth",
    levelNum: 1,
    name: "Agri-Map GIS",
    subtitle: "Level 1: The Spatial Sector",
    tagline: "GIS-powered agricultural monitoring platform",
    description: "Centralized mapping application to log, trace, and manage spatial crop distributions and rice farming statistics across Zamboanga City.",
    contribution: "Constructed Google Maps integration layers, organized MySQL schemas, and designed rapid-query filtering panels.",
    techStack: ["Laravel", "JavaScript", "Google Maps API", "MySQL", "Tailwind CSS"],
    role: "Full-stack Developer",
    xpReward: 250,
    unlockedAtXp: 0,
    image: "/Webprojects/ZamboAgrimap.png",
    stats: [
      { label: "Map Service", value: "Google Maps API" },
      { label: "Update Speeds", value: "Real-time Queries" },
      { label: "Planners Guided", value: "Municipal LGU" }
    ],
    demoUrl: "https://agri-map-web-app.vercel.app/",
    githubUrl: "https://github.com/JuneReyOrias"
  },
  {
    id: "p_nexus",
    levelNum: 2,
    name: "Upress CMS",
    subtitle: "Level 2: The Publishing Deck",
    tagline: "Academic publishing content & procurement system",
    description: "Comprehensive SaaS management system organizing student subscriptions, print purchase scheduling, and book procurement pipelines for WMSU.",
    contribution: "Designed PHP Laravel relational controllers, optimized transaction tables, and built order scheduling calendars.",
    techStack: ["Laravel", "Bootstrap", "MySQL", "PHP"],
    role: "Full-stack Developer",
    xpReward: 400,
    unlockedAtXp: 300,
    image: "/Webprojects/wmsu-upress-project.png",
    stats: [
      { label: "Database Engine", value: "MySQL Relations" },
      { label: "Efficiency", value: "+45% Automation" },
      { label: "Sectors Covered", value: "UPRESS Department" }
    ],
    demoUrl: "https://upress-wmsu-system.vercel.app/",
    githubUrl: "https://github.com/JuneReyOrias"
  },
  {
    id: "p_aether",
    levelNum: 3,
    name: "Avelune V-RealEstate",
    subtitle: "Level 3: The Prime Asset Ledger",
    tagline: "High-fidelity financial real estate analytics command center",
    description: "Immersive architectural showcase combining deep prime asset evaluations with dual-axis interactive chart indices.",
    contribution: "Created responsive chart visualizers, formulated compound index parameters, and configured highly responsive Tailwind grids.",
    techStack: ["Vue.js 3", "Vite", "Tailwind CSS", "Chart.js"],
    role: "Lead Systems Architect",
    xpReward: 600,
    unlockedAtXp: 700,
    image: "/Webprojects/avelune-v-realestate-core.png",
    stats: [
      { label: "Frontend", value: "Vue 3 & Vite" },
      { label: "Graph Engine", value: "Chart.js Vector" },
      { label: "Visual Polish", value: "Hardware Accelerated" }
    ],
    demoUrl: "https://v-real-state.vercel.app/",
    githubUrl: "https://github.com/JuneReyOrias"
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: "ach_spawn",
    title: "Spawn Point Cleared",
    description: "Initiated your journey by stepping past the spawn point into the digital career world.",
    badgeIcon: "MapPin",
    criteria: "Start the journey from the Intro screen",
    isUnlocked: false
  },
  {
    id: "ach_skill_unlocked",
    title: "Skill Node Devoted",
    description: "Unlocked your first custom ability in the interactive career Skill Tree.",
    badgeIcon: "Sparkles",
    criteria: "Unlock any skill in the Skill Tree",
    isUnlocked: false
  },
  {
    id: "ach_skills_mastered",
    title: "Arch-Mage Developer",
    description: "Unlocked 5 or more distinct ability nodes across the frontend, backend, or cloud grids.",
    badgeIcon: "Award",
    criteria: "Have 5 skills unlocked concurrently",
    isUnlocked: false
  },
  {
    id: "ach_milestones",
    title: "Career Historian",
    description: "Scanned the full archives of my Origin Story timeline from Level 1 onwards.",
    badgeIcon: "BookOpen",
    criteria: "View the entire Origin Story timeline",
    isUnlocked: false
  },
  {
    id: "ach_worlds",
    title: "World Explorer",
    description: "Scouted and entered every single project world layout in Level 2.",
    badgeIcon: "Compass",
    criteria: "View all three project showcase worlds",
    isUnlocked: false
  },
  {
    id: "ach_contact",
    title: "Chronicle Transmission",
    description: "Sent a secure communication ping via the final portal terminal.",
    badgeIcon: "Send",
    criteria: "Transmit a message from the Contact Portal",
    isUnlocked: false
  }
];
