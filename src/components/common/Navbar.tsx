import React from 'react';
import { BookOpen, Flame, Sparkles, Moon, Sun, Coffee, Volume2, Bookmark, BarChart3 } from 'lucide-react';
import type { ThemeMode, AmbientSoundType } from '../../types';

interface NavbarProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  streakDays: number;
  currentLevel: number;
  currentXP: number;
  currentSound: AmbientSoundType;
  onToggleAmbientMenu: () => void;
  onOpenQuotes: () => void;
  onOpenStats: () => void;
  onGoHome: () => void;
  isReadingMode?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  streakDays,
  currentLevel,
  currentXP,
  currentSound,
  onToggleAmbientMenu,
  onOpenQuotes,
  onOpenStats,
  onGoHome,
  isReadingMode = false
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-opacity-80 border-b transition-colors"
      style={{
        backgroundColor: 'rgba(var(--bg-card), 0.85)',
        borderColor: 'var(--border-color)'
      }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight block leading-tight"
                style={{ color: 'var(--text-primary)' }}>
                BacaBaca
              </span>
              {isReadingMode && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                  Mode Baca
                </span>
              )}
            </div>
            <span className="text-xs block font-medium opacity-70"
              style={{ color: 'var(--text-secondary)' }}>
              Membaca Jadi Menyenangkan
            </span>
          </div>
        </button>

        {/* Center / Right Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Ambient Sound Trigger */}
          <button
            onClick={onToggleAmbientMenu}
            title="Suasana Baca (Ambient Sounds)"
            className={`p-2 rounded-lg border text-sm flex items-center gap-1.5 transition-all ${
              currentSound !== 'off' ? 'ring-2 ring-amber-400 font-medium' : ''
            }`}
            style={{
              backgroundColor: currentSound !== 'off' ? 'var(--accent-light)' : 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <Volume2 className={`w-4 h-4 ${currentSound !== 'off' ? 'animate-pulse text-amber-600' : ''}`} />
            <span className="hidden md:inline text-xs">
              {currentSound === 'off' ? 'Suasana' : currentSound === 'rain' ? '🌧️ Hujan' : currentSound === 'campfire' ? '🔥 Api' : '🌊 Ombak'}
            </span>
          </button>

          {/* Reading Streak */}
          <div 
            title={`Streak membaca: ${streakDays} hari berturut-turut!`}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: '#d97706'
            }}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{streakDays} Hari</span>
          </div>

          {/* Level / XP */}
          <button
            onClick={onOpenStats}
            title={`Level ${currentLevel} (${currentXP} XP) - Klik untuk lihat statistik`}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden xs:inline">Lv.</span>
            <span>{currentLevel}</span>
          </button>

          {/* Saved Quotes */}
          <button
            onClick={onOpenQuotes}
            title="Kutipan Tersimpan"
            className="p-2 rounded-lg border transition-colors hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <Bookmark className="w-4 h-4" />
          </button>

          {/* Stats Button */}
          <button
            onClick={onOpenStats}
            title="Statistik & Pencapaian"
            className="p-2 rounded-lg border transition-colors hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Theme Switcher */}
          <div className="flex items-center rounded-lg border p-0.5"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}>
            <button
              onClick={() => onThemeChange('sepia')}
              title="Kertas Hangat (Sepia)"
              className={`p-1.5 rounded-md transition-all ${
                currentTheme === 'sepia' ? 'shadow-sm font-bold' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: currentTheme === 'sepia' ? 'var(--bg-card)' : 'transparent',
                color: currentTheme === 'sepia' ? 'var(--accent)' : 'var(--text-secondary)'
              }}
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('light')}
              title="Siang Bersih (Light)"
              className={`p-1.5 rounded-md transition-all ${
                currentTheme === 'light' ? 'shadow-sm font-bold' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: currentTheme === 'light' ? 'var(--bg-card)' : 'transparent',
                color: currentTheme === 'light' ? 'var(--accent)' : 'var(--text-secondary)'
              }}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              title="Malam Nyaman (Dark)"
              className={`p-1.5 rounded-md transition-all ${
                currentTheme === 'dark' ? 'shadow-sm font-bold' : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: currentTheme === 'dark' ? 'var(--bg-card)' : 'transparent',
                color: currentTheme === 'dark' ? 'var(--accent)' : 'var(--text-secondary)'
              }}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
