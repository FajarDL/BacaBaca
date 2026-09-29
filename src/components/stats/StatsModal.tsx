import React from 'react';
import { X, Flame, Clock, Award, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import type { UserStats } from '../../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats
}) => {
  if (!isOpen) return null;

  const xpInCurrentLevel = stats.currentXP % 150;
  const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / 150) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold">Jejak & Pencapaian Membaca</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Level Progress Banner */}
          <div className="p-4 rounded-xl border relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-lg">
                  {stats.level}
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    Level {stats.level} Pembaca
                  </h3>
                  <p className="text-xs opacity-75" style={{ color: 'var(--text-secondary)' }}>
                    {stats.currentXP} Total XP terkumpul
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/10 text-amber-600">
                {150 - xpInCurrentLevel} XP menuju Level {stats.level + 1}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden mt-3">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border text-center"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
              }}>
              <Flame className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <div className="text-xl font-extrabold">{stats.streakDays}</div>
              <div className="text-[11px] font-medium opacity-75" style={{ color: 'var(--text-secondary)' }}>
                Hari Streak
              </div>
            </div>

            <div className="p-3.5 rounded-xl border text-center"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
              }}>
              <Clock className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <div className="text-xl font-extrabold">{stats.totalMinutesRead}</div>
              <div className="text-[11px] font-medium opacity-75" style={{ color: 'var(--text-secondary)' }}>
                Menit Dibaca
              </div>
            </div>

            <div className="p-3.5 rounded-xl border text-center"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)'
              }}>
              <BookOpen className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <div className="text-xl font-extrabold">{stats.totalStoriesCompleted}</div>
              <div className="text-[11px] font-medium opacity-75" style={{ color: 'var(--text-secondary)' }}>
                Materi Selesai
              </div>
            </div>
          </div>

          {/* Badges List */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5 opacity-80"
              style={{ color: 'var(--text-secondary)' }}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              Lencana Pencapaian
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {stats.badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                    badge.unlocked 
                      ? 'border-amber-400/50 bg-amber-500/5' 
                      : 'opacity-50 grayscale'
                  }`}
                  style={{
                    backgroundColor: badge.unlocked ? 'var(--accent-light)' : 'var(--bg-secondary)',
                    borderColor: badge.unlocked ? 'var(--accent)' : 'var(--border-color)'
                  }}
                >
                  <div className="text-2xl flex-shrink-0 mt-0.5">
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs truncate">
                        {badge.title}
                      </span>
                      {badge.unlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] leading-relaxed mt-0.5 opacity-75" style={{ color: 'var(--text-secondary)' }}>
                      {badge.description}
                    </p>
                    {badge.unlocked && badge.unlockedAt && (
                      <span className="text-[10px] text-amber-700/80 block mt-1 font-medium">
                        Dibuka: {badge.unlockedAt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
