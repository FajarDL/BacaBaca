import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { UserStats, SavedQuote, ThemeMode, FontFamily, FontSize, Story } from '../types';
import { INITIAL_STORIES, INITIAL_BADGES } from '../data/stories';

const STATS_STORAGE_KEY = 'bacabaca_user_stats_v1';
const PREFS_STORAGE_KEY = 'bacabaca_user_prefs_v1';
const STORIES_STORAGE_KEY = 'bacabaca_stories_v1';

const DEFAULT_STATS: UserStats = {
  streakDays: 1,
  lastReadDate: new Date().toISOString().split('T')[0],
  totalMinutesRead: 0,
  totalStoriesCompleted: 0,
  completedStoryIds: [],
  currentXP: 50,
  level: 1,
  savedQuotes: [],
  badges: INITIAL_BADGES
};

interface UserPreferences {
  theme: ThemeMode;
  fontFamily: FontFamily;
  fontSize: FontSize;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'sepia',
  fontFamily: 'serif',
  fontSize: 'lg'
};

export function useReadingStorage() {
  // Stories State with LocalStorage persistence
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const stored = localStorage.getItem(STORIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge missing initial stories (e.g. newly added RevoU summaries)
          const existingIds = new Set(parsed.map((s: Story) => s.id));
          const missingDefaults = INITIAL_STORIES.filter(s => !existingIds.has(s.id));
          if (missingDefaults.length > 0) {
            return [...missingDefaults, ...parsed];
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading stories from localStorage', e);
    }
    return INITIAL_STORIES;
  });

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const stored = localStorage.getItem(STATS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading stats from localStorage', e);
    }
    return DEFAULT_STATS;
  });

  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const stored = localStorage.getItem(PREFS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading prefs from localStorage', e);
    }
    return DEFAULT_PREFERENCES;
  });

  // Sync stories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(stories));
    } catch (e) {
      console.error('Error saving stories to localStorage', e);
    }
  }, [stories]);

  // Sync stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Error saving stats to localStorage', e);
    }
  }, [stats]);

  // Sync preferences to localStorage and document.body
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
      document.body.className = `theme-${preferences.theme}`;
    } catch (e) {
      console.error('Error saving prefs to localStorage', e);
    }
  }, [preferences]);

  // Fire celebratory confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  // CRUD Operations on Stories
  const addStory = useCallback((newStoryData: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const id = 'story_' + Date.now();
    const newStory: Story = {
      ...newStoryData,
      id,
      isCustom: true,
      createdAt: today,
      updatedAt: today
    };

    setStories(prev => [newStory, ...prev]);

    // Give bonus XP & unlock 'active-writer' badge
    setStats(prev => {
      const updatedBadges = prev.badges.map(b => {
        if (b.id === 'active-writer' && !b.unlocked) {
          triggerConfetti();
          return { ...b, unlocked: true, unlockedAt: today };
        }
        return b;
      });
      return {
        ...prev,
        currentXP: prev.currentXP + 60,
        badges: updatedBadges
      };
    });

    triggerConfetti();
    return newStory;
  }, [triggerConfetti]);

  const updateStory = useCallback((storyId: string, updatedFields: Partial<Story>) => {
    const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    setStories(prev => prev.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          ...updatedFields,
          updatedAt: today
        };
      }
      return story;
    }));
  }, []);

  const deleteStory = useCallback((storyId: string) => {
    setStories(prev => prev.filter(story => story.id !== storyId));
    // Also remove from completed list if present
    setStats(prev => ({
      ...prev,
      completedStoryIds: prev.completedStoryIds.filter(id => id !== storyId)
    }));
  }, []);

  const resetStoriesToDefault = useCallback(() => {
    setStories(INITIAL_STORIES);
  }, []);

  // Export Data (JSON) for full user ownership & offline backup
  const exportDataAsJSON = useCallback(() => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      stories,
      stats,
      preferences
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BacaBaca_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [stories, stats, preferences]);

  // Import Data (JSON)
  const importDataFromJSON = useCallback((jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data && Array.isArray(data.stories)) {
        setStories(data.stories);
        if (data.stats) setStats(data.stats);
        if (data.preferences) setPreferences(data.preferences);
        triggerConfetti();
        return true;
      }
    } catch (e) {
      console.error('Failed to import JSON data', e);
    }
    return false;
  }, [triggerConfetti]);

  // Update Reading Streak
  const recordReadingSession = useCallback((minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    setStats((prev) => {
      let newStreak = prev.streakDays;
      const lastDate = prev.lastReadDate;

      if (lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastDate === yesterday) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      // Check for streak-3 badge
      const updatedBadges = prev.badges.map((b) => {
        if (b.id === 'streak-3' && newStreak >= 3 && !b.unlocked) {
          triggerConfetti();
          return { ...b, unlocked: true, unlockedAt: today };
        }
        return b;
      });

      return {
        ...prev,
        streakDays: newStreak,
        lastReadDate: today,
        totalMinutesRead: prev.totalMinutesRead + minutes,
        currentXP: prev.currentXP + minutes * 5,
        badges: updatedBadges
      };
    });
  }, [triggerConfetti]);

  // Mark Story as Completed
  const completeStory = useCallback((storyId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setStats((prev) => {
      const alreadyCompleted = prev.completedStoryIds.includes(storyId);
      const newCompletedList = alreadyCompleted ? prev.completedStoryIds : [...prev.completedStoryIds, storyId];
      const newTotalCompleted = alreadyCompleted ? prev.totalStoriesCompleted : prev.totalStoriesCompleted + 1;
      const gainedXP = alreadyCompleted ? 20 : 100;
      const newXP = prev.currentXP + gainedXP;
      const newLevel = Math.floor(newXP / 150) + 1;

      // Check badges
      const updatedBadges = prev.badges.map((b) => {
        if (b.id === 'first-step' && !b.unlocked) {
          return { ...b, unlocked: true, unlockedAt: today };
        }
        if (b.id === 'all-rounder' && newCompletedList.length >= 3 && !b.unlocked) {
          return { ...b, unlocked: true, unlockedAt: today };
        }
        return b;
      });

      triggerConfetti();

      return {
        ...prev,
        completedStoryIds: newCompletedList,
        totalStoriesCompleted: newTotalCompleted,
        currentXP: newXP,
        level: newLevel,
        badges: updatedBadges
      };
    });
  }, [triggerConfetti]);

  // Save a Quote
  const saveQuote = useCallback((quote: Omit<SavedQuote, 'id' | 'createdAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newQuote: SavedQuote = {
      ...quote,
      id: 'quote_' + Date.now(),
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setStats((prev) => {
      // Check if duplicate
      if (prev.savedQuotes.some((q) => q.text === quote.text)) {
        return prev;
      }

      const updatedBadges = prev.badges.map((b) => {
        if (b.id === 'quote-collector' && !b.unlocked) {
          triggerConfetti();
          return { ...b, unlocked: true, unlockedAt: today };
        }
        return b;
      });

      return {
        ...prev,
        currentXP: prev.currentXP + 15,
        savedQuotes: [newQuote, ...prev.savedQuotes],
        badges: updatedBadges
      };
    });
  }, [triggerConfetti]);

  // Remove a Quote
  const removeQuote = useCallback((quoteId: string) => {
    setStats((prev) => ({
      ...prev,
      savedQuotes: prev.savedQuotes.filter((q) => q.id !== quoteId)
    }));
  }, []);

  // Unlock Ambient badge
  const unlockZenBadge = useCallback(() => {
    setStats((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const updatedBadges = prev.badges.map((b) => {
        if (b.id === 'zen-reader' && !b.unlocked) {
          triggerConfetti();
          return { ...b, unlocked: true, unlockedAt: today };
        }
        return b;
      });
      return { ...prev, badges: updatedBadges };
    });
  }, [triggerConfetti]);

  return {
    stories,
    stats,
    preferences,
    setPreferences,
    addStory,
    updateStory,
    deleteStory,
    resetStoriesToDefault,
    exportDataAsJSON,
    importDataFromJSON,
    recordReadingSession,
    completeStory,
    saveQuote,
    removeQuote,
    unlockZenBadge,
    triggerConfetti
  };
}
