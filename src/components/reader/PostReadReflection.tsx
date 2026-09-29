import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Lightbulb } from 'lucide-react';
import type { ReflectionQuestion } from '../../types';

interface PostReadReflectionProps {
  moralLesson?: string;
  reflections: ReflectionQuestion[];
  isCompleted: boolean;
  onComplete: () => void;
  onBackToLibrary: () => void;
}

export const PostReadReflection: React.FC<PostReadReflectionProps> = ({
  moralLesson,
  reflections,
  isCompleted,
  onComplete,
  onBackToLibrary
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [qId: string]: boolean }>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [questionId]: true }));
  };

  return (
    <div 
      className="mt-12 p-6 sm:p-8 rounded-3xl border shadow-sm space-y-8 animate-in fade-in duration-300"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Rangkuman & Poin Kunci Intisari Banner */}
      {moralLesson && (
        <div className="p-5 sm:p-6 rounded-2xl border text-center space-y-3 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--accent-light)',
            borderColor: 'var(--accent)'
          }}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 text-xs font-bold text-amber-800 shadow-xs border border-amber-600/20">
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Rangkuman & Poin Kunci Intisari</span>
          </div>
          <p className="text-base sm:text-[17px] font-reading-serif italic max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-primary)' }}>
            "{moralLesson}"
          </p>
        </div>
      )}

      {/* Reflections / Quiz */}
      {reflections.length > 0 && (
        <div className="space-y-6">
          <div className="text-center max-w-md mx-auto">
            <h3 className="text-lg font-bold">Ruang Evaluasi & Pemahaman Materi</h3>
            <p className="text-xs opacity-75 mt-1" style={{ color: 'var(--text-secondary)' }}>
              Mari uji pemahaman dan daya serap Anda terhadap materi atau rangkuman yang baru saja dipelajari.
            </p>
          </div>

          {reflections.map((q) => {
            const hasAnswered = selectedAnswers[q.id] !== undefined;
            const chosen = selectedAnswers[q.id];
            const isCorrect = q.correctIndex !== undefined ? chosen === q.correctIndex : true;

            return (
              <div 
                key={q.id}
                className="p-5 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <h4 className="font-semibold text-sm sm:text-base leading-snug">
                  {q.question}
                </h4>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, idx) => {
                    const isSelected = chosen === idx;
                    const isOptionCorrect = q.correctIndex === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(q.id, idx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                          isSelected
                            ? isCorrect
                              ? 'ring-2 ring-emerald-500 bg-emerald-50/70 border-emerald-500'
                              : 'ring-2 ring-amber-500 bg-amber-50/70 border-amber-500'
                            : 'hover:opacity-90'
                        }`}
                        style={{
                          backgroundColor: isSelected 
                            ? undefined 
                            : 'var(--bg-card)',
                          borderColor: isSelected ? undefined : 'var(--border-color)'
                        }}
                      >
                        <span className="w-5 h-5 rounded-full border text-xs flex items-center justify-center flex-shrink-0 mt-0.5 opacity-60">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1 leading-relaxed">
                          {opt}
                        </span>
                        {hasAnswered && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {showExplanation[q.id] && (
                  <div className="p-3.5 rounded-xl bg-black/5 text-xs space-y-2 animate-in fade-in duration-200"
                    style={{ color: 'var(--text-secondary)' }}>
                    <div className="flex items-center gap-1.5 font-semibold text-amber-600">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Penjelasan:
                    </div>
                    <p className="leading-relaxed">
                      {q.explanation}
                    </p>
                    {q.thoughtPrompt && (
                      <div className="pt-2 border-t border-black/5 italic text-amber-800 font-medium">
                        💡 Bahan Renungan: {q.thoughtPrompt}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Completion & Rewards CTA */}
      <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderColor: 'var(--border-color)' }}>
        <div>
          <h4 className="font-bold text-sm">
            {isCompleted ? 'Materi Selesai Dipelajari! 🎉' : 'Selesaikan & Catat Progres Belajar'}
          </h4>
          <p className="text-xs opacity-75" style={{ color: 'var(--text-secondary)' }}>
            {isCompleted ? 'Anda telah memperoleh XP dari materi bacaan ini.' : 'Dapatkan +100 XP dan perbarui riwayat belajar harian Anda.'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isCompleted ? (
            <button
              onClick={onComplete}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:scale-105 transition-all"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <Sparkles className="w-4 h-4" />
              Selesaikan & Klaim XP
            </button>
          ) : (
            <button
              onClick={onBackToLibrary}
              className="flex-1 sm:flex-none px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border hover:bg-black/5 transition-all"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              Kembali ke Perpustakaan
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
