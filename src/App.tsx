import { useState, useEffect } from "react";
import { GameScene, PlayerStats, SkillNode, Achievement } from "./types";
import { sound } from "./utils/audio";
import { 
  initialSkills, 
  initialAchievements, 
  timelineMilestones, 
  projectWorlds 
} from "./data/portfolioData";

import GameHUD from "./components/GameHUD";
import CustomCursor from "./components/CustomCursor";
import SceneIntro from "./components/SceneIntro";
import SceneOrigin from "./components/SceneOrigin";
import SceneSkills from "./components/SceneSkills";
import SceneProjects from "./components/SceneProjects";
import SceneAchievements from "./components/SceneAchievements";
import SceneContact from "./components/SceneContact";
import SceneClients from "./components/SceneClients";

// Helper to calculate Level based on LIFETIME cumulative XP (prevents level-down when spending XP)
const getLevelDetails = (lifetimeXp: number) => {
  if (lifetimeXp < 300) {
    return { level: 1, minXp: 0, maxXp: 300 };
  } else if (lifetimeXp < 750) {
    return { level: 2, minXp: 300, maxXp: 750 };
  } else if (lifetimeXp < 1400) {
    return { level: 3, minXp: 750, maxXp: 1400 };
  } else if (lifetimeXp < 2200) {
    return { level: 4, minXp: 1400, maxXp: 2200 };
  } else {
    return { level: 5, minXp: 2200, maxXp: 4000 }; // Level 5 max
  }
};

const DEFAULT_STATS: PlayerStats = {
  level: 1,
  xp: 0, // current spendable XP
  maxXp: 300, // XP needed for next level (relative to level progress)
  completedQuests: [],
  unlockedSkills: [
    "s_html", "s_css", "s_tailwind", "s_bootstrap", "s_react", "s_typescript", "s_vue", "s_angular", "s_react_native", "s_web_design",
    "s_js", "s_php", "s_laravel", "s_nextjs", "s_express", "s_python", "s_django", "s_sql", "s_mysql", "s_supabase", "s_cpp",
    "s_google_api", "s_gemini_api", "s_chatgpt_api", "s_zoom_api",
    "s_aws", "s_hetzner", "s_git",
    "s_comms_tech_writing", "s_comms_community",
    "s_lang_english", "s_lang_tagalog", "s_lang_chavacano"
  ], // Pre-unlocked skills matching portfolio competencies
  viewedProjects: [],
  unlockedBadges: [],
  score: 100
};

export default function App() {
  const [activeScene, setActiveScene] = useState<GameScene>(GameScene.INTRO);
  const [soundEnabled, setSoundEnabled] = useState(false);
  
  // Game state
  const [stats, setStats] = useState<PlayerStats>(DEFAULT_STATS);
  const [skills, setSkills] = useState<SkillNode[]>(initialSkills);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [lifetimeXp, setLifetimeXp] = useState(0);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem("game_portfolio_stats_v1");
    const savedSkills = localStorage.getItem("game_portfolio_skills_v1");
    const savedAchievements = localStorage.getItem("game_portfolio_achievements_v1");
    const savedLifetime = localStorage.getItem("game_portfolio_lifetime_v1");

    if (savedStats && savedSkills && savedAchievements && savedLifetime) {
      try {
        setStats(JSON.parse(savedStats));
        setSkills(JSON.parse(savedSkills));
        setAchievements(JSON.parse(savedAchievements));
        setLifetimeXp(Number(savedLifetime));
      } catch (e) {
        console.error("Failed to parse saved game state:", e);
      }
    }
  }, []);

  // Prevent Right-Click, F12, Ctrl+Shift+I/J/C, Copy/Cut actions to secure the portfolio text context
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (keyCode 123)
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return;
      }

      // Detect Platform Meta keys
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const metaKey = isMac ? e.metaKey : e.ctrlKey;

      // Disable Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Inspect elements)
      if (e.shiftKey && metaKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
        return;
      }

      // Disable Ctrl+U (View Source) or Ctrl+S (Save Page)
      if (metaKey && (e.key === "U" || e.key === "u" || e.key === "S" || e.key === "s" || e.key === "C" || e.key === "c")) {
        e.preventDefault();
        return;
      }
    };

    const handleCopyCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu as any);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("copy", handleCopyCut as any);
    window.addEventListener("cut", handleCopyCut as any);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu as any);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("copy", handleCopyCut as any);
      window.removeEventListener("cut", handleCopyCut as any);
    };
  }, []);

  // Save state to localStorage whenever it updates
  useEffect(() => {
    if (stats.completedQuests.length > 0 || stats.xp > 0 || stats.score > 100) {
      localStorage.setItem("game_portfolio_stats_v1", JSON.stringify(stats));
      localStorage.setItem("game_portfolio_skills_v1", JSON.stringify(skills));
      localStorage.setItem("game_portfolio_achievements_v1", JSON.stringify(achievements));
      localStorage.setItem("game_portfolio_lifetime_v1", String(lifetimeXp));
    }
  }, [stats, skills, achievements, lifetimeXp]);

  // Synchronize sound manager on user settings toggle
  useEffect(() => {
    sound.toggle(soundEnabled);
  }, [soundEnabled]);

  // Internal helper to add XP, award score, and check for Level Ups
  const grantReward = (xpAmt: number, scoreAmt: number, questId?: string) => {
    if (questId && stats.completedQuests.includes(questId)) return;

    setStats((prev) => {
      const nextXp = prev.xp + xpAmt;
      const nextLifetimeXp = lifetimeXp + xpAmt;
      setLifetimeXp(nextLifetimeXp);

      const levelDetails = getLevelDetails(nextLifetimeXp);
      const isLevelUp = levelDetails.level > prev.level;

      if (isLevelUp) {
        // Trigger Level Up audio cue asynchronously
        setTimeout(() => sound.levelUp(), 100);
      }

      return {
        ...prev,
        xp: nextXp,
        level: levelDetails.level,
        maxXp: levelDetails.maxXp - levelDetails.minXp, // HUD displays remaining
        score: prev.score + scoreAmt,
        completedQuests: questId ? [...prev.completedQuests, questId] : prev.completedQuests
      };
    });
  };

  // 1. Scene Start Action (Intro Spawn Completed)
  const handleStartJourney = (nextScene: GameScene) => {
    setActiveScene(nextScene);
    
    // Unlock First Spawn Badge if not yet completed
    if (!stats.completedQuests.includes("quest_spawn")) {
      setTimeout(() => {
        unlockAchievement("ach_spawn");
        grantReward(100, 150, "quest_spawn");
      }, 500);
    }
  };

  // 2. Claim Origin Milestone Archive
  const handleClaimMilestone = (id: string, xpReward: number) => {
    const questId = `milestone_${id}`;
    grantReward(xpReward, 100, questId);
    sound.questComplete();

    // Check if ALL milestones are unlocked
    setTimeout(() => {
      setStats((prev) => {
        const milestonesClaimed = timelineMilestones.every((m) => 
          prev.completedQuests.includes(`milestone_${m.id}`) || m.id === id
        );

        if (milestonesClaimed && !prev.completedQuests.includes("quest_historian")) {
          setTimeout(() => {
            unlockAchievement("ach_milestones");
            grantReward(150, 200, "quest_historian");
          }, 300);
        }
        return prev;
      });
    }, 100);
  };

  // 3. Unlock Skill Node
  const handleUnlockSkill = (skillId: string, xpCost: number) => {
    setSkills((prevSkills) => 
      prevSkills.map((s) => {
        if (s.id === skillId) {
          return { ...s, level: s.level + 1, unlocked: true };
        }
        return s;
      })
    );

    setStats((prev) => {
      const nextSpendableXp = Math.max(0, prev.xp - xpCost);
      const updatedUnlockedSkills = prev.unlockedSkills.includes(skillId) 
        ? prev.unlockedSkills 
        : [...prev.unlockedSkills, skillId];

      sound.nodeUnlock();

      // Check for Achievements
      setTimeout(() => {
        // Achievement A: First Skill Node Unlock
        if (!prev.completedQuests.includes("quest_first_skill")) {
          unlockAchievement("ach_skill_unlocked");
          grantReward(100, 100, "quest_first_skill");
        }

        // Achievement B: Unlock 5+ Skills
        const totalUnlockedCount = updatedUnlockedSkills.length;
        if (totalUnlockedCount >= 5 && !prev.completedQuests.includes("quest_skills_mastered")) {
          unlockAchievement("ach_skills_mastered");
          grantReward(200, 300, "quest_skills_mastered");
        }
      }, 100);

      return {
        ...prev,
        xp: nextSpendableXp,
        unlockedSkills: updatedUnlockedSkills,
        score: prev.score + 50
      };
    });
  };

  // 4. Explore Project World
  const handleExploreProject = (id: string) => {
    setStats((prev) => {
      if (prev.viewedProjects.includes(id)) return prev;

      const nextViewed = [...prev.viewedProjects, id];
      
      // If all 3 projects viewed, unlock award
      if (nextViewed.length === 3 && !prev.completedQuests.includes("quest_explore_all_worlds")) {
        setTimeout(() => {
          unlockAchievement("ach_worlds");
          grantReward(200, 250, "quest_explore_all_worlds");
        }, 500);
      }

      return {
        ...prev,
        viewedProjects: nextViewed
      };
    });
  };

  // 5. Claim World XP
  const handleClaimProjectXp = (id: string, xpReward: number) => {
    const claimId = `project_claim_${id}`;
    grantReward(xpReward, 150, claimId);
    sound.questComplete();
  };

  // 6. Transmit Message Portal
  const handleSendMessage = () => {
    if (!stats.completedQuests.includes("contact_message")) {
      setTimeout(() => {
        unlockAchievement("ach_contact");
        grantReward(150, 200, "contact_message");
      }, 500);
    }
  };

  // Generic Achievement Unlocker
  const unlockAchievement = (id: string) => {
    setAchievements((prev) => 
      prev.map((ach) => {
        if (ach.id === id && !ach.isUnlocked) {
          setTimeout(() => sound.achievement(), 50);
          return { ...ach, isUnlocked: true, unlockedAt: new Date().toLocaleDateString() };
        }
        return ach;
      })
    );
  };

  // Reset journey state back to standard levels
  const handleReset = () => {
    localStorage.removeItem("game_portfolio_stats_v1");
    localStorage.removeItem("game_portfolio_skills_v1");
    localStorage.removeItem("game_portfolio_achievements_v1");
    localStorage.removeItem("game_portfolio_lifetime_v1");

    setStats(DEFAULT_STATS);
    setSkills(initialSkills);
    setAchievements(initialAchievements);
    setLifetimeXp(0);
    setActiveScene(GameScene.INTRO);
  };

  // Dynamic Scene Router
  const renderScene = () => {
    switch (activeScene) {
      case GameScene.INTRO:
        return <SceneIntro onStart={handleStartJourney} />;
      case GameScene.ORIGIN:
        return <SceneOrigin stats={stats} onClaimMilestone={handleClaimMilestone} />;
      case GameScene.SKILLS:
        return <SceneSkills stats={stats} skills={skills} onUnlockSkill={handleUnlockSkill} />;
      case GameScene.PROJECTS:
        return <SceneProjects stats={stats} onExploreProject={handleExploreProject} onClaimProjectXp={handleClaimProjectXp} />;
      case GameScene.CLIENTS:
        return <SceneClients onStartConsultation={setActiveScene} />;
      case GameScene.ACHIEVEMENTS:
        return <SceneAchievements stats={stats} achievements={achievements} />;
      case GameScene.CONTACT:
        return <SceneContact onSendMessage={handleSendMessage} />;
      default:
        return <SceneIntro onStart={handleStartJourney} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Cursor */}
      <CustomCursor />

      {/* Main Game Head-up Display */}
      <GameHUD 
        activeScene={activeScene}
        setActiveScene={setActiveScene}
        stats={{
          ...stats,
          // compute current level relative XP boundaries for HUD
          xp: stats.xp,
          maxXp: stats.xp >= 2200 ? 1000 : (getLevelDetails(lifetimeXp).maxXp - getLevelDetails(lifetimeXp).minXp)
        }}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onReset={handleReset}
      />

      {/* Active Game Stage Viewport with slide/fade container */}
      <main className="w-full">
        {renderScene()}
      </main>

      {/* Subtle Bottom Ambient copyright */}
      <footer className="absolute bottom-20 left-0 right-0 py-4 text-center pointer-events-none select-none z-10">
        <span className="font-mono text-[9px] text-slate-600 tracking-widest uppercase">
          © 2026 June Orias • Built in High Fidelity Static Core
        </span>
      </footer>
    </div>
  );
}
