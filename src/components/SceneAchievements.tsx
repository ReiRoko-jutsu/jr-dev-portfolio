import { motion } from "motion/react";
import { Achievement, PlayerStats } from "../types";
import { 
  Award, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Send, 
  Trophy, 
  CheckCircle2, 
  Lock 
} from "lucide-react";

const getBadgeIcon = (iconName: string) => {
  switch (iconName) {
    case "MapPin": return MapPin;
    case "Sparkles": return Sparkles;
    case "Award": return Award;
    case "BookOpen": return BookOpen;
    case "Compass": return Compass;
    case "Send": return Send;
    default: return Award;
  }
};

interface SceneAchievementsProps {
  stats: PlayerStats;
  achievements: Achievement[];
}

export default function SceneAchievements({ stats, achievements }: SceneAchievementsProps) {
  
  // Calculate stats
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
  const achievementProgressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="relative min-h-screen pt-28 pb-32 flex flex-col justify-center px-4 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(113,63,18,0.15),rgba(2,6,23,0.95))] z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(234,179,8,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.05)_1px,transparent_1px)] bg-[size:32px_32px] z-0 opacity-20" />

      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col gap-6">
        
        {/* Stage Header */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-950/10 mb-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-mono text-xs text-yellow-500 tracking-wider font-semibold uppercase">LEVEL 4: HALL OF MEDALS</span>
          </div>
          <h2 className="font-orbitron text-2xl md:text-3xl font-black text-white">ACHIEVEMENT METRICS</h2>
          <p className="text-slate-400 font-sans text-sm max-w-xl">
            Review unlocked badges, quest status, and career mastery levels. Complete level milestones to earn total score and secure legendary developer standing.
          </p>
        </div>

        {/* Global Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Side: Stats summary panel */}
          <div className="md:col-span-4 flex flex-col gap-4">
            
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex-1 relative">
              <div className="absolute top-4 right-4 text-yellow-500/10">
                <Trophy className="w-24 h-24 stroke-[1.5px]" />
              </div>

              <span className="font-orbitron text-xs text-yellow-500 font-bold block mb-4">HERO DOSSIER</span>

              <div className="space-y-4 font-mono">
                <div>
                  <span className="text-xs text-slate-500 block">TOTAL SCORE POINTS:</span>
                  <span className="text-2xl font-orbitron font-black text-white">{stats.score}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">PLAYER LEVEL:</span>
                  <span className="text-lg font-orbitron font-bold text-cyan-400">Level {stats.level}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">MEDALS SECURED:</span>
                  <span className="text-sm font-bold text-slate-200">{unlockedCount} / {totalCount}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">CAPABILITIES ACQUIRED:</span>
                  <span className="text-sm font-bold text-slate-200">{stats.unlockedSkills.length} Traits</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 block">EXPEDITIONS VISITED:</span>
                  <span className="text-sm font-bold text-slate-200">{stats.viewedProjects.length} Worlds</span>
                </div>
              </div>
            </div>

            {/* Micro Badge Completion Bar */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block mb-1">BADGE PROGRESS</span>
              <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                <span className="text-slate-400">Unlock Rate</span>
                <span className="font-bold text-yellow-500">{achievementProgressPercent}%</span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden p-[1px] border border-slate-800/60">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-300" 
                  style={{ width: `${achievementProgressPercent}%` }}
                />
              </div>
            </div>

          </div>

          {/* Right Side: Badges Scroll Grid */}
          <div className="md:col-span-8 bg-slate-950/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative">
            {/* Corner Bracket Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-700" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-700" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-700" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-700" />

            <span className="font-orbitron text-xs text-yellow-500 font-bold block mb-4">MEDAL LOG INDEX</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((ach) => {
                const IconComponent = getBadgeIcon(ach.badgeIcon);
                
                return (
                  <div
                    key={ach.id}
                    className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
                      ach.isUnlocked
                        ? "border-yellow-500/40 bg-yellow-950/5 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                        : "border-slate-900 bg-slate-900/10 text-slate-500"
                    }`}
                  >
                    {/* Badge Icon Slot */}
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      ach.isUnlocked
                        ? "border-yellow-400 bg-yellow-950/20 text-yellow-400 scale-105"
                        : "border-slate-800 bg-slate-900 text-slate-600"
                    }`}>
                      {ach.isUnlocked ? (
                        <IconComponent className="w-6 h-6 animate-pulse" />
                      ) : (
                        <Lock className="w-5 h-5 opacity-40" />
                      )}
                    </div>

                    {/* Badge Intel */}
                    <div className="flex flex-col justify-center min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className={`font-orbitron text-xs font-bold leading-tight truncate ${
                          ach.isUnlocked ? "text-white" : "text-slate-500"
                        }`}>
                          {ach.title}
                        </h4>
                        {ach.isUnlocked && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>

                      <p className={`font-sans text-[11px] leading-tight mb-2 ${
                        ach.isUnlocked ? "text-slate-300" : "text-slate-600"
                      }`}>
                        {ach.description}
                      </p>

                      <div className="flex items-center gap-1 font-mono text-[9px] text-slate-500 uppercase leading-none">
                        <span className="font-bold">Objective:</span>
                        <span className="truncate">{ach.criteria}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
