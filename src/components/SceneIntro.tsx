import { motion } from "motion/react";
import { sound } from "../utils/audio";
import { GameScene } from "../types";
import { Sword, Zap, Brain, Sparkles, User, ChevronRight } from "lucide-react";

interface SceneIntroProps {
  onStart: (nextScene: GameScene) => void;
}

export default function SceneIntro({ onStart }: SceneIntroProps) {
  
  const handleStartJourney = () => {
    sound.levelUp();
    onStart(GameScene.ORIGIN);
  };

  const characterAttributes = [
    { name: "Code Logic", val: 94, color: "from-cyan-500 to-blue-500", icon: Brain },
    { name: "Agility (Speed)", val: 88, color: "from-emerald-500 to-teal-500", icon: Zap },
    { name: "Design Polish", val: 91, color: "from-fuchsia-500 to-pink-500", icon: Sparkles },
    { name: "Guild Teamwork", val: 95, color: "from-yellow-500 to-amber-500", icon: User }
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-32 flex items-center justify-center overflow-hidden px-4 select-none">
      {/* Sci-fi Background Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.3),rgba(2,6,23,0.9))] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.1)_1px,transparent_1px)] bg-[size:32px_32px] z-0 opacity-40" />

      {/* Floating abstract glowing balls */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse duration-4000 z-0" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse duration-6000 z-0" />

      <div className="relative max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: Avatar Panel & RPG Attributes */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-5 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          {/* Player Identity Badge */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-slate-800/80">
            <div className="relative group w-28 h-28 rounded-2xl border-2 border-cyan-500/40 bg-slate-900 overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all hover:border-cyan-400 duration-300 mb-4">
              {/* Fallback elegant avatar icon */}
              <User className="w-14 h-14 text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
              {/* Corner scanline glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-2000 ease-in-out" />
            </div>
            
            <h2 className="font-orbitron font-bold text-lg text-white">JUNE REY ORIAS</h2>
            <p className="font-mono text-xs text-slate-400">CLASS: Fullstack Developer</p>
          </div>

          {/* RPG Stats Sheet */}
          <div className="mt-6 space-y-4">
            <h3 className="font-orbitron text-xs font-bold tracking-wider text-cyan-400 uppercase">BASE STATS</h3>
            
            {characterAttributes.map((attr) => {
              const AttrIcon = attr.icon;
              return (
                <div key={attr.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <AttrIcon className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{attr.name}</span>
                    </div>
                    <span className="font-bold text-white">{attr.val}/99</span>
                  </div>
                  <div className="h-2 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-slate-800/60">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(attr.val / 99) * 100}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${attr.color} rounded-full`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Passive Skills */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <span className="font-mono text-[10px] text-slate-500">
              BONUS: +25% COFFEE RESISTANCE • OPTIMIZED IN DRY PRINCIPLES
            </span>
          </div>
        </motion.div>

        {/* Right Side: Hero Welcome Text & Mission Brief */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-7 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/10 w-fit mb-6 shadow-sm">
            <Sword className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider font-semibold uppercase">SPAWN POINT READY</span>
          </div>

          <h1 className="font-orbitron text-4xl sm:text-5xl font-black text-white leading-none tracking-tight mb-4">
            WELCOME TO MY <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">
              STORYTELLING QUEST
            </span>
          </h1>

          <p className="text-slate-300 font-sans text-base leading-relaxed mb-6 max-w-xl">
            My name is <strong className="text-white">June Orias</strong>. I engineer beautiful, high-performance web systems. 
            This portfolio is constructed as a gamified journey. Advance through individual levels to uncover my career milestones, capability skill trees, and fully completed project showcase worlds.
          </p>

          {/* Mission Briefing Box */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 mb-8 max-w-xl relative overflow-hidden">
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-orbitron text-xs text-yellow-500 font-bold tracking-widest block mb-2">INITIAL MISSION STATUS</span>
            <ul className="space-y-2 font-mono text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">▷</span>
                <span>Select <strong className="text-slate-300">Start Journey</strong> to spawn at level 1 timeline.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">▷</span>
                <span>Spend XP to unlock abilities inside the interactive Skill Tree.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">▷</span>
                <span>Secure contact clearance by transmitting a portal message.</span>
              </li>
            </ul>
          </div>

          {/* Start Gateway Button */}
          <button
            onClick={handleStartJourney}
            className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-orbitron font-bold text-base px-8 py-4 rounded-xl shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] duration-300 w-fit cursor-pointer clickable overflow-hidden"
          >
            {/* Gloss shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
            <span>INITIALIZE QUEST TIMELINE</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}
