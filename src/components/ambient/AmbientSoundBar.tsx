import React from 'react';
import { CloudRain, Flame, Waves, VolumeX, X } from 'lucide-react';
import type { AmbientSoundType } from '../../types';

interface AmbientSoundBarProps {
  isOpen: boolean;
  onClose: () => void;
  currentSound: AmbientSoundType;
  volume: number;
  onSelectSound: (sound: AmbientSoundType) => void;
  onVolumeChange: (vol: number) => void;
}

export const AmbientSoundBar: React.FC<AmbientSoundBarProps> = ({
  isOpen,
  onClose,
  currentSound,
  volume,
  onSelectSound,
  onVolumeChange
}) => {
  if (!isOpen) return null;

  const sounds: { type: AmbientSoundType; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      type: 'rain',
      label: 'Hujan Rintik',
      desc: 'Rintik hujan lembut di kaca jendela',
      icon: <CloudRain className="w-5 h-5 text-blue-500" />
    },
    {
      type: 'campfire',
      label: 'Perapian Hangat',
      desc: 'Gemeretak kayu dan api yang menenangkan',
      icon: <Flame className="w-5 h-5 text-amber-500" />
    },
    {
      type: 'waves',
      label: 'Deburan Ombak',
      desc: 'Irama laut yang lambat dan damai',
      icon: <Waves className="w-5 h-5 text-teal-500" />
    },
    {
      type: 'off',
      label: 'Hening',
      desc: 'Tanpa suara latar belakang',
      icon: <VolumeX className="w-5 h-5 text-gray-400" />
    }
  ];

  return (
    <div 
      className="border-b shadow-md transition-all animate-in slide-in-from-top duration-200"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)'
      }}
    >
      <div className="max-w-5xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wider uppercase opacity-75"
              style={{ color: 'var(--text-secondary)' }}>
              Suasana Membaca (Ambient Sound)
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          {sounds.map((s) => {
            const isSelected = currentSound === s.type;
            return (
              <button
                key={s.type}
                onClick={() => onSelectSound(s.type)}
                className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  isSelected 
                    ? 'ring-2 ring-amber-500 shadow-sm' 
                    : 'hover:opacity-90'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--bg-card)' : 'transparent',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border-color)'
                }}
              >
                <div className="p-1.5 rounded-lg bg-black/5 flex-shrink-0">
                  {s.icon}
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-xs truncate"
                    style={{ color: 'var(--text-primary)' }}>
                    {s.label}
                  </div>
                  <div className="text-[10px] opacity-70 truncate"
                    style={{ color: 'var(--text-secondary)' }}>
                    {s.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Volume Slider */}
        {currentSound !== 'off' && (
          <div className="flex items-center gap-3 pt-2 border-t"
            style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-xs font-medium"
              style={{ color: 'var(--text-secondary)' }}>
              Volume Suasana:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="flex-1 accent-amber-600 h-1.5 bg-gray-300 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-mono font-medium min-w-8"
              style={{ color: 'var(--text-secondary)' }}>
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
