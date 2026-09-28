import { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { AmbientSoundBar } from './components/ambient/AmbientSoundBar';
import { StoryLibrary } from './components/library/StoryLibrary';
import { ZenReader } from './components/reader/ZenReader';
import { StatsModal } from './components/stats/StatsModal';
import { QuotesGalleryModal } from './components/quotes/QuotesGalleryModal';
import { StoryEditorModal } from './components/manage/StoryEditorModal';
import { DeleteConfirmModal } from './components/manage/DeleteConfirmModal';
import type { Story, AmbientSoundType } from './types';
import { useReadingStorage } from './hooks/useReadingStorage';
import { useAmbientSound } from './hooks/useAmbientSound';

export function App() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isAmbientMenuOpen, setIsAmbientMenuOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isQuotesOpen, setIsQuotesOpen] = useState<boolean>(false);

  // CRUD State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [storyToEdit, setStoryToEdit] = useState<Story | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [storyToDelete, setStoryToDelete] = useState<Story | null>(null);

  // Storage & Profile Hook
  const {
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

  // CRUD Handlers
  const handleAddNewStory = () => {
    setStoryToEdit(null);
    setIsEditorOpen(true);
  };

  const handleEditStory = (story: Story) => {
    setStoryToEdit(story);
    setIsEditorOpen(true);
  };

  const handleSaveStory = (storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (storyToEdit) {
      updateStory(storyToEdit.id, storyData);
      if (activeStory && activeStory.id === storyToEdit.id) {
        setActiveStory(prev => prev ? { ...prev, ...storyData } : null);
      }
    } else {
      const newStory = addStory(storyData);
      // Auto open reader for newly created story if desired
      setActiveStory(newStory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDeleteRequest = (story: Story) => {
    setStoryToDelete(story);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (storyToDelete) {
      deleteStory(storyToDelete.id);
      if (activeStory && activeStory.id === storyToDelete.id) {
        setActiveStory(null);
      }
      setStoryToDelete(null);
    }
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
            onEditCurrentStory={handleEditStory}
          />
        ) : (
          <StoryLibrary
            stories={stories}
            completedStoryIds={stats.completedStoryIds}
            onSelectStory={handleOpenStory}
            onOpenStats={() => setIsStatsOpen(true)}
            onAddNewStory={handleAddNewStory}
            onEditStory={handleEditStory}
            onDeleteStory={handleDeleteRequest}
            onExportData={exportDataAsJSON}
            onImportData={importDataFromJSON}
            onResetToDefault={resetStoriesToDefault}
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

      {/* Story Create & Edit Modal */}
      <StoryEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setStoryToEdit(null);
        }}
        storyToEdit={storyToEdit}
        onSaveStory={handleSaveStory}
      />

      {/* Safe Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setStoryToDelete(null);
        }}
        storyTitle={storyToDelete?.title || ''}
        onConfirmDelete={handleConfirmDelete}
      />

    </div>
  );
}

export default App;
