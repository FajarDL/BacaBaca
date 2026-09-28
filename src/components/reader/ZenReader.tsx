import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  Pause, 
  Play, 
  Sliders, 
  BookmarkPlus, 
  Clock
} from 'lucide-react';
import type { Story, FontFamily, FontSize } from '../../types';
import { useSpeech } from '../../hooks/useSpeech';
import { ReaderControls } from './ReaderControls';
import { PostReadReflection } from './PostReadReflection';
import { SaveQuoteDialog } from './SaveQuoteDialog';

interface ZenReaderProps {
  story: Story;
  fontFamily: FontFamily;
  fontSize: FontSize;
  onBack: () => void;
  isCompleted: boolean;
  onCompleteStory: (storyId: string) => void;
  onSaveQuote: (quote: { text: string; storyId: string; storyTitle: string; author: string }) => void;
  onRecordTime: (minutes: number) => void;
  onFontFamilyChange: (font: FontFamily) => void;
  onFontSizeChange: (size: FontSize) => void;
}

export const ZenReader: React.FC<ZenReaderProps> = ({
  story,
  fontFamily,
  fontSize,
  onBack,
  isCompleted,
  onCompleteStory,
  onSaveQuote,
  onRecordTime,
  onFontFamilyChange,
  onFontSizeChange
}) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showFocusRuler, setShowFocusRuler] = useState<boolean>(false);
  const [rulerTop, setRulerTop] = useState<number>(200);
  const [selectedTextForQuote, setSelectedTextForQuote] = useState<string>('');
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Text-To-Speech hook
  const {
    isSpeaking,
    isPaused,
    currentParagraph,
    currentWord,
    rate,
    setRate,
    speakParagraph,
    speakWord,
    pause,
    resume,
    stop
  } = useSpeech();

  // Scroll Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track reading time (records every 60s of active reading)
  useEffect(() => {
    const timer = setInterval(() => {
      onRecordTime(1);
    }, 60000);

    return () => clearInterval(timer);
  }, [onRecordTime]);

  // Track Mouse for Focus Ruler
  useEffect(() => {
    if (!showFocusRuler) return;
    const handleMouseMove = (e: MouseEvent) => {
      setRulerTop(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showFocusRuler]);

  // Listen for user text selection to save quote
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 10) {
      setSelectedTextForQuote(selection.toString().trim());
    }
  };

  // Font size classes
  const fontSizeClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
    '2xl': 'text-2xl sm:text-3xl leading-loose'
  };

  // Flatten all paragraphs to allow sequential audio reading
  const allParagraphs: { chapterIndex: number; paragraphIndex: number; globalIndex: number; text: string }[] = [];
  let gIdx = 0;
  story.chapters.forEach((chap, cIdx) => {
    chap.paragraphs.forEach((p, pIdx) => {
      allParagraphs.push({ chapterIndex: cIdx, paragraphIndex: pIdx, globalIndex: gIdx++, text: p });
    });
  });

  const handlePlayParagraph = (globalIndex: number, text: string) => {
    if (isSpeaking && currentParagraph === globalIndex) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speakParagraph(text, globalIndex, () => {
        // Auto play next paragraph if exists
        const next = allParagraphs.find(p => p.globalIndex === globalIndex + 1);
        if (next) {
          handlePlayParagraph(next.globalIndex, next.text);
        }
      });
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseUp={handleTextSelection}
      className="min-h-screen pb-24 transition-colors"
      style={{
        backgroundColor: 'var(--reader-bg)',
        color: 'var(--reader-text)'
      }}
    >
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/10">
        <div 
          className="h-full bg-amber-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Focus Ruler Line */}
      {showFocusRuler && (
        <div 
          className="fixed left-0 right-0 pointer-events-none z-30 transition-all duration-75"
          style={{
            top: `${rulerTop - 16}px`,
            height: '32px',
            backgroundColor: 'rgba(251, 191, 36, 0.12)',
            borderTop: '1px dashed rgba(217, 119, 6, 0.4)',
            borderBottom: '1px dashed rgba(217, 119, 6, 0.4)'
          }}
        />
      )}

      {/* Sticky Reader Toolbar */}
      <nav 
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors px-4 py-3"
        style={{
          backgroundColor: 'rgba(var(--bg-card), 0.92)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          
          {/* Back Button */}
          <button
            onClick={() => {
              stop();
              onBack();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold p-2 rounded-xl hover:bg-black/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Kembali</span>
          </button>

          {/* Title & Reading Time */}
          <div className="text-center overflow-hidden flex-1 px-2">
            <h1 className="text-xs sm:text-sm font-bold truncate"
              style={{ color: 'var(--text-primary)' }}>
              {story.title}
            </h1>
            <div className="text-[11px] opacity-70 flex items-center justify-center gap-1.5">
              <span>{story.category}</span>
              <span>•</span>
              <Clock className="w-3 h-3 inline" />
              <span>{story.readingTimeMinutes} mnt baca</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            
            {/* Play/Pause Global Story Audio */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  if (isPaused) resume();
                  else pause();
                } else {
                  handlePlayParagraph(0, allParagraphs[0]?.text || '');
                }
              }}
              title={isSpeaking && !isPaused ? 'Jeda Narasi' : 'Dengarkan Bacaan (TTS)'}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
                isSpeaking ? 'ring-2 ring-amber-500 bg-amber-50 text-amber-700 font-bold' : ''
              }`}
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: isSpeaking ? undefined : 'var(--bg-secondary)',
                color: isSpeaking ? undefined : 'var(--text-primary)'
              }}
            >
              {isSpeaking && !isPaused ? (
                <Pause className="w-4 h-4 fill-amber-600 text-amber-600" />
              ) : (
                <Play className="w-4 h-4 text-amber-600 fill-amber-600" />
              )}
              <span className="hidden sm:inline">
                {isSpeaking && !isPaused ? 'Jeda' : 'Bacakan'}
              </span>
            </button>

            {/* Save Selected Quote */}
            {selectedTextForQuote && (
              <button
                onClick={() => setIsQuoteDialogOpen(true)}
                title="Simpan Kalimat yang Disorot"
                className="p-2 rounded-xl bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow-sm animate-bounce"
              >
                <BookmarkPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Kutipan</span>
              </button>
            )}

            {/* Reader Comfort Settings */}
            <button
              onClick={() => setShowControls(prev => !prev)}
              title="Pengaturan Tampilan Baca"
              className={`p-2 rounded-xl border text-xs transition-colors ${
                showControls ? 'ring-2 ring-amber-500 font-bold' : ''
              }`}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

        </div>
      </nav>

      {/* Main Article Container */}
      <main className="max-w-2xl mx-auto px-5 sm:px-6 pt-8 pb-16">
        
        {/* Reader Controls Toolbar Accordion */}
        <ReaderControls
          isOpen={showControls}
          onClose={() => setShowControls(false)}
          fontFamily={fontFamily}
          onFontFamilyChange={onFontFamilyChange}
          fontSize={fontSize}
          onFontSizeChange={onFontSizeChange}
          speechRate={rate}
          onSpeechRateChange={setRate}
          showFocusRuler={showFocusRuler}
          onToggleFocusRuler={() => setShowFocusRuler(prev => !prev)}
        />

        {/* Story Header Hero */}
        <header className="text-center mb-10 pb-8 border-b"
          style={{ borderColor: 'var(--border-color)' }}>
          <div className="text-5xl mb-4 transform hover:scale-110 transition-transform inline-block">
            {story.coverEmoji}
          </div>
          <h1 className={`font-bold tracking-tight mb-3 ${fontFamily === 'serif' ? 'font-reading-serif' : 'font-reading-sans'} text-2xl sm:text-4xl`}
            style={{ color: 'var(--text-primary)' }}>
            {story.title}
          </h1>
          <p className="text-sm opacity-75 max-w-lg mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}>
            Ditulis oleh <span className="font-semibold">{story.author}</span> • {story.summary}
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full border font-medium"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              Tingkat: {story.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full border font-medium"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              💡 Ketuk kata untuk mendengar pengucapannya
            </span>
          </div>
        </header>

        {/* Story Chapters and Paragraphs */}
        <article className={`space-y-10 ${fontFamily === 'serif' ? 'font-reading-serif' : 'font-reading-sans'}`}>
          {story.chapters.map((chapter, cIdx) => (
            <section key={chapter.id} className="space-y-6">
              
              {/* Chapter Title */}
              <div className="flex items-center gap-3 pt-4">
                <span className="w-8 h-8 rounded-full border text-xs font-bold flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                  {cIdx + 1}
                </span>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight"
                  style={{ color: 'var(--text-primary)' }}>
                  {chapter.title}
                </h2>
              </div>

              {/* Chapter Paragraphs */}
              <div className="space-y-6">
                {chapter.paragraphs.map((paraText, pIdx) => {
                  const globalItem = allParagraphs.find(
                    p => p.chapterIndex === cIdx && p.paragraphIndex === pIdx
                  );
                  const globalIndex = globalItem ? globalItem.globalIndex : 0;
                  const isCurrentParaSpeaking = isSpeaking && currentParagraph === globalIndex;

                  // Break paragraph into clickable words for interactive tap-to-pronounce
                  const words = paraText.split(' ');

                  return (
                    <div 
                      key={pIdx}
                      className={`relative group rounded-2xl p-3 sm:p-4 transition-all ${
                        isCurrentParaSpeaking ? 'ring-2 ring-amber-400 bg-amber-500/10' : 'hover:bg-black/2'
                      }`}
                    >
                      <p className={`${fontSizeClasses[fontSize]} text-justify sm:text-left`}>
                        {words.map((word, wIdx) => {
                          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').toLowerCase();
                          const isWordActive = isCurrentParaSpeaking && currentWord.toLowerCase() === cleanWord;

                          return (
                            <span
                              key={wIdx}
                              onClick={(e) => {
                                e.stopPropagation();
                                speakWord(word);
                              }}
                              className={`cursor-pointer rounded transition-all inline-block mx-0.5 px-0.5 ${
                                isWordActive
                                  ? 'bg-amber-400 text-stone-900 font-bold scale-105 shadow-sm'
                                  : 'hover:bg-amber-200/50 hover:underline'
                              }`}
                              title="Ketuk untuk dengar suara kata ini"
                            >
                              {word}
                            </span>
                          );
                        })}
                      </p>

                      {/* Paragraph Mini Toolbar */}
                      <div className="absolute right-2 -top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 shadow-sm border rounded-lg px-1.5 py-0.5 text-xs backdrop-blur-sm"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        <button
                          onClick={() => handlePlayParagraph(globalIndex, paraText)}
                          title="Dengarkan paragraf ini"
                          className="hover:text-amber-600 p-1"
                        >
                          {isCurrentParaSpeaking && !isPaused ? (
                            <Pause className="w-3.5 h-3.5 text-amber-600" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTextForQuote(paraText);
                            setIsQuoteDialogOpen(true);
                          }}
                          title="Simpan paragraf sebagai kutipan"
                          className="hover:text-amber-600 p-1"
                        >
                          <BookmarkPlus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </section>
          ))}
        </article>

        {/* End of Story: Reflection & Quiz */}
        <PostReadReflection
          moralLesson={story.moralLesson}
          reflections={story.reflections}
          isCompleted={isCompleted}
          onComplete={() => onCompleteStory(story.id)}
          onBackToLibrary={onBack}
        />

      </main>

      {/* Save Quote Dialog */}
      <SaveQuoteDialog
        isOpen={isQuoteDialogOpen}
        onClose={() => setIsQuoteDialogOpen(false)}
        selectedText={selectedTextForQuote}
        storyTitle={story.title}
        storyAuthor={story.author}
        onConfirmSave={() => {
          onSaveQuote({
            text: selectedTextForQuote,
            storyId: story.id,
            storyTitle: story.title,
            author: story.author
          });
          setSelectedTextForQuote('');
        }}
      />

    </div>
  );
};
