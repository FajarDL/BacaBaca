import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { UserStats, SavedQuote, ThemeMode, FontFamily, FontSize } from '../types';
import { INITIAL_BADGES } from '../data/stories';

const STATS_STORAGE_KEY = 'bacabaca_user_stats_v1';
const PREFS_STORAGE_KEY = 'bacabaca_user_prefs_v1';

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
    stats,
    preferences,
    setPreferences,
    recordReadingSession,
    completeStory,
    saveQuote,
    removeQuote,
    unlockZenBadge,
    triggerConfetti
  };
}
