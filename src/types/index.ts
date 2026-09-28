export type ThemeMode = 'sepia' | 'light' | 'dark';
export type FontFamily = 'serif' | 'sans';
export type FontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';
export type LineHeight = 'normal' | 'relaxed' | 'loose';

export type StoryCategory = 
  | 'Semua'
  | 'Inspirasi'
  | 'Petualangan'
  | 'Filosofis'
  | 'Fabel & Dongeng'
  | 'Sains & Alam'
  | 'Refleksi';

export interface StoryChapter {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface ReflectionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex?: number; // optional, can be an open reflection or a fun comprehension quiz
  explanation: string;
  thoughtPrompt?: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  coverEmoji: string;
  coverGradient: string;
  category: StoryCategory;
  readingTimeMinutes: number;
  difficulty: 'Mudah' | 'Menengah' | 'Mendalam';
  summary: string;
  moralLesson?: string;
  chapters: StoryChapter[];
  reflections: ReflectionQuestion[];
}

export interface SavedQuote {
  id: string;
  text: string;
  storyId: string;
  storyTitle: string;
  author: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  streakDays: number;
  lastReadDate: string; // YYYY-MM-DD
  totalMinutesRead: number;
  totalStoriesCompleted: number;
  completedStoryIds: string[];
  currentXP: number;
  level: number;
  savedQuotes: SavedQuote[];
  badges: Badge[];
}

export type AmbientSoundType = 'off' | 'rain' | 'campfire' | 'waves' | 'cafe' | 'forest';
