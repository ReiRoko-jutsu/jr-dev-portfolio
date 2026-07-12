import { useState } from "react";
import { motion } from "motion/react";
import { timelineMilestones } from "../data/portfolioData";
import { Milestone, PlayerStats } from "../types";
import { sound } from "../utils/audio";
import { 
  Tv, 
  BookOpen, 
  ShieldAlert, 
  Sword, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Award,
  ChevronRight
} from "lucide-react";

// Lucide Icon mapper helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Tv": return Tv;
    case "BookOpen": return BookOpen;
    case "ShieldAlert": return ShieldAlert;
    case "Sword": return Sword;
    case "Zap": return Zap;
    default: return BookOpen;
  }
};

interface SceneOriginProps {
  stats: PlayerStats;
  onClaimMilestone: (id: string, xpReward: number) => void;
}

export default function SceneOrigin({ stats, onClaimMilestone }: SceneOriginProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(timelineMilestones[0]);

  const handleSelectMilestone = (milestone: Milestone) => {
    sound.select();
    setSelectedMilestone(milestone);
  };

  const handleClaimXp = (milestone: Milestone) => {
    const isClaimed = stats.completedQuests.includes(`milestone_${milestone.id}`);
    if (!isClaimed) {
      onClaimMilestone(milestone.id, milestone.xpReward);
    } else {
      sound.error();
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-32 flex flex-col justify-center px-4 overflow-hidden">
      {/* Background Matrix/Nebula Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,41,59,0.2),rgba(2,6,23,0.95))] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.15)_1px,transparent_1px)] bg-[size:24px_24px] z-0 opacity-20" />

      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col gap-6">
        
        {/* Stage Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-950/10 mb-2">
            <Clock className="w-4 h-4 text-teal-400" />
            <span className="font-mono text-xs text-teal-400 tracking-wider font-semibold uppercase">LEVEL 1: CHRONO ARCHIVES</span>
          </div>
          <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white">THE ORIGIN STORY PATH</h2>
          <p className="text-slate-400 font-sans text-sm max-w-xl">
            Select nodes on the chronological grid path to unlock timeline records and claim career experience point rewards.
          </p>
        </div>

        {/* Level Map Grid Line (Horizontal / Sequential Navigation) */}
        <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-6 backdrop-blur-md">
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2 pt-4 pb-2">
            {/* Horizontal Line Connector */}
            <div className="absolute top-[42px] left-8 right-8 h-1 bg-slate-800 hidden md:block z-0" />

            {timelineMilestones.map((milestone, idx) => {
              const IconComponent = getIcon(milestone.icon);
              const isSelected = selectedMilestone.id === milestone.id;
              const isClaimed = stats.completedQuests.includes(`milestone_${milestone.id}`);

              return (
                <div key={milestone.id} className="relative flex flex-col items-center z-10 w-full md:w-auto">
                  <button
                    onClick={() => handleSelectMilestone(milestone)}
                    className={`relative w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300 transform cursor-pointer clickable ${
                      isSelected
                        ? "border-cyan-400 bg-cyan-950/30 text-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                        : isClaimed
                        ? "border-emerald-500 bg-emerald-950/10 text-emerald-400 hover:border-emerald-400"
                        : "border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                    
                    {/* Level Number indicators (e.g. 1-1, 1-2) */}
                    <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 font-bold whitespace-nowrap">
                      LVL 1-{idx + 1}
                    </span>

                    {/* Checkmark stamp for claimed */}
                    {isClaimed && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 rounded-full p-0.5 shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3px]" />
                      </div>
                    )}
                  </button>

                  <div className="text-center mt-3 max-w-[120px]">
                    <span className="font-orbitron text-xs font-bold block text-slate-200 truncate">
                      {milestone.title}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 block">
                      {milestone.year}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Chronicle Viewport */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Chronicle Content */}
          <motion.div 
            key={selectedMilestone.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-8 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative flex flex-col justify-between"
          >
            {/* Corner Bracket Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-700" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-700" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-700" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-700" />

            <div>
              {/* Year & Category */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-bold">
                  YEAR {selectedMilestone.year}
                </span>
                <span className="font-mono text-xs text-slate-500">•</span>
                <span className="font-orbitron text-xs text-yellow-500 font-bold tracking-wider uppercase">
                  {selectedMilestone.category} CHRONICLE
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-orbitron text-xl sm:text-2xl font-black text-white leading-tight mb-1">
                {selectedMilestone.title}
              </h3>
              <p className="font-mono text-xs text-slate-400 tracking-wide mb-4 uppercase">
                {selectedMilestone.subtitle}
              </p>

              {/* Lore Description */}
              <p className="text-slate-300 font-sans text-sm leading-relaxed mb-6 border-l-2 border-cyan-500/30 pl-4">
                {selectedMilestone.description}
              </p>

              {/* Completed Quests List */}
              <div className="space-y-2.5">
                <h4 className="font-orbitron text-xs font-bold text-slate-400 tracking-wider uppercase">
                  LEVEL OBJECTIVES COMPLETED
                </h4>
                <ul className="space-y-2">
                  {selectedMilestone.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs font-sans text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reward claim panel */}
            <div className="mt-8 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Award className="w-4.5 h-4.5 text-yellow-500" />
                <span>EXP REWARD FOR SECURING ARCHIVE:</span>
                <strong className="text-yellow-500 font-bold">+{selectedMilestone.xpReward} XP</strong>
              </div>

              {stats.completedQuests.includes(`milestone_${selectedMilestone.id}`) ? (
                <div className="flex items-center gap-1.5 bg-emerald-950/20 border border-emerald-800/60 px-4 py-2 rounded-xl text-emerald-400 font-mono text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>CHRONICLE ARCHIVE SECURED</span>
                </div>
              ) : (
                <button
                  onClick={() => handleClaimXp(selectedMilestone)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-orbitron font-bold text-xs px-5 py-2.5 rounded-xl hover:scale-[1.03] transition-all duration-200 cursor-pointer clickable overflow-hidden"
                >
                  <span>SECURE CHRONICLE (+{selectedMilestone.xpReward} XP)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Side Info Box: Level Codex / Tutorial */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex-1">
              <span className="font-orbitron text-xs text-yellow-500 font-bold block mb-3">CHRONO CODEX</span>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Scanning chronicle archives feeds direct experience points (XP) to your main player character.
              </p>
              <div className="space-y-3.5 mt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-cyan-400 font-bold shrink-0 font-mono">
                    A
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Earn XP to unlock access to complex nodes in the level 2 Skill Tree.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] text-cyan-400 font-bold shrink-0 font-mono">
                    B
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Chronicle scanning triggers milestone checks that award unique profile badges in the achievement log.
                  </p>
                </div>
              </div>
            </div>

            {/* Small XP Progression Widget */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-center">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-2">TIMELINE SECURED RATIO</span>
              <div className="flex items-center justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Archives Cleared</span>
                <span className="font-bold text-white">
                  {timelineMilestones.filter(m => stats.completedQuests.includes(`milestone_${m.id}`)).length} / {timelineMilestones.length}
                </span>
              </div>
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 rounded-full transition-all duration-300" 
                  style={{
                    width: `${(timelineMilestones.filter(m => stats.completedQuests.includes(`milestone_${m.id}`)).length / timelineMilestones.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
