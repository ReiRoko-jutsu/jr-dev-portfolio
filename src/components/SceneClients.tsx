import { motion } from "motion/react";
import { sound } from "../utils/audio";
import { GameScene } from "../types";
import { 
  Briefcase, CheckCircle2, ShieldCheck, Terminal, 
  ArrowRight, Users, Sparkles, Layers, Cpu, Code2, 
  Zap, Compass
} from "lucide-react";

interface SceneClientsProps {
  onStartConsultation: (scene: GameScene) => void;
}

export default function SceneClients({ onStartConsultation }: SceneClientsProps) {
  const handleCtaClick = () => {
    sound.questComplete();
    onStartConsultation(GameScene.CONTACT);
  };

  const services = [
    {
      icon: Briefcase,
      title: "LMS & Custom Moodle Plugins",
      desc: "Architecting bespoke learning management systems, automated deadline reminders, Zoom API synchronizers, and high-efficiency SCORM extraction modules.",
      tech: "PHP • Moodle APIs • SCORM • MySQL • Redis",
      accent: "from-cyan-500/20 to-blue-500/10 border-cyan-500/40"
    },
    {
      icon: Code2,
      title: "Full-Stack Web Orchestrations",
      desc: "Creating high-fidelity, responsive client-side visual panels and high-performance Laravel or Django backends designed to parse data safely.",
      tech: "React • Vue 3 • Laravel • Django • Tailwind CSS",
      accent: "from-amber-500/20 to-orange-500/10 border-amber-500/40"
    },
    {
      icon: ShieldCheck,
      title: "Sovereign Local-First Tooling",
      desc: "Crafting zero-telemetry, private wellness track logs, period planners, and offline-ready utilities optimized to run entirely on the client browser.",
      tech: "React • localState • IndexedDB • Recharts • Vite",
      accent: "from-emerald-500/20 to-teal-500/10 border-emerald-500/40"
    }
  ];

  const milestones = [
    { num: "01", name: "Blueprint Alignment", desc: "Co-authoring structural specifications and defining data models." },
    { num: "02", name: "High-Fidelity Prototyping", desc: "Iterating on modern Tailwind interfaces and local-first simulation boards." },
    { num: "03", name: "Sovereign Development", desc: "Constructing robust backend controllers, API webhooks, and secure databases." },
    { num: "04", name: "Launch & Compilation", desc: "Hosting on VPS with +99.9% uptime verification and complete documentation handover." }
  ];

  const clients = [
    { name: "Capytech Company", desc: "LMS Systems, Custom Moodle Plugins, and E-Learning Framework Formulations" },
    { name: "Western Mindanao State University", desc: "UPRESS Department CMS & Procurement Management System" },
    { name: "Zamboanga Municipal LGU", desc: "Agricultural Crop GIS Agri-Map and Regional Data Visualizers" },
    { name: "Sovereign Local Lab Contacts", desc: "Bayanihan Design Tokens, Step Tracker, and Womens Health Planners" }
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-32 bg-slate-950 px-4 md:px-6 overflow-hidden font-sans" id="ClientPortal">
      {/* Immersive Space Nebula Grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[160px] pointer-events-none" />

      {/* Cyber grid layout */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,116,144,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,116,144,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <header className="text-center mb-16 px-2">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-6"
          >
            <Users size={12} className="text-cyan-400 animate-pulse" />
            <span className="font-orbitron text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">LEVEL 4: FREELANCE OPERATIONS CONSOLE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-orbitron text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none"
          >
            Client<span className="text-cyan-500">Hub.</span>
          </motion.h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base font-medium italic leading-relaxed">
            I am currently accepting select project-based consultations. Explore available service layers and launch client-facing quest pipelines right from this terminal.
          </p>
        </header>

        {/* Dynamic Status Banner */}
        <div className="relative bg-slate-900/40 border border-cyan-500/20 rounded-3xl p-6 mb-12 backdrop-blur-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-400" />
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)] shrink-0 animate-pulse">
              <Zap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Operational Status</span>
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
              </div>
              <h2 className="font-orbitron text-lg font-black text-white uppercase mt-0.5">Accepting Project-Based Contracts</h2>
            </div>
          </div>
          
          <button 
            onClick={handleCtaClick}
            className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 font-orbitron font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center gap-2 active:scale-95 shrink-0"
          >
            Initiate Project Quest <ArrowRight size={14} />
          </button>
        </div>

        {/* Services Showcase */}
        <section className="mb-16">
          <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
            <Layers className="text-cyan-500" size={20} />
            <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Available Engineering Services</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-br ${svc.accent} border rounded-[2rem] p-8 flex flex-col justify-between hover:scale-[1.01] hover:border-slate-700 transition-all duration-300 relative`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center text-white mb-6">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-orbitron text-lg font-black text-white uppercase mb-3 tracking-wide">{svc.title}</h3>
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-sans font-medium">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-900 font-mono text-[10px] text-slate-400">
                    <span className="text-cyan-400 font-bold block mb-1">CAPABILITY GRID:</span>
                    {svc.tech}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Milestone Workflows & Client Rosters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Milestone Workflow */}
          <section className="lg:col-span-7">
            <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
              <Compass className="text-amber-500" size={20} />
              <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Client Delivery Milestones</h2>
            </div>
            
            <div className="space-y-4">
              {milestones.map((m, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex gap-4 items-start relative">
                  <div className="font-orbitron font-black text-2xl text-cyan-500/40 select-none shrink-0 mt-1">
                    {m.num}
                  </div>
                  <div>
                    <h3 className="font-orbitron text-sm font-black text-white uppercase tracking-wider">{m.name}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-sans font-medium">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Client Portfolio Roster */}
          <section className="lg:col-span-5">
            <div className="flex items-center gap-3.5 mb-8 border-b border-slate-900 pb-3">
              <Cpu className="text-emerald-400" size={20} />
              <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-wider">Departments & Brands Handled</h2>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-[2rem] p-6 space-y-5 backdrop-blur-md">
              {clients.map((c, idx) => (
                <div key={idx} className="border-b border-slate-800/60 last:border-b-0 pb-4 last:pb-0">
                  <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase block tracking-wider">SECURE CLIENT ID 0{idx + 1}</span>
                  <h3 className="font-orbitron text-xs font-black text-white uppercase mt-0.5">{c.name}</h3>
                  <p className="text-slate-400 text-[11px] mt-1 italic font-sans font-medium">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
