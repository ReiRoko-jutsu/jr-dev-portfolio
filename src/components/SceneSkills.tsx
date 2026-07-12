import { useState, useEffect, useRef, RefObject, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SkillNode, PlayerStats } from "../types";
import { sound } from "../utils/audio";
import { 
  FileCode, 
  Cpu, 
  Shield, 
  Sparkles, 
  Terminal, 
  Network, 
  Database, 
  GitBranch, 
  Box, 
  Cloud, 
  Flame, 
  Lock, 
  Unlock, 
  ArrowRight,
  TrendingUp,
  Zap,
  CheckCircle2,
  PenTool,
  Users,
  MessageSquare,
  Languages,
  Globe,
  Smartphone
} from "lucide-react";

// Safe icon mapper
const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case "FileCode": return FileCode;
    case "Cpu": return Cpu;
    case "Shield": return Shield;
    case "Sparkles": return Sparkles;
    case "Terminal": return Terminal;
    case "Network": return Network;
    case "Database": return Database;
    case "GitBranch": return GitBranch;
    case "Container": return Box; // fallback
    case "Cloud": return Cloud;
    case "Flame": return Flame;
    case "Box": return Box;
    case "PenTool": return PenTool;
    case "Users": return Users;
    case "MessageSquare": return MessageSquare;
    case "Languages": return Languages;
    case "Globe": return Globe;
    case "Smartphone": return Smartphone;
    default: return Cpu;
  }
};

interface SkillTreeConnectionsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  skills: SkillNode[];
  activeTab: string;
  unlockedSkills: string[];
}

function SkillTreeConnections({ containerRef, skills, activeTab, unlockedSkills }: SkillTreeConnectionsProps) {
  const [lines, setLines] = useState<Array<{
    id: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    isUnlocked: boolean;
  }>>([]);

  useEffect(() => {
    const calculateConnections = () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const newLines: typeof lines = [];

      // Find all buttons with data-skill-id inside this container
      const buttonEls = containerEl.querySelectorAll<HTMLButtonElement>("[data-skill-id]");
      const elMap = new Map<string, HTMLButtonElement>();
      buttonEls.forEach((el) => {
        const id = el.getAttribute("data-skill-id");
        if (id) elMap.set(id, el);
      });

      // For each element in the map, find its parent connections
      elMap.forEach((childEl, childId) => {
        const childSkill = skills.find(s => s.id === childId);
        if (!childSkill || !childSkill.parentIds) return;

        childSkill.parentIds.forEach((parentId) => {
          const parentEl = elMap.get(parentId);
          if (!parentEl) return;

          const parentRect = parentEl.getBoundingClientRect();
          const childRect = childEl.getBoundingClientRect();

          // Calculate center coordinates relative to the container
          const x1 = parentRect.left + parentRect.width / 2 - containerRect.left;
          const y1 = parentRect.top + parentRect.height / 2 - containerRect.top;
          const x2 = childRect.left + childRect.width / 2 - containerRect.left;
          const y2 = childRect.top + childRect.height / 2 - containerRect.top;

          // A parent connection is unlocked if the parent skill itself is unlocked/leveled up
          const parentSkill = skills.find(s => s.id === parentId);
          const isParentUnlocked = parentSkill ? (unlockedSkills.includes(parentId) || parentSkill.level > 0) : false;

          newLines.push({
            id: `${parentId}-${childId}`,
            x1,
            y1,
            x2,
            y2,
            isUnlocked: isParentUnlocked,
          });
        });
      });

      setLines(newLines);
    };

    calculateConnections();

    window.addEventListener("resize", calculateConnections);

    // Multiple micro-ticks to ensure DOM settles during layout renders and tab switches
    const timer1 = setTimeout(calculateConnections, 100);
    const timer2 = setTimeout(calculateConnections, 300);
    const timer3 = setTimeout(calculateConnections, 600);

    return () => {
      window.removeEventListener("resize", calculateConnections);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [containerRef, skills, activeTab, unlockedSkills]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      {lines.map((line) => {
        const dx = Math.abs(line.x2 - line.x1);
        const dy = Math.abs(line.y2 - line.y1);
        
        let pathD = "";
        if (dy > dx) {
          const controlY = (line.y1 + line.y2) / 2;
          pathD = `M ${line.x1} ${line.y1} C ${line.x1} ${controlY}, ${line.x2} ${controlY}, ${line.x2} ${line.y2}`;
        } else {
          const controlX = (line.x1 + line.x2) / 2;
          pathD = `M ${line.x1} ${line.y1} C ${controlX} ${line.y1}, ${controlX} ${line.y2}, ${line.x2} ${line.y2}`;
        }

        return (
          <g key={line.id}>
            {/* Background trace line */}
            <path
              d={pathD}
              fill="none"
              stroke={line.isUnlocked ? "rgba(16, 185, 129, 0.12)" : "rgba(71, 85, 105, 0.15)"}
              strokeWidth={3}
              strokeDasharray={line.isUnlocked ? undefined : "4 4"}
            />

            {/* Unlocked active flow effects */}
            {line.isUnlocked && (
              <>
                {/* Neon Underglow path */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.3)"
                  strokeWidth={4.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Main Neon cyan path */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                />

                {/* Moving electronic data pulse packets */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  className="animate-skill-flow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}


interface SceneSkillsProps {
  stats: PlayerStats;
  skills: SkillNode[];
  onUnlockSkill: (skillId: string, xpCost: number) => void;
}

export default function SceneSkills({ stats, skills, onUnlockSkill }: SceneSkillsProps) {
  const treeColumnRef = useRef<HTMLDivElement>(null);
  const commsColumnRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "tools" | "special" | "comms" | "language">("frontend");
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(
    skills.find(s => s.category === "frontend") || skills[0]
  );

  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent, skill: SkillNode) => {
    if (gridContainerRef.current) {
      const rect = gridContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + 15;
      const y = e.clientY - rect.top + 15;

      // Keep tooltip within bounds of grid container
      const safeX = x + 250 > rect.width ? rect.width - 260 : x;
      const safeY = y + 170 > rect.height ? rect.height - 180 : y;

      setTooltipPos({ x: safeX, y: safeY });
    }
    setHoveredSkill(skill);
  };

  const getSkillTechStack = (id: string, category: string) => {
    if (id.includes("html") || id.includes("css") || id.includes("tailwind") || id.includes("bootstrap") || id.includes("web_design")) {
      return "HTML5 • CSS3 • Tailwind CSS • Responsive UI • W3C Web Design Standards";
    }
    if (id.includes("react") || id.includes("typescript") || id.includes("vue") || id.includes("nextjs") || id.includes("angular")) {
      return "React Hooks • TypeScript Types • Vue 3 Composition • Next.js Routing • Angular Architecture";
    }
    if (id.includes("php") || id.includes("laravel") || id.includes("mysql") || id.includes("sql") || id.includes("supabase") || id.includes("django") || id.includes("python") || id.includes("express") || id.includes("js") || id.includes("cpp")) {
      return "REST APIs • Express Router • Python Scripting • PHP Laravel • MySQL Relational Schemas • C++ System Logic";
    }
    if (id.includes("maps") || id.includes("openai") || id.includes("gemini") || id.includes("google") || id.includes("chatgpt") || id.includes("zoom")) {
      return "REST JSON APIs • @google/genai SDK • ChatGPT AI Integrations • Zoom Meeting SDK";
    }
    if (id.includes("aws") || id.includes("hetzner") || id.includes("git")) {
      return "AWS EC2/S3 • Hetzner VPS Deployment • SSH Terminal Shell • Git Version Control";
    }
    if (category === "comms") {
      return "Technical Documentation • Moodle APIs • Team Collaboration • Sprint Deliveries";
    }
    if (category === "language") {
      return "Multilingual Communication • Localization • Technical Phrasing";
    }
    return "Full Stack Software Engineering Standards";
  };

  const filteredSkills = skills.filter(s => s.category === activeTab);

  const handleSelectSkill = (skill: SkillNode) => {
    sound.click();
    setSelectedSkill(skill);
  };

  // Check if a skill is unlockable based on parent IDs
  const isPrerequisitesMet = (skill: SkillNode) => {
    if (!skill.parentIds || skill.parentIds.length === 0) return true;
    return skill.parentIds.every(parentId => stats.unlockedSkills.includes(parentId));
  };

  // Get parent names for displaying requirements
  const getParentNames = (skill: SkillNode) => {
    if (!skill.parentIds) return [];
    return skill.parentIds.map(pid => {
      const parent = skills.find(s => s.id === pid);
      return parent ? parent.name : pid;
    });
  };

  const handleUpgrade = () => {
    const isUnlocked = stats.unlockedSkills.includes(selectedSkill.id) || selectedSkill.level > 0;
    const canAfford = stats.xp >= selectedSkill.cost;
    const meetsPre = isPrerequisitesMet(selectedSkill);
    const isMax = selectedSkill.level >= selectedSkill.maxLevel;

    if (!meetsPre) {
      sound.error();
      return;
    }

    if (isMax) {
      sound.error();
      return;
    }

    if (!canAfford) {
      sound.error();
      alert("Insufficient XP! Claim more chronicle archives in Level 1 or explore Level 3 to gain experience points.");
      return;
    }

    onUnlockSkill(selectedSkill.id, selectedSkill.cost);
  };

  const categories = [
    { id: "frontend", label: "FRONT-END DEVELOPMENT" },
    { id: "backend", label: "BACK-END DEVELOPMENT" },
    { id: "special", label: "API INTEGRATION" },
    { id: "tools", label: "SERVER" },
    { id: "comms", label: "COMMUNICATION" },
    { id: "language", label: "LANGUAGES" }
  ];

  const currentSkillState = skills.find(s => s.id === selectedSkill.id) || selectedSkill;
  const isUnlocked = stats.unlockedSkills.includes(currentSkillState.id) || currentSkillState.level > 0;
  const isMaxLevel = currentSkillState.level >= currentSkillState.maxLevel;
  const preMet = isPrerequisitesMet(currentSkillState);

  return (
    <div className="relative min-h-screen pt-28 pb-32 flex flex-col justify-center px-4 overflow-hidden">
      {/* Background Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.35),rgba(2,6,23,0.95))] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.1)_1px,transparent_1px)] bg-[size:40px_40px] z-0 opacity-25" />

      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col gap-6">
        
        {/* Stage Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/10 mb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider font-semibold uppercase">LEVEL 2: CAPABILITY GRID</span>
          </div>
          <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white">THE ABILITY SKILL TREE</h2>
          <p className="text-slate-400 font-sans text-sm max-w-xl">
            Acquire specialized nodes across modern tech domains. Spend earned XP to level up abilities and unlock higher tier traits.
          </p>
        </div>

        {/* Tree Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.click();
                setActiveTab(cat.id as any);
                const firstOfCat = skills.find(s => s.category === cat.id);
                if (firstOfCat) setSelectedSkill(firstOfCat);
              }}
              className={`font-orbitron font-bold text-xs tracking-wider px-4 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? "border-cyan-400 bg-cyan-950/20 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                  : "border-slate-800 bg-slate-900/30 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Interactive Skill Grid */}
        <div ref={gridContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          
          {/* Dedicated Sidebar for Communication & Language */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Communication skills panel */}
            <div 
              ref={commsColumnRef}
              className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500/40 z-10" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500/40 z-10" />
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-1 relative z-10">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span className="font-orbitron text-xs font-bold text-white tracking-wide uppercase">Communication Core</span>
              </div>
              
              <SkillTreeConnections 
                containerRef={commsColumnRef}
                skills={skills}
                activeTab="comms"
                unlockedSkills={stats.unlockedSkills}
              />

              <div className="flex flex-col gap-2.5 relative z-10">
                {skills.filter(s => s.category === "comms").map(skill => {
                  const IconComponent = getSkillIcon(skill.icon);
                  const skillState = skills.find(s => s.id === skill.id) || skill;
                  const skillUnlocked = stats.unlockedSkills.includes(skillState.id) || skillState.level > 0;
                  const isSkillSelected = selectedSkill.id === skill.id;
                  const preReqMet = isPrerequisitesMet(skillState);

                  return (
                    <button
                      key={skill.id}
                      data-skill-id={skill.id}
                      onClick={() => handleSelectSkill(skillState)}
                      onMouseMove={(e) => handleMouseMove(e, skillState)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`w-full relative flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 transform cursor-pointer clickable ${
                        isSkillSelected
                          ? "border-amber-400 bg-slate-950 shadow-[0_0_10px_rgba(245,158,11,0.2)] scale-[1.02]"
                          : !preReqMet
                          ? "border-slate-950 bg-slate-950/90 text-slate-600 opacity-60 cursor-not-allowed"
                          : skillUnlocked
                          ? "border-emerald-500/40 bg-slate-900 text-emerald-300 hover:border-emerald-500/50"
                          : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg border shrink-0 ${
                        isSkillSelected 
                          ? "border-amber-400/40 bg-amber-950/30 text-amber-400" 
                          : skillUnlocked 
                          ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-400" 
                          : "border-slate-800 bg-slate-900"
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h5 className="font-orbitron text-[10px] font-bold text-white truncate tracking-wider leading-tight">
                          {skill.name}
                        </h5>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[8px] font-mono text-slate-500">LVL {skillState.level} / {skillState.maxLevel}</span>
                          {skillUnlocked && <span className="text-[8px] font-mono text-emerald-400 font-bold">ACTIVE</span>}
                          {!preReqMet && <span className="text-[8px] font-mono text-red-400 font-bold">LOCKED</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language skills panel */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/40" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/40" />
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-1">
                <Languages className="w-4 h-4 text-cyan-400" />
                <span className="font-orbitron text-xs font-bold text-white tracking-wide uppercase">Language Matrix</span>
              </div>
              
              <div className="flex flex-col gap-2.5">
                {skills.filter(s => s.category === "language").map(skill => {
                  const IconComponent = getSkillIcon(skill.icon);
                  const skillState = skills.find(s => s.id === skill.id) || skill;
                  const skillUnlocked = stats.unlockedSkills.includes(skillState.id) || skillState.level > 0;
                  const isSkillSelected = selectedSkill.id === skill.id;

                  return (
                    <button
                      key={skill.id}
                      onClick={() => handleSelectSkill(skillState)}
                      onMouseMove={(e) => handleMouseMove(e, skillState)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`w-full relative flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all duration-300 transform cursor-pointer clickable ${
                        isSkillSelected
                          ? "border-cyan-400 bg-cyan-950/20 shadow-[0_0_10px_rgba(34,211,238,0.2)] scale-[1.02]"
                          : skillUnlocked
                          ? "border-emerald-500/30 bg-emerald-950/5 text-emerald-300 hover:border-emerald-500/50"
                          : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg border shrink-0 ${
                        isSkillSelected 
                          ? "border-cyan-400/40 bg-cyan-950/30 text-cyan-400" 
                          : skillUnlocked 
                          ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-400" 
                          : "border-slate-800 bg-slate-900"
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h5 className="font-orbitron text-[10px] font-bold text-white truncate tracking-wider leading-tight">
                          {skill.name}
                        </h5>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[8px] font-mono text-slate-500">LVL {skillState.level} / {skillState.maxLevel}</span>
                          {skillUnlocked && <span className="text-[8px] font-mono text-emerald-400 font-bold">ACTIVE</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Active Tree Column */}
          <div 
            ref={treeColumnRef}
            className="lg:col-span-5 md:col-span-7 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative flex flex-col justify-center overflow-hidden"
          >
            {/* Background tree connection hint path */}
            <div className="absolute inset-0 bg-radial opacity-10" />

            <SkillTreeConnections 
              containerRef={treeColumnRef}
              skills={skills}
              activeTab={activeTab}
              unlockedSkills={stats.unlockedSkills}
            />

            <div className="grid grid-cols-2 gap-4 relative z-10">
              {filteredSkills.map((skill) => {
                const IconComponent = getSkillIcon(skill.icon);
                const skillState = skills.find(s => s.id === skill.id) || skill;
                const skillUnlocked = stats.unlockedSkills.includes(skillState.id) || skillState.level > 0;
                const preReqMet = isPrerequisitesMet(skillState);
                const isSkillSelected = selectedSkill.id === skill.id;

                return (
                  <button
                    key={skill.id}
                    data-skill-id={skill.id}
                    onClick={() => handleSelectSkill(skillState)}
                    onMouseMove={(e) => handleMouseMove(e, skillState)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-300 transform cursor-pointer clickable ${
                      isSkillSelected
                        ? "border-cyan-400 bg-cyan-950/90 shadow-[0_0_15px_rgba(34,211,238,0.25)] scale-[1.02]"
                        : !preReqMet
                        ? "border-slate-950 bg-slate-950/90 text-slate-600 opacity-60 cursor-not-allowed"
                        : skillUnlocked
                        ? "border-emerald-500/50 bg-slate-900 text-emerald-300 hover:border-emerald-400"
                        : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    {/* Status icons inside node */}
                    <div className="flex justify-between w-full items-center mb-3">
                      <div className={`p-2.5 rounded-lg border ${
                        isSkillSelected 
                          ? "border-cyan-400/50 bg-cyan-950/40" 
                          : skillUnlocked 
                          ? "border-emerald-500/30 bg-emerald-950/20 text-emerald-400" 
                          : "border-slate-800 bg-slate-900"
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Top right level ticker */}
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold">
                        LVL {skillState.level} / {skillState.maxLevel}
                      </span>
                    </div>

                    <h4 className="font-orbitron text-xs font-bold text-white tracking-wide leading-tight">
                      {skill.name}
                    </h4>

                    {/* Pre-requisite warnings */}
                    {!preReqMet && (
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-red-400 font-mono">
                        <Lock className="w-3 h-3" />
                        <span>LOCKED: Prereq needed</span>
                      </div>
                    )}

                    {preReqMet && !skillUnlocked && (
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-yellow-500 font-mono animate-pulse">
                        <Unlock className="w-3 h-3" />
                        <span>AVAILABLE</span>
                      </div>
                    )}

                    {skillUnlocked && (
                      <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400 font-mono">
                        <TrendingUp className="w-3 h-3" />
                        <span>Active Multiplier</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ability Stats and Unlock panel */}
          <div className="lg:col-span-4 md:col-span-5 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative flex flex-col justify-between">
            {/* Corner Bracket Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-700" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-700" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-700" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-700" />

            <div>
              {/* Category label */}
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 tracking-wider font-bold block w-fit mb-4 uppercase">
                {currentSkillState.category} NODE INTEL
              </span>

              {/* Title & Level stats */}
              <h3 className="font-orbitron text-lg font-black text-white tracking-wide mb-1">
                {currentSkillState.name}
              </h3>
              
              <div className="flex items-center gap-3 font-mono text-xs mb-4">
                <span className="text-slate-400">Current Rank:</span>
                <span className="text-cyan-400 font-bold">Rank {currentSkillState.level} / {currentSkillState.maxLevel}</span>
              </div>

              {/* Lore Description */}
              <p className="text-slate-300 font-sans text-xs leading-relaxed mb-6 bg-slate-900/30 p-3.5 rounded-xl border border-slate-900">
                {currentSkillState.description}
              </p>

              {/* Prerequisites panel */}
              {currentSkillState.parentIds && currentSkillState.parentIds.length > 0 && (
                <div className="mb-6">
                  <span className="font-orbitron text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-2">
                    PREREQUISITES REQUIRED
                  </span>
                  <div className="flex flex-col gap-1.5 font-mono text-xs">
                    {getParentNames(currentSkillState).map((pname, index) => {
                      const pid = currentSkillState.parentIds![index];
                      const parentUnlocked = stats.unlockedSkills.includes(pid);
                      return (
                        <div key={pid} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${parentUnlocked ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          <span className={parentUnlocked ? 'text-slate-300' : 'text-red-400'}>{pname}</span>
                          <span className="text-slate-600">({parentUnlocked ? 'UNLOCKED' : 'LOCKED'})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stats Boost multipliers */}
              <div className="space-y-2.5">
                <span className="font-orbitron text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                  ABILITY MULTIPLIER UNLOCKS
                </span>
                <div className="space-y-1.5">
                  {currentSkillState.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-mono text-xs bg-slate-900/20 border border-slate-900/60 p-2 rounded-lg text-slate-300">
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lock / Upgrade Controls */}
            <div className="mt-8 pt-4 border-t border-slate-900 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">UPGRADE COST:</span>
                <span className="text-yellow-500 font-bold">{currentSkillState.cost} XP</span>
              </div>

              {!preMet ? (
                <div className="flex items-center justify-center gap-1.5 bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl text-red-400 font-mono text-xs font-bold">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>PREREQUISITES UNMET</span>
                </div>
              ) : isMaxLevel ? (
                <div className="flex items-center justify-center gap-1.5 bg-emerald-950/20 border border-emerald-800/60 p-3 rounded-xl text-emerald-400 font-mono text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>MAX LEVEL MASTERED</span>
                </div>
              ) : (
                <button
                  onClick={handleUpgrade}
                  disabled={stats.xp < currentSkillState.cost}
                  className={`flex items-center justify-center gap-2 font-orbitron font-bold text-xs p-3.5 rounded-xl transition-all duration-200 cursor-pointer clickable ${
                    stats.xp >= currentSkillState.cost
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-[1.02]"
                      : "bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>
                    {isUnlocked ? "UPGRADE ABILITY RANK" : "UNLOCK ABILITY NODE"}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Floating context-aware skill cognition tooltip portal */}
          <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.12 }}
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
                className="absolute z-[100] w-64 bg-slate-950/98 border border-cyan-500/40 p-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md pointer-events-none select-none text-xs font-sans space-y-3"
              >
                {/* Corner bracket style decorators */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />

                <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 font-mono text-[9px]">
                  <span className="text-cyan-400 font-bold uppercase tracking-widest">[SKILL SYSTEM COGNITION]</span>
                  <span className="text-slate-500 uppercase">{hoveredSkill.category}</span>
                </div>

                <div>
                  <h4 className="font-orbitron text-[11px] font-bold text-white uppercase tracking-wider mb-0.5">{hoveredSkill.name}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-medium italic">
                    {hoveredSkill.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">NODE CAPABILITY CORE:</span>
                  <p className="text-[9.5px] font-mono text-cyan-300 bg-cyan-950/20 border border-cyan-950 px-2 py-1 rounded">
                    {getSkillTechStack(hoveredSkill.id, hoveredSkill.category)}
                  </p>
                </div>

                {hoveredSkill.stats && hoveredSkill.stats.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-slate-500 uppercase block font-bold">PROGRESSIVE UPGRADE BOOSTS:</span>
                    <div className="flex flex-col gap-0.5">
                      {hoveredSkill.stats.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                          <span className="text-cyan-400 font-bold">&gt;</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between border-t border-slate-900 pt-2 font-mono text-[8px] text-slate-500">
                  <span>RANK {hoveredSkill.level} / {hoveredSkill.maxLevel}</span>
                  <span>COST: {hoveredSkill.cost} XP</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
