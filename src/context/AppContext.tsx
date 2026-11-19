import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ChildProfile,
  SubjectCategory,
  SubjectStats,
  ParentSettings,
  AchievementBadge,
  AvatarAccessory,
  QuestResult,
  LastActivity,
  ProfileProgress,
} from '../types';
import {
  INITIAL_PROFILES,
  INITIAL_PROFILES_PROGRESS,
  ACCESSORIES,
  INITIAL_ACHIEVEMENTS,
  createEmptyProfileProgress,
} from '../constants/theme';
import { soundEffects } from '../utils/audio';
import { fireCelebrationConfetti } from '../utils/confetti';
import { getStoredItem, setStoredItem } from '../utils/storage';

const STORAGE_VERSION_KEY = 'pp_storage_version';
const CURRENT_STORAGE_VERSION = 'prod_clean_v1';

function ensureCleanStorageVersion(): void {
  if (typeof window === 'undefined') return;
  try {
    if (localStorage.getItem(STORAGE_VERSION_KEY) !== CURRENT_STORAGE_VERSION) {
      localStorage.removeItem('pp_profiles');
      localStorage.removeItem('pp_active_profile');
      localStorage.removeItem('pp_profiles_progress');
      localStorage.removeItem('pp_accessories');
      localStorage.removeItem('pp_achievements');
      localStorage.removeItem('pp_settings');
      localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_STORAGE_VERSION);
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
}

interface AppContextType {
  // Profiles
  profiles: ChildProfile[];
  currentProfile: ChildProfile;
  switchProfile: (profileId: string) => void;
  updateProfileName: (name: string, age: number) => void;
  updateProfile: (profileId: string, updates: Partial<ChildProfile>) => void;
  equipAccessory: (accessoryId: string) => void;

  // Profile Edit Modal State
  editingProfile: ChildProfile | null;
  openEditProfile: (profile: ChildProfile) => void;
  closeEditProfile: () => void;

  // Currencies & Streaks (Active Child)
  stars: number;
  streakDays: number;
  dailyGoalCompleted: number;
  dailyGoalTarget: number;

  // Subject Stats & Last Activity (Active Child)
  subjectStats: Record<SubjectCategory, SubjectStats>;
  lastActivity?: LastActivity;
  completeQuest: (
    subject: SubjectCategory,
    score: number,
    maxScore: number,
    starsEarned: number,
    timeSpentSec: number
  ) => void;

  // Multi-profile Progress Store & Helpers
  profilesProgress: Record<string, ProfileProgress>;
  getProfileStars: (profileId: string) => number;
  getProfileLastActivity: (profileId: string) => LastActivity | undefined;

  // Quests history (Active Child)
  questHistory: QuestResult[];

  // Shop & Achievements
  accessories: AvatarAccessory[];
  achievements: AchievementBadge[];
  buyAccessory: (accessoryId: string) => boolean;

  // Settings & Sound
  settings: ParentSettings;
  updateSettings: (newSettings: Partial<ParentSettings>) => void;
  toggleSound: () => void;

  // Navigation
  currentView: 'adventure' | 'quest' | 'parent-portal' | 'trophy';
  navigateTo: (view: 'adventure' | 'quest' | 'parent-portal' | 'trophy') => void;
  activeSubject: SubjectCategory | null;
  startQuest: (subject: SubjectCategory) => void;
  quitQuest: () => void;

  // Daily Spark state
  isDailySparkOpen: boolean;
  openDailySpark: () => void;
  closeDailySpark: () => void;

  // Parent gate
  isParentGateOpen: boolean;
  openParentGate: () => void;
  closeParentGate: () => void;
  unlockParentPortal: () => void;

  // Reset all test/progress data to zero
  resetAllProgress: () => void;
}

const DEFAULT_SETTINGS: ParentSettings = {
  dailyQuestGoal: 4,
  screenTimeLimitMinutes: 30,
  soundEffectsEnabled: true,
  musicEnabled: true,
  difficultyPreference: 'adaptive',
  languageMode: 'es',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  ensureCleanStorageVersion();

  // Profiles list - strictly 2 profiles for use by two children
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => {
    const raw = getStoredItem<ChildProfile[]>('pp_profiles', INITIAL_PROFILES);
    if (!Array.isArray(raw) || raw.length === 0) {
      return INITIAL_PROFILES;
    }
    // Ensure strictly 2 profiles
    if (raw.length > 2) {
      return raw.slice(0, 2);
    }
    if (raw.length === 1) {
      return [raw[0], INITIAL_PROFILES[1]];
    }
    return raw;
  });

  const [currentProfileId, setCurrentProfileId] = useState<string>(() => {
    const stored = getStoredItem<string>('pp_active_profile', 'leo');
    return stored === 'luna' ? 'luna' : 'leo';
  });

  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);

  // Independent progress per child profile (Stats, Stars, Streak, History, Last Activity)
  const [profilesProgress, setProfilesProgress] = useState<Record<string, ProfileProgress>>(() =>
    getStoredItem('pp_profiles_progress', INITIAL_PROFILES_PROGRESS)
  );

  // Active child's progress record
  const currentProgress: ProfileProgress =
    profilesProgress[currentProfileId] ||
    INITIAL_PROFILES_PROGRESS[currentProfileId] ||
    INITIAL_PROFILES_PROGRESS.leo;

  // Primary source of truth for the active child's 4 subject disciplines
  const subjectStats = currentProgress.subjectStats;

  // Total stars: Guaranteed to equal the exact sum of stars earned across all 4 subjects for the active child
  const stars: number = (Object.values(subjectStats) as SubjectStats[]).reduce(
    (sum, s) => sum + s.starsEarned,
    0
  );

  // Active child's streak, daily goal, history and last activity
  const streakDays = currentProgress.streakDays;
  const dailyGoalCompleted = currentProgress.dailyGoalCompleted;
  const questHistory = currentProgress.questHistory || [];
  const lastActivity = currentProgress.lastActivity;

  // Shop & Global Achievements
  const [accessories, setAccessories] = useState<AvatarAccessory[]>(() =>
    getStoredItem('pp_accessories', ACCESSORIES)
  );

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() =>
    getStoredItem('pp_achievements', INITIAL_ACHIEVEMENTS)
  );

  // Settings
  const [settings, setSettings] = useState<ParentSettings>(() =>
    getStoredItem('pp_settings', DEFAULT_SETTINGS)
  );

  // Navigation
  const [currentView, setCurrentView] = useState<'adventure' | 'quest' | 'parent-portal' | 'trophy'>('adventure');
  const [activeSubject, setActiveSubject] = useState<SubjectCategory | null>(null);
  const [isDailySparkOpen, setIsDailySparkOpen] = useState(false);
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    setStoredItem('pp_profiles', profiles);
    setStoredItem('pp_active_profile', currentProfileId);
    setStoredItem('pp_profiles_progress', profilesProgress);
    setStoredItem('pp_accessories', accessories);
    setStoredItem('pp_achievements', achievements);
    setStoredItem('pp_settings', settings);
  }, [profiles, currentProfileId, profilesProgress, accessories, achievements, settings]);

  const currentProfile = profiles.find((p) => p.id === currentProfileId) || profiles[0];

  // Helper getters for any profile
  const getProfileStars = (profileId: string): number => {
    const prog = profilesProgress[profileId] || INITIAL_PROFILES_PROGRESS[profileId];
    if (!prog || !prog.subjectStats) return 0;
    return (Object.values(prog.subjectStats) as SubjectStats[]).reduce(
      (sum, s) => sum + s.starsEarned,
      0
    );
  };

  const getProfileLastActivity = (profileId: string): LastActivity | undefined => {
    const prog = profilesProgress[profileId] || INITIAL_PROFILES_PROGRESS[profileId];
    return prog?.lastActivity;
  };

  const switchProfile = (profileId: string) => {
    setCurrentProfileId(profileId);
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const updateProfileName = (name: string, age: number) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === currentProfileId ? { ...p, name, age } : p))
    );
  };

  const updateProfile = (profileId: string, updates: Partial<ChildProfile>) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === profileId ? { ...p, ...updates } : p))
    );
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const openEditProfile = (profile: ChildProfile) => {
    setEditingProfile(profile);
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const closeEditProfile = () => {
    setEditingProfile(null);
  };

  const equipAccessory = (accessoryId: string) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === currentProfileId
          ? { ...p, accessoryId: p.accessoryId === accessoryId ? undefined : accessoryId }
          : p
      )
    );
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const buyAccessory = (accessoryId: string): boolean => {
    const item = accessories.find((a) => a.id === accessoryId);
    if (!item || item.unlocked || stars < item.price) {
      soundEffects.playSoftBoop(settings.soundEffectsEnabled);
      return false;
    }

    // Unlocks as milestone achievement; does not deduct the child's educational stars
    setAccessories((prev) =>
      prev.map((a) => (a.id === accessoryId ? { ...a, unlocked: true } : a))
    );
    soundEffects.playCorrect(settings.soundEffectsEnabled);
    fireCelebrationConfetti();
    return true;
  };

  const completeQuest = (
    subject: SubjectCategory,
    score: number,
    maxScore: number,
    starsEarned: number,
    timeSpentSec: number
  ) => {
    const now = new Date();
    const timeString = `Hoy, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setProfilesProgress((prev) => {
      const childProg = prev[currentProfileId] || INITIAL_PROFILES_PROGRESS[currentProfileId] || INITIAL_PROFILES_PROGRESS.leo;
      const currentStats = childProg.subjectStats[subject];
      const newQuestsCount = currentStats.questsCompleted + 1;
      const currentAcc = (score / maxScore) * 100;
      const smoothedAcc = Math.round((currentStats.accuracy * currentStats.questsCompleted + currentAcc) / newQuestsCount);
      const newMinutes = currentStats.minutesSpent + Math.max(1, Math.round(timeSpentSec / 60));
      const newLevel = Math.min(5, Math.floor(newQuestsCount / 3) + 1);

      const updatedSubjectStats = {
        ...childProg.subjectStats,
        [subject]: {
          level: newLevel,
          questsCompleted: newQuestsCount,
          accuracy: smoothedAcc,
          starsEarned: currentStats.starsEarned + starsEarned,
          minutesSpent: newMinutes,
        },
      };

      const subjectNames: Record<SubjectCategory, string> = {
        math: 'Matemáticas',
        language: 'Palabras & Fonética',
        memory: 'Reino de Memoria',
        logic: 'Lógica Detective',
      };

      const newLastActivity: LastActivity = {
        subject,
        title: `${subjectNames[subject]} (Nivel ${newLevel})`,
        starsEarned,
        score,
        maxScore,
        date: timeString,
      };

      const newHistoryItem: QuestResult = {
        id: `qh-${Date.now()}`,
        subject,
        title: `${subjectNames[subject]} (Nivel ${newLevel})`,
        score,
        maxScore,
        starsEarned,
        timeSpentSeconds: timeSpentSec,
        date: timeString,
      };

      const newStreakDays = Math.max(1, childProg.streakDays);

      return {
        ...prev,
        [currentProfileId]: {
          subjectStats: updatedSubjectStats,
          streakDays: newStreakDays,
          dailyGoalCompleted: Math.min(childProg.dailyGoalCompleted + 1, settings.dailyQuestGoal + 2),
          questHistory: [newHistoryItem, ...(childProg.questHistory || []).slice(0, 19)],
          lastActivity: newLastActivity,
        },
      };
    });

    // Update global achievements
    const currentTotalStars = stars + starsEarned;
    const nextStreak = Math.max(1, streakDays);

    setAchievements((prev) =>
      prev.map((ach) => {
        if (ach.unlocked) return ach;

        let nextCount = ach.currentCount;
        if (ach.category === subject) {
          nextCount = ach.currentCount + 1;
        } else if (ach.id === 'super-star-banker') {
          nextCount = Math.max(ach.currentCount, currentTotalStars);
        } else if (ach.id === 'streak-fire') {
          nextCount = Math.max(ach.currentCount, nextStreak);
        } else {
          return ach;
        }

        const isNowUnlocked = nextCount >= ach.requiredCount;
        return {
          ...ach,
          currentCount: nextCount,
          unlocked: isNowUnlocked,
          unlockedAt: isNowUnlocked ? new Date().toISOString().split('T')[0] : undefined,
        };
      })
    );
  };

  const resetAllProgress = () => {
    setProfiles((prev) =>
      prev.map((p) => {
        const { accessoryId: _removed, ...rest } = p;
        return rest;
      })
    );
    setProfilesProgress({
      leo: createEmptyProfileProgress(),
      luna: createEmptyProfileProgress(),
    });
    setAccessories(ACCESSORIES.map((a) => ({ ...a, unlocked: false })));
    setAchievements(INITIAL_ACHIEVEMENTS.map((ach) => ({ ...ach, currentCount: 0, unlocked: false, unlockedAt: undefined })));
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const updateSettings = (newSettings: Partial<ParentSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const toggleSound = () => {
    setSettings((prev) => {
      const next = !prev.soundEffectsEnabled;
      if (next) soundEffects.playPop(true);
      return { ...prev, soundEffectsEnabled: next };
    });
  };

  const navigateTo = (view: 'adventure' | 'quest' | 'parent-portal' | 'trophy') => {
    soundEffects.playPop(settings.soundEffectsEnabled);
    setCurrentView(view);
  };

  const startQuest = (subject: SubjectCategory) => {
    setActiveSubject(subject);
    setCurrentView('quest');
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const quitQuest = () => {
    setActiveSubject(null);
    setCurrentView('adventure');
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const openDailySpark = () => {
    setIsDailySparkOpen(true);
    soundEffects.playStar(settings.soundEffectsEnabled);
  };

  const closeDailySpark = () => {
    setIsDailySparkOpen(false);
  };

  const openParentGate = () => {
    setIsParentGateOpen(true);
    soundEffects.playPop(settings.soundEffectsEnabled);
  };

  const closeParentGate = () => {
    setIsParentGateOpen(false);
  };

  const unlockParentPortal = () => {
    setIsParentGateOpen(false);
    setCurrentView('parent-portal');
    soundEffects.playCorrect(settings.soundEffectsEnabled);
  };

  return (
    <AppContext.Provider
      value={{
        profiles,
        currentProfile,
        switchProfile,
        updateProfileName,
        updateProfile,
        equipAccessory,
        editingProfile,
        openEditProfile,
        closeEditProfile,
        stars,
        streakDays,
        dailyGoalCompleted,
        dailyGoalTarget: settings.dailyQuestGoal,
        subjectStats,
        lastActivity,
        completeQuest,
        profilesProgress,
        getProfileStars,
        getProfileLastActivity,
        questHistory,
        accessories,
        achievements,
        buyAccessory,
        settings,
        updateSettings,
        toggleSound,
        currentView,
        navigateTo,
        activeSubject,
        startQuest,
        quitQuest,
        isDailySparkOpen,
        openDailySpark,
        closeDailySpark,
        isParentGateOpen,
        openParentGate,
        closeParentGate,
        unlockParentPortal,
        resetAllProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
