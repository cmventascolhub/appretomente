export type SubjectCategory = 'math' | 'language' | 'memory' | 'logic';

export interface ChildProfile {
  id: string;
  name: string;
  avatar: string;
  color: string;
  age: number;
  accessoryId?: string;
}

export interface SubjectStats {
  level: number;
  questsCompleted: number;
  accuracy: number; // percentage 0-100
  starsEarned: number;
  minutesSpent: number;
}

export interface QuestResult {
  id: string;
  subject: SubjectCategory;
  title: string;
  score: number;
  maxScore: number;
  starsEarned: number;
  timeSpentSeconds: number;
  date: string;
}

export interface LastActivity {
  subject: SubjectCategory;
  title: string;
  starsEarned: number;
  score: number;
  maxScore: number;
  date: string;
}

export interface ProfileProgress {
  subjectStats: Record<SubjectCategory, SubjectStats>;
  streakDays: number;
  dailyGoalCompleted: number;
  questHistory: QuestResult[];
  lastActivity?: LastActivity;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: SubjectCategory | 'general';
  unlocked: boolean;
  unlockedAt?: string;
  requiredCount: number;
  currentCount: number;
}

export interface AvatarAccessory {
  id: string;
  name: string;
  price: number;
  icon: string;
  type: 'hat' | 'glasses' | 'badge' | 'cape';
  unlocked: boolean;
}

export interface ParentSettings {
  dailyQuestGoal: number; // e.g. 4 quests
  screenTimeLimitMinutes: number; // e.g. 30 min
  soundEffectsEnabled: boolean;
  musicEnabled: boolean;
  difficultyPreference: 'adaptive' | 'gentle' | 'challenging';
  languageMode: 'en' | 'es' | 'bilingual';
}

export interface SubjectConfig {
  id: SubjectCategory;
  name: string;
  subtitle: string;
  color: string; // Hex matching design spec
  darkRimColor: string;
  lightBg: string;
  textColor: string;
  accentBadge: string;
  iconName: string;
  description: string;
  skillsTaught: string[];
}
