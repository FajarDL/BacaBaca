import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { AmbientSoundBar } from './components/ambient/AmbientSoundBar';
import { StoryLibrary } from './components/library/StoryLibrary';
import { ZenReader } from './components/reader/ZenReader';
import { StatsModal } from './components/stats/StatsModal';
import { QuotesGalleryModal } from './components/quotes/QuotesGalleryModal';
import { INITIAL_STORIES } from './data/stories';
import type { Story, AmbientSoundType } from './types';
import { useReadingStorage } from './hooks/useReadingStorage';
import { useAmbientSound } from './hooks/useAmbientSound';

export function App() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isAmbientMenuOpen, setIsAmbientMenuOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isQuotesOpen, setIsQuotesOpen] = useState<boolean>(false);

  // Storage & Profile Hook
  const {
    stats,
    preferences,
    setPreferences,
    recordReadingSession,
    completeStory,
    saveQuote,
    removeQuote,
    unlockZenBadge
  } = useReadingStorage();

  // Ambient Sound Hook
  const {
    currentSound,
    volume,
    setVolume,
    playSound
  } = useAmbientSound();

  const handleSelectSound = (sound: AmbientSoundType) => {
    playSound(sound);
    if (sound !== 'off') {
      unlockZenBadge();
    }
  };

  const handleOpenStory = (story: Story) => {
    setActiveStory(story);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    setActiveStory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar
        currentTheme={preferences.theme}
        onThemeChange={(theme) => setPreferences(prev => ({ ...prev, theme }))}
        streakDays={stats.streakDays}
        currentLevel={stats.level}
        currentXP={stats.currentXP}
        currentSound={currentSound}
        onToggleAmbientMenu={() => setIsAmbientMenuOpen(prev => !prev)}
        onOpenQuotes={() => setIsQuotesOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        onGoHome={handleBackToLibrary}
        isReadingMode={activeStory !== null}
      />

      {/* Expandable Ambient Sound Control Bar */}
      <AmbientSoundBar
        isOpen={isAmbientMenuOpen}
        onClose={() => setIsAmbientMenuOpen(false)}
        currentSound={currentSound}
        volume={volume}
        onSelectSound={handleSelectSound}
        onVolumeChange={setVolume}
      />

      {/* Main View: Zen Reader or Story Library */}
      <div className="flex-1">
        {activeStory ? (
          <ZenReader
            story={activeStory}
            fontFamily={preferences.fontFamily}
            fontSize={preferences.fontSize}
            onBack={handleBackToLibrary}
            isCompleted={stats.completedStoryIds.includes(activeStory.id)}
            onCompleteStory={(storyId) => completeStory(storyId)}
            onSaveQuote={(quote) => saveQuote(quote)}
            onRecordTime={(mins) => recordReadingSession(mins)}
            onFontFamilyChange={(font) => setPreferences(prev => ({ ...prev, fontFamily: font }))}
            onFontSizeChange={(size) => setPreferences(prev => ({ ...prev, fontSize: size }))}
          />
        ) : (
          <StoryLibrary
            stories={INITIAL_STORIES}
            completedStoryIds={stats.completedStoryIds}
            onSelectStory={handleOpenStory}
            onOpenStats={() => setIsStatsOpen(true)}
          />
        )}
      </div>

      {/* Reading Statistics & Achievements Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />

      {/* Saved Inspiring Quotes Gallery Modal */}
      <QuotesGalleryModal
        isOpen={isQuotesOpen}
        onClose={() => setIsQuotesOpen(false)}
        quotes={stats.savedQuotes}
        onRemoveQuote={removeQuote}
      />

    </div>
  );
}

export default App;
