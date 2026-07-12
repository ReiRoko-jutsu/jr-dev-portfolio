import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sound } from "../utils/audio";
import { PlayerStats } from "../types";
import { 
  ExternalLink, Rocket, Hammer, X, Globe, Cpu, 
  ChevronRight, Maximize2, Layers, Monitor, Code2,
  Award, CheckCircle2, Search, Sliders, Terminal, 
  Play, Sparkles, Check, Copy, BookOpen, Heart, 
  Plus, ShoppingBag, Landmark, Database, ShieldCheck,
  Smartphone, FileText, ArrowRight, Briefcase
} from "lucide-react";

interface ProjectItem {
  id: number;
  section: "Foundation" | "Latest" | "Capytech" | "LocalLab";
  image: string;
  title: string;
  desc: string;
  role: string;
  tech: string[];
  link: string;
  accent: "blue" | "yellow" | "emerald";
}

interface SceneProjectsProps {
  stats: PlayerStats;
  onExploreProject: (id: string) => void;
  onClaimProjectXp: (id: string, xpReward: number) => void;
}

export default function SceneProjects({ stats, onExploreProject, onClaimProjectXp }: SceneProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalTab, setModalTab] = useState<"blueprint" | "simulator" | "diagnostics">("blueprint");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("ALL");

  // Retro Console Logs
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const projects: ProjectItem[] = [
    {
      id: 1,
      section: "Foundation",
      image: "/src/Webprojects/ZamboAgrimap.png",
      title: "Agri-Map GIS",
      desc: "A GIS-powered agricultural platform to manage and visualize rice farming data across Zamboanga City. It enables local government units to track crop distribution and yield in real-time.",
      role: "Full-stack Developer",
      tech: ["Laravel", "JS", "Google Maps API", "MySQL"],
      link: "https://agri-map-web-app.vercel.app/",
      accent: "blue"
    },
    {
      id: 2,
      section: "Foundation",
      image: "/src/Webprojects/wmsu-upress-project.png",
      title: "Upress CMS",
      desc: "Academic publishing Content Management System designed specifically for WMSU. Streamlines the workflow from manuscript submission to final printing and distribution.",
      role: "Full-stack Developer",
      tech: ["Laravel", "Bootstrap", "MySQL", "PHP"],
      link: "https://upress-wmsu-system.vercel.app/",
      accent: "blue"
    },
    {
      id: 3,
      section: "Foundation",
      image: "/src/Webprojects/simpleBanking.png",
      title: "Banking System",
      desc: "Secure transaction app developed during OJT experience. Features real-time balance updates, transaction history, and secure fund transfers between accounts.",
      role: "Full-stack Developer",
      tech: ["React", "Tailwind", "PHP", "Axios"],
      link: "https://simple-banking-sytem.vercel.app/",
      accent: "blue"
    },
    {
      id: 4,
      section: "Latest",
      image: "/src/Webprojects/Mi_Porfolios.png",
      title: "Mi Portfolios",
      desc: "A personal portfolio hub built with modern UI standards. Showcases a high-performance architectural approach to personal branding for developers.",
      role: "Full-stack Developer",
      tech: ["Tailwind", "Django", "Framer Motion"],
      link: "https://mi-porfolios.vercel.app/",
      accent: "yellow"
    },
    {
      id: 5,
      section: "Latest",
      image: "/src/Webprojects/FashionGyrl.png",
      title: "FashionGyrl Ecom",
      desc: "Luxury ecommerce experience featuring dynamic product management and responsive checkout system.",
      role: "Full-stack Developer",
      tech: ["React", "Vite", "Django"],
      link: "https://fashion-gyrl.vercel.app/",
      accent: "yellow"
    },
    {
      id: 6,
      section: "Latest",
      image: "/src/Webprojects/BayanihanUI.png",
      title: "BayanihanUI 2.0",
      desc: "Comprehensive SaaS component library built with React for the Filipino developer community.",
      role: "Full-stack Developer",
      tech: ["React", "Tailwind", "Vite"],
      link: "https://bayanihan-ui-2-0.vercel.app/category/saas",
      accent: "yellow"
    },
    {
      id: 7,
      section: "Latest",
      image: "/src/Webprojects/lifer_refuge.png",
      title: "Life & Refuge",
      desc: "A web app you can visit to find a verse that will provide you guidance and peace.",
      role: "Full-stack Developer",
      tech: ["React", "Tailwind", "Vite"],
      link: "https://light-refuge-app.vercel.app/",
      accent: "yellow"
    },
    {
      id: 8,
      section: "Latest",
      image: "/src/Webprojects/htmlversion.png",
      title: "BayanihanUI 1.0 html",
      desc: "A minimalist web app designed to help users discover verses that inspire guidance and calm. Built with simplicity in mind, it offers a smooth, distraction-free experience.",
      role: "Full-stack Developer",
      tech: ["Pure Html", "CSS"],
      link: "https://bayanihan-ui-html.vercel.app/",
      accent: "yellow"
    },
    {
      id: 9,
      section: "Latest",
      image: "/src/Webprojects/avelune-v-realestate-core.png",
      title: "Avelune V-RealEstate 1.0",
      desc: "The definitive digital command center for global property collectors. Fusing high-fidelity architectural showcases with a sovereign financial analytics engine, designed to manage ultra-prime portfolios with absolute precision and privacy.",
      role: "Lead Systems Architect",
      tech: ["Vue.js 3", "Vite", "Tailwind CSS", "Chart.js"],
      link: "https://v-real-state.vercel.app/",
      accent: "emerald"
    },
    {
      id: 10,
      section: "Capytech",
      image: "/src/Webprojects/course_reminder.png",
      title: "Course Reminder",
      desc: "A specialized Moodle plugin that sends automated reminder alerts and custom email triggers to students regarding upcoming coursework, learning milestones, and course expiration dates.",
      role: "Plugin Developer",
      tech: ["PHP", "Moodle API", "MySQL", "Javascript"],
      link: "https://capytech.com/",
      accent: "blue"
    },
    {
      id: 11,
      section: "Capytech",
      image: "/src/Webprojects/zoom_alarm.png",
      title: "Zoom Alarm Reminder",
      desc: "LMS schedule enrichment tool syncing Moodle courses with Zoom's live meeting APIs to broadcast attention-grabbing sound and visual alarm popups to online cohorts right before their class kicks off.",
      role: "Plugin Developer",
      tech: ["PHP", "Moodle API", "Zoom API", "JS"],
      link: "https://capytech.com/",
      accent: "blue"
    },
    {
      id: 12,
      section: "Capytech",
      image: "/src/Webprojects/scorm_extractor.png",
      title: "SCORM Extractor",
      desc: "Automatic archive decompression and cataloging utility that safely parses SCORM interactive e-learning zip packages into compliant, direct structural schemas in Moodle course modules.",
      role: "Systems Engineer",
      tech: ["PHP", "SCORM", "XML Parser", "NodeJS"],
      link: "https://capytech.com/",
      accent: "emerald"
    },
    {
      id: 13,
      section: "Capytech",
      image: "/src/Webprojects/learning_library.png",
      title: "Learning Library",
      desc: "A centralized, high-density repository index inside Moodle allowing academic instructors to catalog, share, and reuse training documents, PDFs, videos, and SCORM modules easily across school departments.",
      role: "Full-stack Developer",
      tech: ["PHP", "Laravel", "Moodle Core", "MySQL"],
      link: "https://capytech.com/",
      accent: "blue"
    },
    {
      id: 14,
      section: "Capytech",
      image: "/src/Webprojects/rate_instructor.png",
      title: "Rate Instructor Plugin",
      desc: "Micro-feedback rating instrument allowing student circles to evaluate lectures and leave swift, anonymous qualitative ratings right after finishing educational sessions.",
      role: "UI/UX & PHP Developer",
      tech: ["PHP", "Moodle API", "AJAX", "CSS3"],
      link: "https://capytech.com/",
      accent: "yellow"
    },
    {
      id: 15,
      section: "Capytech",
      image: "/src/Webprojects/zoom_loader.png",
      title: "Zoom Loader Core",
      desc: "High-capacity server interface designed to coordinate large synchronous web conferencing rooms, handling batch API loader tokens and mitigating platform throttling across thousands of active students.",
      role: "Backend Developer",
      tech: ["PHP", "Moodle API", "Zoom REST API", "Redis"],
      link: "https://capytech.com/",
      accent: "emerald"
    },
    {
      id: 16,
      section: "Capytech",
      image: "/src/Webprojects/dev_tools.png",
      title: "Dev Tools Config",
      desc: "Internal infrastructure automation blueprints containing standard Docker Compose stacks, lint rules, and shell setups to provision unified dev and staging environments for the LMS development group.",
      role: "DevOps Engineer",
      tech: ["Docker", "Git", "ESLint", "Bash"],
      link: "https://capytech.com/",
      accent: "emerald"
    },
    {
      id: 17,
      section: "Capytech",
      image: "/src/Webprojects/capytech_web.png",
      title: "Capytech Company Website",
      desc: "The primary marketing and client gateway for Capytech, crafted with high-performance responsive styling to showcase corporate e-learning and custom software solution tiers.",
      role: "Frontend Specialist",
      tech: ["HTML5", "Sass", "JS", "WordPress"],
      link: "https://capytech.com/",
      accent: "blue"
    },
    {
      id: 18,
      section: "Capytech",
      image: "/src/Webprojects/knowledge_base.png",
      title: "Capytech Knowledge Base",
      desc: "Internal team collaboration and wikified database platform designed to store proprietary plugin architectures, client-server deployment templates, and software security blueprints.",
      role: "Full-stack Developer",
      tech: ["Laravel", "Markdown Parser", "MySQL", "Tailwind"],
      link: "https://capytech.com/",
      accent: "blue"
    },
    {
      id: 19,
      section: "Capytech",
      image: "/src/Webprojects/js_resource.png",
      title: "Javascript Resource Dev",
      desc: "High-performance interactive HTML5 and canvas modules, micro-games, and animation templates created as standalone assets for embedded slide-based corporate compliance training.",
      role: "Frontend Game Developer",
      tech: ["Vanilla JS", "HTML5 Canvas", "CSS Animations"],
      link: "https://capytech.com/",
      accent: "yellow"
    },
    {
      id: 20,
      section: "Capytech",
      image: "/src/Webprojects/money_system.png",
      title: "Money System Gamification",
      desc: "Advanced training compliance incentive engine modeling virtual bank tokens and gamified reward systems within corporate learning paths to boost user training completion rates.",
      role: "Backend Systems Architect",
      tech: ["PHP", "Moodle API", "MySQL", "Tailwind CSS"],
      link: "https://capytech.com/",
      accent: "emerald"
    },
    {
      id: 21,
      section: "LocalLab",
      image: "/src/Webprojects/footprints.png",
      title: "Foot Prints Activity Tracker",
      desc: "An elegant activity and step-logging companion app designed to run entirely locally. Features simple browser state storage, step analysis graphs, and dynamic goal indicators.",
      role: "Independent Developer",
      tech: ["React", "Local Storage", "Vite", "Recharts"],
      link: "#local-footprints",
      accent: "yellow"
    },
    {
      id: 22,
      section: "LocalLab",
      image: "/src/Webprojects/periodtracker.png",
      title: "Sovereign Women's Period Tracker",
      desc: "A fully private, secure, and client-side menstrual calendar designed for women. Formulated with zero remote server tracking to protect critical health data, executing symptom recording and cycle forecasting entirely in offline browser state.",
      role: "Independent Developer",
      tech: ["React", "Tailwind CSS", "Vite", "Local Storage"],
      link: "#local-tracker",
      accent: "emerald"
    }
  ];

  // Get unique tech skills used across all projects for filtering
  const allTechList = ["ALL", "Laravel", "React", "Vue.js 3", "Django", "PHP", "Tailwind", "Moodle API", "Local Storage"];

  // Filter project items based on search query and selected technology
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTech = selectedTech === "ALL" || 
                        project.tech.some(t => t.toLowerCase().includes(selectedTech.toLowerCase()));

    return matchesSearch && matchesTech;
  });

  const handleOpenProject = (project: ProjectItem) => {
    sound.select();
    setSelectedProject(project);
    setModalTab("blueprint");
    onExploreProject(project.id.toString());
  };

  const handleClaimXp = (project: ProjectItem) => {
    onClaimProjectXp(project.id.toString(), 100);
  };

  const isClaimed = selectedProject ? stats.completedQuests.includes(`project_claim_${selectedProject.id}`) : false;

  // Initialize Diagnostic Logs when tab changes to diagnostics
  useEffect(() => {
    if (selectedProject && modalTab === "diagnostics") {
      setDiagnosticLogs([
        `[SYSTEM_KERN] SECURING CONNECTION FOR MODULE: ${selectedProject.title.toUpperCase()}`,
        `[PORT_BIND] BINDING COMPILER METRICS ON PORT ::3000`,
        `[HEAP_MEM] INITIALIZING MEMORY SECTOR COGNITION: OK (0.42ms)`,
        `[API_GATE] ESTABLISHING BACKEND TUNNEL GATEWAY... READY`,
        `[BUILD_V] ENGINE BASE ARCHITECTURE: ${selectedProject.role.toUpperCase()}`,
        `[STACK_V] FRAMEWORK SIGNATURES DETECTED: [${selectedProject.tech.join(", ")}]`,
        `[STANDBY] CHANNELS STABILIZED. PRESS 'RUN DIAGNOSTIC HEALTH CHECK' FOR OPTIMIZATION.`
      ]);
    }
  }, [selectedProject, modalTab]);

  const triggerDiagnosticScanner = () => {
    if (isDiagnosing || !selectedProject) return;
    sound.transmit();
    setIsDiagnosing(true);
    
    const logs = [
      `[DIAG_INIT] INITIATING COMPLETE HEALTH ANALYSIS...`,
      `[DIAG_SCAN] SCANNING DEPLOYMENT INTEGRITY FOR: ${selectedProject.link}`,
      `[INTEG_01] CHECKING MODULE CONTROLLERS... VERIFIED (24ms)`,
      `[INTEG_02] ANALYZING RECTIFYING INTERFACES... SECURE (12ms)`,
      `[DB_METR] RELATIONAL SCHEMAS DIAGNOSTIC CHECK: 100% HEALTH`,
      `[OPT_COMP] STRIPPING EXCESS STACKS... REMOVING REDUNDANT STYLES`,
      `[DIAG_DONE] SYSTEMS NOMINAL. COMPILE SPEED +18.4% OPTIMIZED.`
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setDiagnosticLogs(prev => [...prev, log]);
        sound.click();
        if (idx === logs.length - 1) {
          setIsDiagnosing(false);
          sound.achievement();
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div className="relative min-h-screen pt-28 pb-32 bg-slate-950 px-4 md:px-6 overflow-hidden font-sans" id="ProjectWeb">
      {/* Immersive Space Nebula Grid */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[160px] pointer-events-none" />

      {/* Cyber grid layout */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12 px-2">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-6"
          >
            <Layers size={12} className="text-cyan-500 animate-pulse" />
            <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">LEVEL 3: PORTFOLIO ARCHIVE</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none"
          >
           Build<span className="text-cyan-500">Folio.</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base font-medium italic leading-relaxed">
            A highly polished arcade-style showcase of custom web products, architectural setups, and software. Engage with simulators to claim massive XP levels.
          </p>
        </header>

        {/* --- INTERACTIVE CONTROLS HUD --- */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 mb-12 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive title or blueprint logs..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/60 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-200 outline-none transition-all font-mono placeholder:text-slate-600"
              />
            </div>

            {/* Tech filter dropdown pills */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-start md:justify-end">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider hidden lg:inline">Core Stack:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {allTechList.map(tech => (
                  <button
                    key={tech}
                    onClick={() => {
                      sound.click();
                      setSelectedTech(tech);
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-[10px] font-orbitron font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedTech === tech
                        ? "bg-cyan-950/40 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
                    }`}
                  >
                    {tech === "ALL" ? "Show All" : tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- GRID RENDERING SECTION --- */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/10 border border-slate-900/60 rounded-3xl">
            <Sliders className="w-12 h-12 text-slate-700 mx-auto mb-4 animate-bounce" />
            <h3 className="font-orbitron font-bold text-lg text-slate-400 uppercase">Archive Mismatch</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mt-2">
              No deployed projects matched your tech filter or query. Modify the command parameters to unlock systems.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Foundational Builds */}
            {filteredProjects.some(p => p.section === "Foundation") && (
              <div>
                <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
                  <Hammer className="text-cyan-500 animate-pulse" size={20} />
                  <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Foundational Platforms</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.filter(p => p.section === "Foundation").map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onOpen={handleOpenProject} 
                      isClaimed={stats.completedQuests.includes(`project_claim_${project.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Latest Deployments */}
            {filteredProjects.some(p => p.section === "Latest") && (
              <div>
                <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
                  <Rocket className="text-amber-500" size={20} />
                  <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Latest Sovereign Deployments</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.filter(p => p.section === "Latest").map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onOpen={handleOpenProject} 
                      isClaimed={stats.completedQuests.includes(`project_claim_${project.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Capytech Company Journey */}
            {filteredProjects.some(p => p.section === "Capytech") && (
              <div>
                <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
                  <Briefcase className="text-cyan-400 animate-pulse" size={20} />
                  <div>
                    <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Capytech Company Journey</h2>
                    <p className="text-[11px] font-mono text-cyan-400 uppercase mt-0.5">Corporate LMS & Custom Plugin Formulations</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.filter(p => p.section === "Capytech").map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onOpen={handleOpenProject} 
                      isClaimed={stats.completedQuests.includes(`project_claim_${project.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Local Lab Projects */}
            {filteredProjects.some(p => p.section === "LocalLab") && (
              <div>
                <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
                  <Cpu className="text-emerald-400" size={20} />
                  <div>
                    <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Local Lab Projects</h2>
                    <p className="text-[11px] font-mono text-emerald-400 uppercase mt-0.5">Sovereign, Client-Side Offline-First Tools</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.filter(p => p.section === "LocalLab").map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onOpen={handleOpenProject} 
                      isClaimed={stats.completedQuests.includes(`project_claim_${project.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- IMMERSIVE INTERACTIVE DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 md:p-6" key="project-modal">
            {/* Backdrop with Heavy Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                sound.click();
                setSelectedProject(null);
              }}
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(34,211,238,0.15)] max-h-[92vh]"
            >
              {/* Modal Top Toolbar */}
              <div className="p-4 md:p-5 border-b border-slate-800/80 flex flex-col sm:flex-row justify-between items-center bg-slate-900/50 backdrop-blur-md gap-4">
                <div className="flex items-center gap-3">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                   </div>
                   <h2 className="font-orbitron text-sm md:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
                     <span className="text-cyan-400">ENGINE_LOG_ID:</span> {selectedProject.title}
                   </h2>
                </div>

                {/* Switchable Modal Tabs */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      sound.click();
                      setModalTab("blueprint");
                    }}
                    className={`px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] tracking-wider uppercase transition-all cursor-pointer ${
                      modalTab === "blueprint"
                        ? "bg-slate-900 border border-slate-800 text-cyan-400"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Blueprint Specs
                  </button>
                  <button
                    onClick={() => {
                      sound.click();
                      setModalTab("simulator");
                    }}
                    className={`px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                      modalTab === "simulator"
                        ? "bg-cyan-950/50 border border-cyan-800 text-cyan-400 shadow-inner"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Sparkles size={11} className="text-amber-400" /> Active Simulator
                  </button>
                  <button
                    onClick={() => {
                      sound.click();
                      setModalTab("diagnostics");
                    }}
                    className={`px-3 py-1.5 rounded-lg font-orbitron font-bold text-[10px] tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                      modalTab === "diagnostics"
                        ? "bg-slate-900 border border-slate-800 text-emerald-400"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Terminal size={11} /> System Logs
                  </button>
                </div>

                <button 
                  onClick={() => {
                    sound.click();
                    setSelectedProject(null);
                  }}
                  className="absolute right-4 top-4 sm:relative sm:right-auto sm:top-auto p-2 bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400 rounded-xl transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content wrapper */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 bg-slate-950">
                <AnimatePresence mode="wait">
                  {/* TAB 1: BLUEPRINT SPECTACULAR SHOWCASE */}
                  {modalTab === "blueprint" && (
                    <motion.div
                      key="blueprint-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                    >
                      {/* Left: Beautiful Mockup Window */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative group">
                          {/* Top web bar mockup */}
                          <div className="bg-slate-950 px-4 py-2 flex items-center gap-2 border-b border-slate-900">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 rounded-full bg-slate-800" />
                              <div className="w-2 h-2 rounded-full bg-slate-800" />
                              <div className="w-2 h-2 rounded-full bg-slate-800" />
                            </div>
                            <span className="font-mono text-[9px] text-slate-600 truncate">{selectedProject.link}</span>
                          </div>
                          
                          <div className="relative overflow-hidden aspect-video flex items-center justify-center bg-slate-950">
                            <img 
                              src={selectedProject.image} 
                              alt={selectedProject.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 p-3 bg-cyan-600/80 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 size={16} />
                            </div>
                          </div>
                        </div>

                        {/* Quick Specs bar */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-3 text-center">
                            <span className="font-mono text-[9px] text-slate-500 uppercase block">CORE INTEL</span>
                            <span className="font-orbitron font-bold text-xs text-slate-200">System Level 3</span>
                          </div>
                          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-3 text-center">
                            <span className="font-mono text-[9px] text-slate-500 uppercase block">LATENCY STATUS</span>
                            <span className="font-orbitron font-bold text-xs text-emerald-400">NOMINAL</span>
                          </div>
                          <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-3 text-center">
                            <span className="font-mono text-[9px] text-slate-500 uppercase block">HOST INGRESS</span>
                            <span className="font-orbitron font-bold text-xs text-cyan-400">VERCEL SECURE</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical Stats & Action panel */}
                      <div className="lg:col-span-5 space-y-6">
                        <div className="space-y-2">
                          <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest block font-bold">PROJECT DESCRIPTION</span>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-sans font-medium">
                            {selectedProject.desc}
                          </p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-slate-900">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">ENGINEERING ROLE</span>
                              <span className="font-orbitron text-xs font-black text-white uppercase">{selectedProject.role}</span>
                            </div>
                            <div>
                              <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">WORLD STACK</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedProject.tech.map(t => (
                                  <span key={t} className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] font-mono text-slate-400">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Launch Actions and XP Claims */}
                        <div className="pt-6 border-t border-slate-900 space-y-3">
                          {isClaimed ? (
                            <div className="w-full py-3.5 bg-emerald-950/20 border border-emerald-800/40 text-emerald-400 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                              <CheckCircle2 size={15} /> Blueprint Secured (+100 XP Claimed)
                            </div>
                          ) : (
                            <button
                              onClick={() => handleClaimXp(selectedProject)}
                              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer active:scale-95"
                            >
                              <Award size={15} /> Secure Blueprint Claim (+100 XP)
                            </button>
                          )}

                          <a 
                            href={selectedProject.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={() => sound.click()}
                            className="w-full py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl cursor-pointer active:scale-95"
                          >
                            <Globe size={16} className="text-cyan-400" /> Launch Global Engine External
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: INTERACTIVE CORE PLAYGROUND SIMULATORS */}
                  {modalTab === "simulator" && (
                    <motion.div
                      key="simulator-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6"
                    >
                      {/* SIMULATOR SELECTOR BY PROJECT ID */}
                      {selectedProject.id === 1 && <AgriMapSimulator />}
                      {selectedProject.id === 2 && <UpressSimulator />}
                      {selectedProject.id === 3 && <BankingSimulator />}
                      {selectedProject.id === 4 && <PortfolioThemeSimulator />}
                      {selectedProject.id === 5 && <FashionEcomSimulator />}
                      {selectedProject.id === 6 && <BayanihanUiSimulator version="2.0" />}
                      {selectedProject.id === 7 && <LifeRefugeSimulator />}
                      {selectedProject.id === 8 && <BayanihanUiSimulator version="1.0" />}
                      {selectedProject.id === 9 && <RealEstateSovereignSimulator />}
                      {selectedProject.id >= 10 && selectedProject.id <= 20 && <CapytechPluginSimulator title={selectedProject.title} />}
                      {selectedProject.id === 21 && <FootprintsSimulator />}
                      {selectedProject.id === 22 && <PeriodTrackerSimulator />}
                    </motion.div>
                  )}

                  {/* TAB 3: RETRO SYSTEMS DIAGNOSTICS LOGS */}
                  {modalTab === "diagnostics" && (
                    <motion.div
                      key="diagnostics-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 font-mono text-[11px] text-emerald-400 min-h-[250px] max-h-[350px] overflow-y-auto space-y-2.5 shadow-inner">
                        {diagnosticLogs.map((log, index) => (
                          <div key={index} className="leading-relaxed whitespace-pre-line border-b border-slate-900 pb-1 flex items-start gap-1">
                            <span className="text-slate-600 select-none">&gt;</span>
                            <span>{log}</span>
                          </div>
                        ))}
                        {isDiagnosing && (
                          <div className="text-amber-500 animate-pulse flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                            <span>PROCESSING COGNITIVE STREAM LOGS...</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <p className="text-[11px] text-slate-400 font-sans">
                          Runs standard code compression and integrity scans to confirm compilation state on port 3000.
                        </p>
                        <button
                          onClick={triggerDiagnosticScanner}
                          disabled={isDiagnosing}
                          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <Terminal size={14} /> Run Diagnostic Health Check
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// --- REUSABLE PORTFOLIO CARD COMPONENT ---
// ==========================================
function ProjectCard({ project, onOpen, isClaimed }: { project: ProjectItem; onOpen: (p: ProjectItem) => void; isClaimed: boolean; key?: React.Key }) {
  const [isHovered, setIsHovered] = useState(false);

  const borderStyle = project.accent === "emerald" 
    ? "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
    : project.accent === "yellow" 
    ? "hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]" 
    : "hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]";

  const btnBg = project.accent === "emerald"
    ? "bg-emerald-600 hover:bg-emerald-500"
    : project.accent === "yellow"
    ? "bg-amber-500 hover:bg-amber-400 text-slate-950"
    : "bg-cyan-600 hover:bg-cyan-500";

  const accentText = project.accent === "emerald"
    ? "text-emerald-400"
    : project.accent === "yellow"
    ? "text-amber-400"
    : "text-cyan-400";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-[2rem] bg-slate-900 border border-slate-800/80 overflow-hidden shadow-2xl cursor-pointer ${borderStyle} transition-all duration-300 flex flex-col h-[400px]`}
    >
      {/* Context-Aware Dynamic Tooltip Overlay on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-slate-950/98 z-30 p-6 flex flex-col justify-between border border-cyan-500/40 rounded-[2rem] backdrop-blur-md overflow-hidden select-none"
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900/60 pb-2">
                <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest">[PROJECT COGNITION DATA]</span>
                <span className="font-mono text-[8px] text-slate-500 font-bold uppercase">SEC: {project.section}</span>
              </div>

              <div>
                <h4 className="font-orbitron text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Developer Role</h4>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold">
                  <Briefcase size={10} className="text-cyan-400 animate-pulse" />
                  {project.role}
                </div>
              </div>

              <div>
                <h4 className="font-orbitron text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Technology Stack</h4>
                <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto no-scrollbar">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-slate-900 border border-slate-850 rounded font-mono text-[9px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-orbitron text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Objective Summary</h4>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed italic line-clamp-3">
                  {project.desc}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[9px] font-mono">
              <span className="text-slate-500">SYSTEM RESPONSE: ACTIVE</span>
              <span className="text-cyan-400 animate-pulse font-bold uppercase tracking-wider flex items-center gap-1">
                LAUNCH SIMULATOR <ArrowRight size={10} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic claim notification label on top-right */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        {!isClaimed && (
          <span className="bg-amber-500 text-slate-950 font-orbitron font-black text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-full animate-pulse shadow-md">
            🎁 UNSECURED: +100 XP
          </span>
        )}
        {isClaimed && (
          <span className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-orbitron font-black text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
            ✓ SECURED
          </span>
        )}
      </div>

      <div className="relative h-56 overflow-hidden bg-slate-950 flex items-center justify-center">
        <img 
          src={project.image} 
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-orbitron font-black ${accentText} tracking-[0.2em] uppercase`}>
              {project.section === "Foundation" ? "FOUNDATION_SERIES" : project.section === "Capytech" ? "CAPYTECH_JOURNEY" : project.section === "LocalLab" ? "LOCAL_LABS" : "LATEST_RELEASE"}
            </span>
          </div>
          <h3 className="font-orbitron text-xl font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs font-sans font-medium line-clamp-2">
            {project.desc}
          </p>
        </div>

        {/* Bottom stats layout */}
        <div className="mt-5 pt-4 border-t border-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-hidden">
            {project.tech.slice(0, 3).map(tech => (
              <span key={tech} className="px-2 py-1 bg-slate-950 border border-slate-900 rounded-md text-[9px] font-mono text-slate-500 truncate max-w-[80px]">
                {tech}
              </span>
            ))}
          </div>
          <div className={`w-8 h-8 rounded-xl ${btnBg} flex items-center justify-center text-slate-950 shrink-0 scale-90 group-hover:scale-100 transition-transform duration-300 shadow-md`}>
            <ChevronRight size={18} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


// ==============================================================
//   1. AGRI-MAP GIS SIMULATOR (id: 1)
// ==============================================================
function AgriMapSimulator() {
  const [district, setDistrict] = useState("Vitali District");
  const [irrigation, setIrrigation] = useState(65);
  const [crop, setCrop] = useState("Rice Crops");

  // Dynamic calculations
  const yieldModifier = crop === "Rice Crops" ? 1.4 : crop === "Corn Crops" ? 1.1 : 0.8;
  const projectedYield = Math.round((irrigation * 12.5) * yieldModifier);
  const precisionIndex = Math.min(100, Math.round(irrigation * 1.1 + 10));

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Database className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Agri-Map GIS Engine Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-[9px] text-slate-400 uppercase font-bold">WMSU DISTRICT SECTOR:</label>
            <select 
              value={district}
              onChange={(e) => { sound.click(); setDistrict(e.target.value); }}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg p-2.5 font-mono text-xs text-slate-300 outline-none"
            >
              <option value="Vitali District">Vitali Sector (Zone 1)</option>
              <option value="Curuan District">Curuan Sector (Zone 2)</option>
              <option value="Ayala District">Ayala Sector (Zone 3)</option>
              <option value="Labuan District">Labuan Sector (Zone 4)</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-400 uppercase">IRRIGATION LEVEL:</span>
              <span className="text-cyan-400">{irrigation}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={irrigation}
              onChange={(e) => { sound.click(); setIrrigation(Number(e.target.value)); }}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-slate-400 uppercase font-bold block">ACTIVE SEED VARIETY:</span>
            <div className="grid grid-cols-3 gap-2">
              {["Rice Crops", "Corn Crops", "Vegetables"].map(c => (
                <button
                  key={c}
                  onClick={() => { sound.click(); setCrop(c); }}
                  className={`py-2 px-2.5 rounded-lg border font-mono text-[10px] tracking-tight uppercase transition-all ${
                    crop === c 
                      ? "bg-cyan-950/30 border-cyan-400 text-cyan-400" 
                      : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {c.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live crop Grid & Map render */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] text-slate-500 uppercase">GIS Sensor Map (Grid Sector)</span>
              <span className="font-mono text-[10px] text-cyan-500 font-bold">{district.toUpperCase()}</span>
            </div>

            {/* 4x4 mock agricultural grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {Array.from({ length: 16 }).map((_, idx) => {
                const isActive = (idx * 6) < irrigation;
                return (
                  <div 
                    key={idx}
                    className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-300 relative ${
                      isActive 
                        ? "bg-cyan-950/20 border-cyan-500/40 text-cyan-400 shadow-md shadow-cyan-500/5 scale-102"
                        : "bg-slate-900/40 border-slate-950 text-slate-800"
                    }`}
                  >
                    <span className="text-xs">{isActive ? (crop === "Rice Crops" ? "🌾" : crop === "Corn Crops" ? "🌽" : "🥦") : "•"}</span>
                    {isActive && irrigation > 75 && (
                      <span className="absolute top-0.5 right-0.5 text-[8px] animate-pulse">💧</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics display */}
          <div className="grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-slate-900/60 font-mono">
            <div>
              <span className="text-[8px] text-slate-500 block uppercase">FORECASTED TONNAGE</span>
              <span className="text-sm font-bold text-slate-200">{projectedYield} METRIC TONS</span>
            </div>
            <div>
              <span className="text-[8px] text-slate-500 block uppercase">GIS MAPPING PRECISION</span>
              <span className="text-sm font-bold text-cyan-400">{precisionIndex}% SENSOR HEALTH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   2. WMSU UPRESS CMS SYSTEM SIMULATOR (id: 2)
// ==============================================================
function UpressSimulator() {
  const [title, setTitle] = useState("");
  const [discipline, setDiscipline] = useState("Engineering & Tech");
  const [statusStep, setStatusStep] = useState(0);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      sound.error();
      alert("Please provide a manuscript title to start publication flow!");
      return;
    }
    sound.transmit();
    setIsProcessing(true);
    setStatusStep(1);
    setPipelineLogs([`[INFO] Starting manuscript upload workflow...`]);

    const steps = [
      { step: 1, log: `[SYSTEM] Manuscript encrypted and assigned ID: WMSU-UPRESS-2026-${Math.floor(Math.random() * 9000 + 1000)}` },
      { step: 2, log: `[BOARD] Forwarded to WMSU Editorial Peer Review Panel (3 Members allocated).` },
      { step: 3, log: `[REVIEW] Editor reviews completed. Applied required APA grammar adjustments.` },
      { step: 4, log: `[PRINT] Formatted for U-Press physical copy. Generating 150 hardcovers.` },
      { step: 5, log: `[DONE] SUCCESS: Volume published and cataloged in the WMSU Archives database!` }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        sound.click();
        setStatusStep(s.step);
        setPipelineLogs(prev => [...prev, s.log]);
        if (s.step === 5) {
          setIsProcessing(false);
          sound.questComplete();
        }
      }, (idx + 1) * 800);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <FileText className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Academic Publishing CMS Simulator</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Input parameters */}
        <div className="md:col-span-5">
          <form onSubmit={handleStartPipeline} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-slate-400 uppercase font-bold block">MANUSCRIPT TITLE:</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Cognitive Mapping of Zamboanga Farming Systems"
                disabled={isProcessing}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg p-2.5 text-xs text-slate-300 outline-none placeholder:text-slate-700"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[9px] text-slate-400 uppercase font-bold block">ACADEMIC DEPARTMENT DISCIPLINE:</label>
              <select 
                value={discipline}
                onChange={(e) => { sound.click(); setDiscipline(e.target.value); }}
                disabled={isProcessing}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg p-2.5 font-mono text-xs text-slate-300 outline-none"
              >
                <option value="Engineering & Tech">College of Engineering (WMSU)</option>
                <option value="Agriculture & Forestry">College of Agriculture</option>
                <option value="Linguistics & Arts">College of Liberal Arts</option>
                <option value="Science & Mathematics">College of Science</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              Initiate Publishing Pipeline
            </button>
          </form>
        </div>

        {/* Stepper & Logs */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[9px] text-slate-500 uppercase">Publishing Progress Node</span>
              <span className="font-mono text-[9px] text-cyan-400 font-bold">{discipline.toUpperCase()}</span>
            </div>

            {/* Visual Steps Stepper */}
            <div className="flex items-center justify-between relative mb-5 pt-3 px-2">
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-900 -translate-y-1/2 z-0" />
              {[
                { label: "Draft", step: 1 },
                { label: "Review", step: 2 },
                { label: "Revise", step: 3 },
                { label: "Print", step: 4 },
                { label: "Publish", step: 5 }
              ].map(s => (
                <div key={s.step} className="relative z-10 flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ${
                    statusStep >= s.step 
                      ? "bg-cyan-950/80 border-cyan-400 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]" 
                      : "bg-slate-900 border-slate-950 text-slate-600"
                  }`}>
                    {statusStep > s.step ? "✓" : s.step}
                  </div>
                  <span className="font-mono text-[8px] text-slate-500 mt-1 uppercase">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Console logs */}
          <div className="bg-slate-900 border border-slate-950 p-3 rounded-lg font-mono text-[9px] text-slate-400 space-y-1 max-h-[100px] overflow-y-auto">
            {pipelineLogs.length === 0 ? (
              <span className="text-slate-600 font-mono italic">Pipeline logs standby... Input manuscript info above.</span>
            ) : (
              pipelineLogs.map((log, index) => (
                <div key={index} className="truncate">
                  <span className="text-cyan-600 mr-1">&gt;</span>{log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   3. SECURE SWIFT BANKING SYSTEM SIMULATOR (id: 3)
// ==============================================================
function BankingSimulator() {
  const [balance, setBalance] = useState(12450.00);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [bankLogs, setBankLogs] = useState<string[]>([]);

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amtNum = parseFloat(amount);
    if (!recipient || isNaN(amtNum) || amtNum <= 0) {
      sound.error();
      alert("Please provide valid recipient account and positive transaction amount.");
      return;
    }
    if (amtNum > balance) {
      sound.error();
      alert("Transaction Declined: Insufficient secure funds in your ledger wallet!");
      return;
    }

    sound.transmit();
    setIsTransferring(true);
    setBankLogs([`[SECURE_TUNNEL] ACTIVE SHA-256 WIRE TUNNEL`]);

    const stepLogs = [
      `[CARD_VER] VERIFYING RECIPIENT NODE IN CENTRAL DEPOSITORY... OK`,
      `[COMP_SEC] ESTABLISHING ISO-20022 SWIFT HANDSHAKE INTEGRITY`,
      `[LEDGER] UPDATING TRANSACTION BALANCE BLOCK LEDGER...`,
      `[TX_SUCC] WIRE COMPLETE. DEBITED: $${amtNum.toFixed(2)} SENT TO ${recipient.toUpperCase()}`
    ];

    stepLogs.forEach((l, index) => {
      setTimeout(() => {
        sound.click();
        setBankLogs(prev => [...prev, l]);
        if (index === stepLogs.length - 1) {
          setBalance(prev => prev - amtNum);
          setAmount("");
          setIsTransferring(false);
          sound.achievement();
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Landmark className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">ISO-20022 Banking Transaction Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Inputs */}
        <div className="md:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-850 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="font-mono text-[8px] text-slate-500 block uppercase font-bold">LEDGER BALANCE VALUE</span>
              <span className="font-orbitron text-2xl font-black text-cyan-400">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>

            <form onSubmit={handleTransfer} className="space-y-3.5">
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-400 uppercase font-bold block">RECIPIENT NODE NAME:</label>
                <input 
                  type="text" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. June Rey Orias"
                  disabled={isTransferring}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-lg p-2.5 text-xs text-slate-300 outline-none placeholder:text-slate-700"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] text-slate-400 uppercase font-bold block">WIRE AMOUNT (USD):</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 1500"
                  disabled={isTransferring}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded-lg p-2.5 text-xs text-slate-300 outline-none placeholder:text-slate-700"
                />
              </div>

              <button
                type="submit"
                disabled={isTransferring}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-500/10"
              >
                Initiate SWIFT Transaction
              </button>
            </form>
          </div>
        </div>

        {/* Ledger logs outputs */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between min-h-[200px]">
          <div>
            <span className="font-mono text-[9px] text-slate-500 uppercase block mb-3">Cryptographic Ledgers Verification</span>
            
            <div className="space-y-2 font-mono text-[10px] text-slate-300">
              {bankLogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-600 text-center">
                  <ShieldCheck className="w-8 h-8 opacity-20 mb-2" />
                  <p className="text-[10px]">Vault stand-by. All transactions verified via private node ledgers.</p>
                </div>
              ) : (
                bankLogs.map((l, index) => (
                  <div key={index} className="flex items-start gap-1">
                    <span className="text-emerald-500">✓</span>
                    <span>{l}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900/60 p-2.5 rounded border border-slate-900 font-mono text-[8px] text-slate-500">
            SECURE ROUTING STATUS: OK • ISO-20022 PACKET PROTOCOL 2.01 • PORT: 3000
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   4. MI PORTFOLIOS ARCHITECTURAL THEME SIMULATOR (id: 4)
// ==============================================================
function PortfolioThemeSimulator() {
  const [selectedTheme, setSelectedTheme] = useState("slate");

  const themes = [
    { id: "slate", label: "Cosmic Slate", bg: "bg-slate-950 border-slate-800 text-slate-100", highlight: "bg-cyan-500/10 border-cyan-400 text-cyan-400" },
    { id: "emerald", label: "Emerald Citadel", bg: "bg-stone-950 border-emerald-900 text-emerald-100", highlight: "bg-emerald-950/40 border-emerald-500 text-emerald-400" },
    { id: "flame", label: "Fusion Flame", bg: "bg-zinc-950 border-orange-950 text-orange-100", highlight: "bg-orange-950/30 border-orange-500 text-orange-400" }
  ];

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Sparkles className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Interactive Theme System Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Controls */}
        <div className="md:col-span-4 space-y-3 flex flex-col justify-center">
          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest block font-bold">Select Active Presets:</span>
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => { sound.select(); setSelectedTheme(t.id); }}
              className={`w-full py-3 px-4 border rounded-xl font-orbitron font-bold text-[11px] uppercase tracking-wide transition-all cursor-pointer text-left ${
                selectedTheme === t.id 
                  ? "bg-cyan-950/20 border-cyan-400 text-cyan-400 shadow-md" 
                  : "bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Live miniature visual portfolio page */}
        <div className="md:col-span-8 bg-slate-950 border border-slate-850 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          {/* Card wrapper representing miniature page styled by selected theme */}
          <div className={`w-full max-w-sm rounded-xl border p-5 transition-all duration-500 ${currentTheme.bg}`}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[8px] text-slate-500">JUNE_FOLIO_CORE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <h4 className="font-orbitron font-black text-sm uppercase leading-tight">SOLUTIONS DEVELOPER</h4>
            <p className="font-sans text-[10px] text-slate-400 mt-1 leading-normal">
              High performance custom web ecosystems crafted with absolute code integrity and precision.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between gap-2">
              <span className={`px-2.5 py-1 rounded border text-[8px] font-mono transition-all ${currentTheme.highlight}`}>
                EXPLORE PROJECTS
              </span>
              <span className="px-2 py-1 bg-slate-900 text-slate-500 text-[8px] font-mono rounded">
                CONTACT PORTAL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   5. LUXURY FASHIONGYRL ECOM SYSTEM SIMULATOR (id: 5)
// ==============================================================
interface CartItem {
  id: number;
  name: string;
  price: number;
}

function FashionEcomSimulator() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const products = [
    { id: 1, name: "Celestial Silk Veil", price: 220.00, img: "👗" },
    { id: 2, name: "Nova Silk Trenchcoat", price: 450.00, img: "🧥" },
    { id: 3, name: "Gravity Leather Boots", price: 180.00, img: "🥾" }
  ];

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const handleAddToCart = (p: typeof products[0]) => {
    sound.click();
    setCart(prev => [...prev, { id: Date.now(), name: p.name, price: p.price }]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      sound.error();
      return;
    }
    sound.questComplete();
    alert("Checkout Simulated Successfully! Luxury payment ledger authorized and cart flushed.");
    setCart([]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <ShoppingBag className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Luxury Ecom Cart Core Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Product Catalog list */}
        <div className="md:col-span-6 space-y-2.5">
          <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">Luxury Apparel Catalog:</span>
          {products.map(p => (
            <div 
              key={p.id}
              className="flex items-center justify-between bg-slate-950 border border-slate-850 p-3 rounded-xl transition-all hover:border-slate-800"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl bg-slate-900 w-10 h-10 flex items-center justify-center rounded-lg">{p.img}</span>
                <div>
                  <h4 className="font-orbitron text-[11px] font-bold text-slate-200 uppercase leading-none">{p.name}</h4>
                  <span className="font-mono text-[10px] text-cyan-400 mt-1 block">${p.price.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(p)}
                className="p-1.5 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 rounded-lg transition-all text-[10px] font-mono"
              >
                <Plus size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Calculations */}
        <div className="md:col-span-6 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between min-h-[220px] font-mono text-xs">
          <div>
            <div className="flex justify-between items-center border-b border-slate-900 pb-2 mb-3">
              <span className="text-slate-500 uppercase text-[9px]">Luxury Shopping Bag</span>
              <span className="text-cyan-400 font-bold">{cart.length} Items</span>
            </div>

            {/* Scrollable products list */}
            <div className="space-y-1.5 max-h-[80px] overflow-y-auto mb-3">
              {cart.length === 0 ? (
                <span className="text-slate-600 italic block text-[10px] py-4 text-center">Your shopping bag is currently empty.</span>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between text-slate-400 text-[10px]">
                    <span className="truncate max-w-[150px]">{item.name}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-900 pt-3">
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>SUBTOTAL:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>VAT TAX (12%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-200 font-bold text-sm">
              <span>LEDGER TOTAL:</span>
              <span className="text-cyan-400">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-orbitron font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all mt-1 cursor-pointer"
            >
              Simulate Secure Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   6 & 8. BAYANIHANUI TAILWIND DESIGN SYSTEM SIMULATOR (id: 6 & 8)
// ==============================================================
function BayanihanUiSimulator({ version }: { version: "1.0" | "2.0" }) {
  const [rounded, setRounded] = useState("rounded-lg");
  const [glow, setGlow] = useState("shadow-none");
  const [color, setColor] = useState("cyan");
  const [btnText, setBtnText] = useState("Verify Component");

  // Get dynamic styles
  const colStyles = color === "cyan" 
    ? "bg-cyan-950/20 border-cyan-400/80 text-cyan-400" 
    : color === "emerald" 
    ? "bg-emerald-950/20 border-emerald-400/80 text-emerald-400" 
    : "bg-amber-950/20 border-amber-400/80 text-amber-400";

  const glowStyles = glow === "mega" 
    ? color === "cyan" ? "shadow-[0_0_20px_rgba(34,211,238,0.5)]" : color === "emerald" ? "shadow-[0_0_20px_rgba(16,185,129,0.5)]" : "shadow-[0_0_20px_rgba(245,158,11,0.5)]"
    : "shadow-none";

  // Generated code signature
  const compiledClasses = `className="px-6 py-3 border font-orbitron font-bold text-xs uppercase tracking-wider ${rounded} ${colStyles.replace(/bg-.*?\s/, "")} ${glowStyles}"`;

  const copyCode = () => {
    sound.achievement();
    navigator.clipboard.writeText(compiledClasses);
    alert("Tailwind CSS class string copied successfully! Use inside your design models.");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Code2 className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">BayanihanUI {version} Design Tokens Designer</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1">
            <label className="font-mono text-[9px] text-slate-400 uppercase font-bold block">BUTTON STRING VALUE:</label>
            <input 
              type="text" 
              value={btnText}
              onChange={(e) => setBtnText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 rounded-lg p-2 text-xs text-slate-300 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">ROUNDED BOUNDS:</span>
              <select 
                value={rounded}
                onChange={(e) => { sound.click(); setRounded(e.target.value); }}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg font-mono text-[10px] text-slate-300 outline-none"
              >
                <option value="rounded-none">Square (0px)</option>
                <option value="rounded-lg">Medium (8px)</option>
                <option value="rounded-full">Pill (999px)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">GLOW STYLING:</span>
              <select 
                value={glow}
                onChange={(e) => { sound.click(); setGlow(e.target.value); }}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg font-mono text-[10px] text-slate-300 outline-none"
              >
                <option value="none">No Glow</option>
                <option value="mega">Mega Neon Glow</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[9px] text-slate-500 block font-bold">ACCENT INTEL HUE:</span>
            <div className="grid grid-cols-3 gap-2">
              {["cyan", "emerald", "amber"].map(col => (
                <button
                  key={col}
                  onClick={() => { sound.click(); setColor(col); }}
                  className={`py-1.5 rounded-lg border font-mono text-[10px] uppercase transition-all ${
                    color === col 
                      ? "bg-slate-900 border-cyan-400 text-cyan-400" 
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time design rendering preview */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="font-mono text-[9px] text-slate-500 uppercase block mb-6">Component Render Simulator Canvas</span>
            
            <div className="flex justify-center items-center py-6">
              <button className={`px-6 py-3 border font-orbitron font-bold text-xs uppercase tracking-wider transition-all duration-300 ${rounded} ${colStyles} ${glowStyles}`}>
                {btnText}
              </button>
            </div>
          </div>

          {/* Copyable code box */}
          <div className="bg-slate-900 border border-slate-950 rounded-lg p-3 flex justify-between items-center gap-3">
            <code className="font-mono text-[9px] text-slate-400 truncate select-all">{compiledClasses}</code>
            <button
              onClick={copyCode}
              className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-cyan-400 rounded-lg transition-all shrink-0 cursor-pointer"
            >
              <Copy size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   7. LIFE & REFUGE BIBLE VERSE CALMING SIMULATOR (id: 7)
// ==============================================================
function LifeRefugeSimulator() {
  const verses = [
    { text: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you.", ref: "John 14:27" },
    { text: "For I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
    { text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures.", ref: "Psalm 23:1-2" },
    { text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you.", ref: "Deuteronomy 31:6" }
  ];

  const [activeVerse, setActiveVerse] = useState(verses[0]);
  const [triggerFlicker, setTriggerFlicker] = useState(true);

  const drawNewVerse = () => {
    sound.transmit();
    setTriggerFlicker(false);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * verses.length);
      setActiveVerse(verses[idx]);
      setTriggerFlicker(true);
      sound.achievement();
    }, 150);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <BookOpen className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Life & Refuge Calming Verse Selector</span>
      </div>

      <div className="flex flex-col items-center justify-center py-6 space-y-6">
        <AnimatePresence mode="wait">
          {triggerFlicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full max-w-xl bg-slate-950 border border-slate-850 p-6 rounded-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-2 left-2 text-2xl opacity-20 font-serif select-none text-cyan-400">“</div>
              <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed italic px-4 font-medium">
                {activeVerse.text}
              </p>
              <span className="font-orbitron text-xs text-cyan-400 tracking-wider font-bold block mt-4 uppercase">
                - {activeVerse.ref}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={drawNewVerse}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-102 cursor-pointer"
        >
          Draw Calming Verse
        </button>
      </div>
    </div>
  );
}


// ==============================================================
//   9. AVELUNE V-REALESTATE SOVEREIGN ANALYTICS GAUGES (id: 9)
// ==============================================================
function RealEstateSovereignSimulator() {
  const [assets, setAssets] = useState(8);
  const [avgPrice, setAvgPrice] = useState(8); // scale in Millions
  const [ltv, setLtv] = useState(50); // loan to value

  // Financial calculations
  const totalWorth = assets * avgPrice * 1000000;
  const debt = totalWorth * (ltv / 100);
  const netWorth = totalWorth - debt;
  const annualDividend = netWorth * 0.068; // 6.8% Cap rate

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Landmark className="text-cyan-400" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Avelune Sovereign RealEstate Analytics Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-500 uppercase">ASSETS IN PORTFOLIO:</span>
              <span className="text-white">{assets} Properties</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="25" 
              value={assets} 
              onChange={(e) => { sound.click(); setAssets(Number(e.target.value)); }}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-500 uppercase">AVG ASSET PRICE:</span>
              <span className="text-white">${avgPrice}M USD</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="30" 
              value={avgPrice} 
              onChange={(e) => { sound.click(); setAvgPrice(Number(e.target.value)); }}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-500 uppercase">PORTFOLIO LEVERAGE LTV %:</span>
              <span className="text-cyan-400">{ltv}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="80" 
              value={ltv} 
              onChange={(e) => { sound.click(); setLtv(Number(e.target.value)); }}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        {/* Gauges panel */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-5 flex flex-col justify-between font-mono text-xs">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block mb-4">Sovereign Financial Ledger metrics</span>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <span className="text-[8px] text-slate-500 block">TOTAL ASSETS VALUE</span>
                <span className="text-sm font-bold text-slate-100">${(totalWorth/1000000).toFixed(1)}M USD</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 block">LEDGER DEBT PROFILE</span>
                <span className="text-sm font-bold text-red-400">${(debt/1000000).toFixed(1)}M USD</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 block">NET PORTFOLIO EQUITY</span>
                <span className="text-sm font-bold text-emerald-400">${(netWorth/1000000).toFixed(1)}M USD</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 block">ANNUAL CAPITAL YIELD (6.8%)</span>
                <span className="text-sm font-bold text-cyan-400">${(annualDividend/1000).toFixed(1)}K USD</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-950 rounded p-2.5 text-[8px] text-slate-500 mt-4">
            PROJECTION ACCURACY: Iso-High-Yield • CALCULATOR COGNITION: Active (0.28ms)
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   10-20. CAPYTECH CORPORATE LMS/MOODLE EVENT TRIGGER SIMULATOR
// ==============================================================
function CapytechPluginSimulator({ title }: { title: string }) {
  const [logEntries, setLogEntries] = useState<string[]>([
    `[INIT] SYSTEM CORNER BOUND: Loaded module structure for '${title}'`,
    `[READY] Waiting for corporate supervisor action...`
  ]);
  const [triggerCount, setTriggerCount] = useState(0);

  const handleTriggerEvent = (actionType: string) => {
    sound.transmit();
    setTriggerCount(prev => prev + 1);
    
    let detail = "";
    if (actionType === "deadline") {
      detail = `[ALARM] Course reminders broadcasted to 284 offline cohorts. Delivery verified!`;
    } else if (actionType === "zoom") {
      detail = `[SYNC] Zoom live meeting handshake OK. Channel token generated: ZM_LNK_048x12.`;
    } else if (actionType === "scorm") {
      detail = `[SCORM] Archive decompressed successfully. 12 interactive e-learning pages injected into index DB.`;
    } else {
      detail = `[REWARD] +250 gamified reward tokens granted to active employee accounts.`;
    }

    setLogEntries(prev => [
      ...prev,
      `[EVENT_T] Triggered action '${actionType.toUpperCase()}' (Instance #${triggerCount + 1})`,
      detail,
      `[SYSTEM] State stabilized.`
    ]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Briefcase className="text-cyan-400 animate-pulse" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Capytech Journeys: LMS Core Event Simulator</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="md:col-span-5 space-y-4">
          <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">Simulator Command Center</span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Configure mock LMS interactions and test custom server webhooks designed for Capytech Moodle plugins.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTriggerEvent("deadline")}
              className="py-2.5 bg-slate-950 border border-slate-850 hover:border-cyan-500/40 text-slate-300 text-[10px] font-mono rounded-lg transition-all text-center cursor-pointer"
            >
              Check Deadline
            </button>
            <button
              onClick={() => handleTriggerEvent("zoom")}
              className="py-2.5 bg-slate-950 border border-slate-850 hover:border-cyan-500/40 text-slate-300 text-[10px] font-mono rounded-lg transition-all text-center cursor-pointer"
            >
              Handshake Zoom
            </button>
            <button
              onClick={() => handleTriggerEvent("scorm")}
              className="py-2.5 bg-slate-950 border border-slate-850 hover:border-cyan-500/40 text-slate-300 text-[10px] font-mono rounded-lg transition-all text-center cursor-pointer"
            >
              Parse SCORM
            </button>
            <button
              onClick={() => handleTriggerEvent("rewards")}
              className="py-2.5 bg-slate-950 border border-slate-850 hover:border-cyan-500/40 text-slate-300 text-[10px] font-mono rounded-lg transition-all text-center cursor-pointer"
            >
              Grant Tokens
            </button>
          </div>
        </div>

        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-4 flex flex-col justify-between font-mono text-xs">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block mb-3">LMS STDOUT Logs for: {title}</span>
            <div className="max-h-[140px] overflow-y-auto space-y-1.5 text-[10px] text-cyan-400/90 scrollbar-thin">
              {logEntries.map((log, idx) => (
                <div key={idx} className="border-b border-slate-900/40 pb-1 flex items-start gap-1">
                  <span className="text-slate-600 font-bold">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[8px] text-slate-600 mt-3 uppercase tracking-wider">
            Capytech Static Core Simulation Engine • Host: 127.0.0.1
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   21. FOOT PRINTS ACTIVITY TRACKER SIMULATOR
// ==============================================================
function FootprintsSimulator() {
  const [steps, setSteps] = useState(8240);
  const dailyGoal = 10000;
  
  // Computations
  const progressPercent = Math.min(100, Math.floor((steps / dailyGoal) * 100));
  const activeCalories = Math.floor(steps * 0.042); // average kcal per step
  const activeMiles = (steps * 0.00047).toFixed(2); // average miles per step

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Sparkles className="text-amber-400 animate-pulse" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Foot Prints: Step & Calorie Sandbox</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">Activity Adjuster</span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Drag the slider to mock active step counting and trace dynamic local Recharts visualizations.
          </p>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-500">TODAY'S STEP LOG:</span>
              <span className="text-amber-400">{steps.toLocaleString()} / {dailyGoal.toLocaleString()} Steps</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="15000" 
              step="100"
              value={steps} 
              onChange={(e) => { sound.click(); setSteps(Number(e.target.value)); }}
              className="w-full accent-amber-400"
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-5 flex flex-col justify-between font-mono text-xs">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block mb-4">Local State Calculations</span>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-center">
                <span className="text-[8px] text-slate-500 block">GOAL STATUS</span>
                <span className="text-sm font-bold text-slate-100">{progressPercent}%</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-center">
                <span className="text-[8px] text-slate-500 block">BURN DEPOT</span>
                <span className="text-sm font-bold text-red-400">{activeCalories} kcal</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-2.5 rounded-lg text-center">
                <span className="text-[8px] text-slate-500 block">EST DISTANCE</span>
                <span className="text-sm font-bold text-cyan-400">{activeMiles} mi</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-950 rounded p-2 text-[8px] text-slate-500 mt-4 uppercase">
            Runs offline-first via localized sandbox context • Verified
          </div>
        </div>
      </div>
    </div>
  );
}


// ==============================================================
//   22. PERIOD TRACKER SIMULATOR
// ==============================================================
function PeriodTrackerSimulator() {
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriodDaysAgo, setLastPeriodDaysAgo] = useState(10);

  // Health prediction formulas
  const nextPeriodInDays = cycleLength - lastPeriodDaysAgo;
  const ovulationDay = 14; // standard approximation from cycle end
  const daysUntilOvulation = ovulationDay - lastPeriodDaysAgo;

  const isFertile = Math.abs(daysUntilOvulation) <= 3;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Heart className="text-emerald-400 animate-pulse" size={18} />
        <span className="font-orbitron text-xs font-bold text-white uppercase tracking-wide">Sovereign Menstrual Calendar Forecaster</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Controls */}
        <div className="md:col-span-5 space-y-4">
          <span className="font-mono text-[9px] text-slate-500 uppercase block font-bold">Forecasting Variables</span>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            Privacy-first cycle calculations performed on local client state. Zero servers touched.
          </p>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-500">CYCLE LENGTH:</span>
              <span className="text-emerald-400">{cycleLength} Days</span>
            </div>
            <input 
              type="range" 
              min="21" 
              max="35" 
              value={cycleLength} 
              onChange={(e) => { sound.click(); setCycleLength(Number(e.target.value)); }}
              className="w-full accent-emerald-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono text-[9px] font-bold">
              <span className="text-slate-500">LAST PERIOD COMMENCED:</span>
              <span className="text-emerald-400">{lastPeriodDaysAgo} Days Ago</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={lastPeriodDaysAgo} 
              onChange={(e) => { sound.click(); setLastPeriodDaysAgo(Number(e.target.value)); }}
              className="w-full accent-emerald-400"
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-5 flex flex-col justify-between font-mono text-xs">
          <div>
            <span className="text-[9px] text-slate-500 uppercase block mb-4">Menstrual Projections Summary</span>
            
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Next cycle onset forecast:</span>
                <span className="font-bold text-slate-100">
                  {nextPeriodInDays > 0 ? `In ${nextPeriodInDays} days` : `Overdue by ${Math.abs(nextPeriodInDays)} days`}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-1.5">
                <span className="text-slate-400">Days to ovulation peak:</span>
                <span className="font-bold text-slate-100">
                  {daysUntilOvulation > 0 ? `In ${daysUntilOvulation} days` : `Occurred ${Math.abs(daysUntilOvulation)} days ago`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current fertility index:</span>
                <span className={`font-black uppercase ${isFertile ? "text-amber-400 animate-pulse" : "text-emerald-400"}`}>
                  {isFertile ? "HIGH / Peak Fertile Window" : "LOW / Safe Cycle Phase"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/40 rounded p-2 text-[8.5px] text-emerald-400 mt-4 uppercase">
            Security status: Complete browser-side data sovereignty active
          </div>
        </div>
      </div>
    </div>
  );
}
