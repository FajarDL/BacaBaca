import React from 'react';
import { Type, Sliders, X, Gauge } from 'lucide-react';
import type { FontFamily, FontSize } from '../../types';

interface ReaderControlsProps {
  isOpen: boolean;
  onClose: () => void;
  fontFamily: FontFamily;
  onFontFamilyChange: (font: FontFamily) => void;
  fontSize: FontSize;
  onFontSizeChange: (size: FontSize) => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
  showFocusRuler: boolean;
  onToggleFocusRuler: () => void;
}

export const ReaderControls: React.FC<ReaderControlsProps> = ({
  isOpen,
  onClose,
  fontFamily,
  onFontFamilyChange,
  fontSize,
  onFontSizeChange,
  speechRate,
  onSpeechRateChange,
  showFocusRuler,
  onToggleFocusRuler
}) => {
  if (!isOpen) return null;

  const fontSizes: { size: FontSize; label: string }[] = [
    { size: 'sm', label: 'A-' },
    { size: 'base', label: 'A' },
    { size: 'lg', label: 'A+' },
    { size: 'xl', label: 'A++' },
    { size: '2xl', label: 'A+++' }
  ];

  return (
    <div 
      className="p-4 rounded-2xl shadow-xl border mb-6 animate-in slide-in-from-top duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="flex items-center justify-between pb-3 border-b mb-3"
        style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-75"
          style={{ color: 'var(--text-secondary)' }}>
          <Sliders className="w-4 h-4" />
          Pengaturan Kenyamanan Baca
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Font Style Selection */}
        <div>
          <label className="text-xs font-semibold block mb-1.5 opacity-80"
            style={{ color: 'var(--text-secondary)' }}>
            Gaya Huruf (Font):
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onFontFamilyChange('serif')}
              className={`py-2 px-3 rounded-xl border text-xs font-reading-serif flex items-center justify-center gap-1.5 transition-all ${
                fontFamily === 'serif' ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70'
              }`}
              style={{
                backgroundColor: fontFamily === 'serif' ? 'var(--accent-light)' : 'var(--bg-secondary)',
                borderColor: fontFamily === 'serif' ? 'var(--accent)' : 'var(--border-color)'
              }}
            >
              <Type className="w-3.5 h-3.5" />
              Serif Buku Klasik
            </button>
            <button
              onClick={() => onFontFamilyChange('sans')}
              className={`py-2 px-3 rounded-xl border text-xs font-reading-sans flex items-center justify-center gap-1.5 transition-all ${
                fontFamily === 'sans' ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70'
              }`}
              style={{
                backgroundColor: fontFamily === 'sans' ? 'var(--accent-light)' : 'var(--bg-secondary)',
                borderColor: fontFamily === 'sans' ? 'var(--accent)' : 'var(--border-color)'
              }}
            >
              <Type className="w-3.5 h-3.5" />
              Sans Modern
            </button>
          </div>
        </div>

        {/* Font Size Adjuster */}
        <div>
          <label className="text-xs font-semibold block mb-1.5 opacity-80"
            style={{ color: 'var(--text-secondary)' }}>
            Ukuran Teks:
          </label>
          <div className="flex rounded-xl border overflow-hidden p-1 gap-1"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            {fontSizes.map((item) => (
              <button
                key={item.size}
                onClick={() => onFontSizeChange(item.size)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  fontSize === item.size ? 'shadow-sm' : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: fontSize === item.size ? 'var(--bg-card)' : 'transparent',
                  color: fontSize === item.size ? 'var(--accent)' : 'var(--text-primary)'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* TTS Speed Rate */}
        <div>
          <label className="text-xs font-semibold block mb-1.5 opacity-80"
            style={{ color: 'var(--text-secondary)' }}>
            Kecepatan Narasi Suara:
          </label>
          <div className="flex items-center gap-2">
            {[
              { rate: 0.8, label: '0.8x Santai' },
              { rate: 1.0, label: '1.0x Normal' },
              { rate: 1.2, label: '1.2x Cepat' }
            ].map((r) => (
              <button
                key={r.rate}
                onClick={() => onSpeechRateChange(r.rate)}
                className={`flex-1 py-1.5 px-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1 transition-all ${
                  speechRate === r.rate ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70'
                }`}
                style={{
                  backgroundColor: speechRate === r.rate ? 'var(--accent-light)' : 'var(--bg-secondary)',
                  borderColor: speechRate === r.rate ? 'var(--accent)' : 'var(--border-color)'
                }}
              >
                <Gauge className="w-3 h-3" />
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Ruler Toggle */}
        <div>
          <label className="text-xs font-semibold block mb-1.5 opacity-80"
            style={{ color: 'var(--text-secondary)' }}>
            Garis Pemandu Baca (Focus Ruler):
          </label>
          <button
            onClick={onToggleFocusRuler}
            className={`w-full py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
              showFocusRuler ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70'
            }`}
            style={{
              backgroundColor: showFocusRuler ? 'var(--accent-light)' : 'var(--bg-secondary)',
              borderColor: showFocusRuler ? 'var(--accent)' : 'var(--border-color)'
            }}
          >
            <span>{showFocusRuler ? '👁️ Garis Fokus Aktif' : 'Garis Fokus Nonaktif'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
