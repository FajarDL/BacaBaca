import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Volume2, 
  Pause, 
  Play, 
  Sliders, 
  BookmarkPlus, 
  Clock,
  Edit3,
  User,
  ShieldCheck,
  CheckCircle2
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
  onEditCurrentStory?: (story: Story) => void;
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
  onFontSizeChange,
  onEditCurrentStory
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

  // Scientifically calibrated font size classes (16px to 18px standard measure)
  const fontSizeClasses: Record<FontSize, string> = {
    sm: 'text-[15px] sm:text-[15.5px] leading-[1.68]',
    base: 'text-[16px] sm:text-[17.5px] leading-[1.72]',
    lg: 'text-[17.5px] sm:text-[19px] leading-[1.76]',
    xl: 'text-[19.5px] sm:text-[21px] leading-[1.8]',
    '2xl': 'text-[21px] sm:text-[23px] leading-[1.84]'
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

  const estimatedMinutesLeft = Math.max(1, Math.round(story.readingTimeMinutes * (1 - scrollProgress / 100)));

  return (
    <div 
      ref={containerRef}
      onMouseUp={handleTextSelection}
      className="min-h-screen pb-28 transition-colors selection:bg-amber-200"
      style={{
        backgroundColor: 'var(--reader-bg)',
        color: 'var(--reader-text)'
      }}
    >
      {/* Top Reading Progress Bar (Subtle & Elegant) */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-black/5">
        <div 
          className="h-full bg-amber-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Focus Ruler Line */}
      {showFocusRuler && (
        <div 
          className="fixed left-0 right-0 pointer-events-none z-30 transition-all duration-75"
          style={{
            top: `${rulerTop - 18}px`,
            height: '36px',
            backgroundColor: 'rgba(251, 191, 36, 0.08)',
            borderTop: '1px dashed rgba(217, 119, 6, 0.35)',
            borderBottom: '1px dashed rgba(217, 119, 6, 0.35)'
          }}
        />
      )}

      {/* Sticky Reader Toolbar (Clean & Distraction-Free) */}
      <nav 
        className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors px-4 py-2.5"
        style={{
          backgroundColor: 'rgba(var(--bg-card), 0.94)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="max-w-[700px] mx-auto flex items-center justify-between gap-3">
          
          {/* Back Button */}
          <button
            onClick={() => {
              stop();
              onBack();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-black/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            title="Kembali ke Beranda Perpustakaan"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Perpustakaan</span>
          </button>

          {/* Reading Progress Indicator */}
          <div className="text-center overflow-hidden flex-1 px-2">
            <span className="text-[11px] font-semibold opacity-75 flex items-center justify-center gap-1.5"
              style={{ color: 'var(--text-secondary)' }}>
              <span>{scrollProgress}% selesai</span>
              <span>•</span>
              <Clock className="w-3 h-3 inline" />
              <span>~{estimatedMinutesLeft} mnt tersisa</span>
            </span>
          </div>

          {/* Quick Actions Bar */}
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
              title={isSpeaking && !isPaused ? 'Jeda Narasi' : 'Dengarkan Narasi Suara (TTS)'}
              className={`px-2.5 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                isSpeaking ? 'ring-2 ring-amber-500 bg-amber-500/10 text-amber-700 font-bold' : ''
              }`}
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: isSpeaking ? undefined : 'var(--bg-secondary)',
                color: isSpeaking ? undefined : 'var(--text-primary)'
              }}
            >
              {isSpeaking && !isPaused ? (
                <Pause className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              ) : (
                <Play className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              )}
              <span className="hidden xs:inline text-[11px]">
                {isSpeaking && !isPaused ? 'Jeda' : 'Bacakan'}
              </span>
            </button>

            {/* Save Selected Quote */}
            {selectedTextForQuote && (
              <button
                onClick={() => setIsQuoteDialogOpen(true)}
                title="Simpan Kalimat yang Disorot"
                className="px-2.5 py-1.5 rounded-lg bg-amber-600 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm animate-pulse"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simpan Kutipan</span>
              </button>
            )}

            {/* Edit Current Story Button */}
            {onEditCurrentStory && (
              <button
                onClick={() => onEditCurrentStory(story)}
                title="Edit Teks / Catatan Ini"
                className="p-1.5 rounded-lg border text-xs hover:bg-black/5 transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Reader Comfort Settings */}
            <button
              onClick={() => setShowControls(prev => !prev)}
              title="Pengaturan Tampilan & Huruf Baca"
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                showControls ? 'ring-2 ring-amber-500 font-bold' : ''
              }`}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Main Reading Column (Calibrated 680px Measure for Zero Eye Fatigue) */}
      <main className="max-w-[680px] mx-auto px-5 sm:px-6 pt-10 pb-20">
        
        {/* Reader Controls Accordion Toolbar */}
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

        {/* Article Editorial Header (Medium / Substack Editorial Style) */}
        <header className="mb-10 pb-8 border-b space-y-4"
          style={{ borderColor: 'var(--border-color)' }}>
          
          {/* Category & Read Time Breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border"
              style={{
                backgroundColor: 'var(--accent-light)',
                borderColor: 'var(--accent)',
                color: 'var(--accent-hover)'
              }}>
              <span>{story.coverEmoji}</span>
              <span>{story.category}</span>
            </span>
            <span className="text-xs opacity-60">•</span>
            <span className="text-xs font-semibold opacity-75 flex items-center gap-1"
              style={{ color: 'var(--text-secondary)' }}>
              <Clock className="w-3.5 h-3.5" />
              {story.readingTimeMinutes} menit waktu baca
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full ml-auto">
                <CheckCircle2 className="w-3 h-3" />
                Sudah Selesai
              </span>
            )}
          </div>

          {/* Main Title (Refined Editorial Scale) */}
          <h1 className={`font-bold tracking-tight text-2xl sm:text-3xl md:text-[32px] leading-[1.28] ${
            fontFamily === 'serif' ? 'font-reading-serif' : 'font-reading-sans'
          }`}
            style={{ color: 'var(--text-primary)' }}>
            {story.title}
          </h1>

          {/* Author Byline & Date */}
          <div className="flex items-center gap-3 pt-1 text-xs"
            style={{ color: 'var(--text-secondary)' }}>
            <div className="w-7 h-7 rounded-full bg-amber-600/10 text-amber-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {story.author}
              </p>
              <p className="opacity-75 text-[11px] truncate">
                Disusun untuk Studi Mandiri • Diperbarui {story.updatedAt || 'Baru'}
              </p>
            </div>
          </div>

          {/* Abstract / Summary Quote */}
          {story.summary && (
            <div className="p-4 rounded-xl border text-xs sm:text-sm leading-relaxed italic border-l-4"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
                borderLeftColor: 'var(--accent)',
                color: 'var(--text-secondary)'
              }}>
              "{story.summary}"
            </div>
          )}

          {/* Ethical Attribution Subnote */}
          {story.attribution && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium opacity-80 pt-1"
              style={{ color: 'var(--text-secondary)' }}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{story.attribution}</span>
            </div>
          )}

          {/* Micro Reading Tip */}
          <div className="text-[11px] opacity-65 flex items-center gap-1.5 pt-1">
            <span>💡</span>
            <span>Ketuk kata mana saja untuk mendengar pelafalan suara, atau arahkan kursor ke paragraf untuk memutar narasi.</span>
          </div>

        </header>

        {/* Article Body (Chapters and Paragraphs with Natural Typography) */}
        <article className={`space-y-12 ${fontFamily === 'serif' ? 'font-reading-serif' : 'font-reading-sans'}`}>
          {story.chapters.map((chapter, cIdx) => (
            <section key={chapter.id} className="space-y-6">
              
              {/* Chapter Header (Book / Magazine Style) */}
              <div className="pt-2 pb-3 border-b"
                style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  Bagian {cIdx + 1} dari {story.chapters.length}
                </span>
                <h2 className="text-xl sm:text-[22px] font-bold tracking-tight leading-snug"
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

                  // Detect if paragraph is a quote or pull-statement
                  const isQuoteParagraph = paraText.startsWith('"') && paraText.endsWith('"');

                  const words = paraText.split(' ');

                  return (
                    <div 
                      key={pIdx}
                      className={`relative group rounded-xl p-2.5 sm:p-3 -mx-2.5 sm:-mx-3 transition-colors ${
                        isCurrentParaSpeaking 
                          ? 'bg-amber-500/10 ring-1 ring-amber-400' 
                          : 'hover:bg-black/[0.02]'
                      } ${isQuoteParagraph ? 'border-l-2 border-amber-600 pl-4 sm:pl-5 italic my-4' : ''}`}
                    >
                      <p className={`${fontSizeClasses[fontSize]} text-left`}>
                        {words.map((word, wIdx) => {
                          const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '').toLowerCase();
                          const isWordActive = isCurrentParaSpeaking && currentWord.toLowerCase() === cleanWord;

                          return (
                            <React.Fragment key={wIdx}>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  speakWord(word);
                                }}
                                className={`cursor-pointer rounded transition-colors duration-150 ${
                                  isWordActive
                                    ? 'bg-amber-300 text-stone-900 font-semibold px-1 py-0.5 shadow-xs'
                                    : 'hover:bg-amber-500/15 hover:text-amber-800'
                                }`}
                                title="Ketuk untuk dengarkan kata ini"
                              >
                                {word}
                              </span>
                              {wIdx < words.length - 1 ? ' ' : ''}
                            </React.Fragment>
                          );
                        })}
                      </p>

                      {/* Paragraph Floating Action Bar (Discreet & Calm) */}
                      <div className="absolute right-2 -top-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/95 shadow-sm border rounded-md px-1.5 py-0.5 text-xs backdrop-blur-sm z-10"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                        <button
                          onClick={() => handlePlayParagraph(globalIndex, paraText)}
                          title="Dengarkan paragraf ini"
                          className="hover:text-amber-600 p-1 transition-colors"
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
                          className="hover:text-amber-600 p-1 transition-colors"
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
