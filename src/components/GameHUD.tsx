import { GameScene, PlayerStats } from "../types";
import { sound } from "../utils/audio";
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  BookOpen, 
  Award, 
  Send, 
  Volume2, 
  VolumeX, 
  RefreshCw,
  Trophy,
  Briefcase
} from "lucide-react";

interface GameHUDProps {
  activeScene: GameScene;
  setActiveScene: (scene: GameScene) => void;
  stats: PlayerStats;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onReset: () => void;
}

export default function GameHUD({
  activeScene,
  setActiveScene,
  stats,
  soundEnabled,
  setSoundEnabled,
  onReset
}: GameHUDProps) {
  
  const xpPercentage = Math.min(100, Math.floor((stats.xp / stats.maxXp) * 100));

  const handleNavClick = (scene: GameScene) => {
    sound.click();
    setActiveScene(scene);
  };

  const toggleSound = () => {
    const nextState = sound.toggle();
    setSoundEnabled(nextState);
    if (nextState) {
      sound.click();
    }
  };

  // Determine current main quest based on state
  const getCurrentQuest = () => {
    if (activeScene === GameScene.INTRO) {
      return "Unlock Level 1 (Career Timeline) to explore career milestones.";
    }
    if (stats.unlockedSkills.length === 0) {
      return "Unlock your first capability node in the Skills Zone tree!";
    }
    if (stats.viewedProjects.length < 3) {
      return `Scout all project worlds in level 3! (Explored: ${stats.viewedProjects.length}/3)`;
    }
    if (!stats.completedQuests.includes("contact_message")) {
      return "Access the final Contact Portal level to submit an encryption ping.";
    }
    return "Legend status achieved! Explore the skills tree and maximize your levels.";
  };

  const navItems = [
    { scene: GameScene.INTRO, label: "Spawn Point", icon: MapPin, num: 0 },
    { scene: GameScene.ORIGIN, label: "Origin Story", icon: BookOpen, num: 1 },
    { scene: GameScene.SKILLS, label: "Skill Tree", icon: Sparkles, num: 2 },
    { scene: GameScene.PROJECTS, label: "Project Levels", icon: Compass, num: 3 },
    { scene: GameScene.CLIENTS, label: "Client Hub", icon: Briefcase, num: 4 },
    { scene: GameScene.ACHIEVEMENTS, label: "Achievements", icon: Award, num: 5 },
    { scene: GameScene.CONTACT, label: "Contact Portal", icon: Send, num: 6 }
  ];

  return (
    <div id="game-hud" className="relative z-40 select-none">
      {/* Top HUD Panel */}
      <div className="fixed top-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950/70 border border-slate-800 backdrop-blur-md rounded-xl p-4 shadow-xl pointer-events-auto">
          {/* Player Identity */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-lg border border-cyan-500/50 bg-slate-900 overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <span className="font-orbitron font-bold text-xl text-cyan-400">P1</span>
              <div className="absolute inset-0 border border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin duration-3000" />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron text-sm tracking-wider text-slate-400 font-bold">HERO IDENTITY</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-400 font-semibold animate-pulse">
                  ACTIVE
                </span>
              </div>
              <h1 className="font-orbitron text-lg font-bold text-white tracking-wide">JUNE REY ORIAS</h1>
            </div>
          </div>

          {/* Player RPG Stats (Level & XP) */}
          <div className="flex-1 md:max-w-md w-full">
            <div className="flex justify-between items-end mb-1 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-orbitron font-bold">LVL {stats.level}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400 font-semibold">XP: {stats.xp} / {stats.maxXp}</span>
              </div>
              <span className="text-cyan-400 font-bold">{xpPercentage}%</span>
            </div>
            
            {/* Experience Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full border border-slate-800 overflow-hidden p-[2px]">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          {/* Quick HUD Controls */}
          <div className="flex items-center gap-2 justify-end">
            {/* Score Display */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-yellow-500/30 bg-yellow-950/10 text-yellow-500 font-mono text-sm font-semibold">
              <Trophy className="w-4 h-4" />
              <span>{stats.score} PTS</span>
            </div>

            {/* Sound Control */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                soundEnabled 
                  ? "border-cyan-500/50 bg-cyan-950/20 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]" 
                  : "border-slate-800 bg-slate-900/40 text-slate-500 hover:text-slate-400"
              }`}
              title={soundEnabled ? "Mute audio synthesizer" : "Unmute audio synthesizer"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Restart Progress */}
            <button
              onClick={() => {
                sound.error();
                if (confirm("Are you sure you want to reset your level progress, achievements, and unlocked skills?")) {
                  onReset();
                }
              }}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
              title="Reset level progression"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Chapters Dock (Bottom center) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col gap-2.5 bg-slate-950/80 border border-slate-800 backdrop-blur-md rounded-xl p-3 shadow-2xl pointer-events-auto">
          {/* Active Quest Indicator */}
          <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2 px-1 text-xs font-mono">
            <span className="text-yellow-500 font-bold uppercase tracking-wider">Active Quest:</span>
            <span className="text-slate-300 font-medium tracking-wide animate-pulse">{getCurrentQuest()}</span>
          </div>

          {/* Stage selector buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeScene === item.scene;
              return (
                <button
                  key={item.scene}
                  onClick={() => handleNavClick(item.scene)}
                  className={`group relative flex flex-col items-center justify-center p-2 rounded-lg border font-mono transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? "border-cyan-400/80 bg-gradient-to-b from-cyan-950/30 to-slate-950 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                      : "border-slate-800 bg-slate-900/30 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-1.5 rounded-br border-t border-l ${isActive ? 'border-cyan-400' : 'border-transparent group-hover:border-slate-500'}`} />
                  <div className={`absolute top-0 right-0 w-1.5 h-1.5 rounded-bl border-t border-r ${isActive ? 'border-cyan-400' : 'border-transparent group-hover:border-slate-500'}`} />
                  <div className={`absolute bottom-0 left-0 w-1.5 h-1.5 rounded-tr border-b border-l ${isActive ? 'border-cyan-400' : 'border-transparent group-hover:border-slate-500'}`} />
                  <div className={`absolute bottom-0 right-0 w-1.5 h-1.5 rounded-tl border-b border-r ${isActive ? 'border-cyan-400' : 'border-transparent group-hover:border-slate-500'}`} />
                  
                  <Icon className={`w-4 h-4 mb-1 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="text-[10px] text-center font-bold tracking-wider leading-none">
                    {item.label}
                  </span>
                  <span className="absolute bottom-1 right-1 text-[8px] opacity-40 leading-none">
                    Lvl {item.num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
