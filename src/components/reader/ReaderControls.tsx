import React from 'react';
import { Sliders, X, Gauge, Check } from 'lucide-react';
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

  const fontSizes: { size: FontSize; label: string; desc: string }[] = [
    { size: 'sm', label: 'Ringkas', desc: '15px' },
    { size: 'base', label: 'Standar ★', desc: '17.5px' },
    { size: 'lg', label: 'Nyaman', desc: '19px' },
    { size: 'xl', label: 'Besar', desc: '21px' },
    { size: '2xl', label: 'Ekstra', desc: '23px' }
  ];

  return (
    <div 
      className="p-5 rounded-2xl shadow-xl border mb-8 animate-in slide-in-from-top duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="flex items-center justify-between pb-3 border-b mb-4"
        style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sliders className="w-4 h-4 text-amber-600" />
          <span>Pengaturan Kenyamanan & Tipografi Baca</span>
        </div>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-black/10 transition-colors"
          title="Tutup Pengaturan"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Font Style Selection */}
        <div>
          <label className="text-xs font-semibold block mb-2 opacity-85"
            style={{ color: 'var(--text-secondary)' }}>
            Gaya Huruf (Font):
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onFontFamilyChange('serif')}
              className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                fontFamily === 'serif' ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: fontFamily === 'serif' ? 'var(--accent-light)' : 'var(--bg-secondary)',
                borderColor: fontFamily === 'serif' ? 'var(--accent)' : 'var(--border-color)'
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-reading-serif text-sm font-bold">Serif Buku</span>
                {fontFamily === 'serif' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <p className="text-[10px] opacity-70 font-sans">Lora / Merriweather (Editorial)</p>
            </button>

            <button
              onClick={() => onFontFamilyChange('sans')}
              className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                fontFamily === 'sans' ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: fontFamily === 'sans' ? 'var(--accent-light)' : 'var(--bg-secondary)',
                borderColor: fontFamily === 'sans' ? 'var(--accent)' : 'var(--border-color)'
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-reading-sans text-sm font-bold">Sans Modern</span>
                {fontFamily === 'sans' && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </div>
              <p className="text-[10px] opacity-70 font-sans">Plus Jakarta Sans (Bersih)</p>
            </button>
          </div>
        </div>

        {/* Font Size Adjuster (15px to 23px) */}
        <div>
          <label className="text-xs font-semibold block mb-2 opacity-85"
            style={{ color: 'var(--text-secondary)' }}>
            Ukuran Huruf Teks:
          </label>
          <div className="grid grid-cols-5 rounded-xl border overflow-hidden p-1 gap-1"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            {fontSizes.map((item) => (
              <button
                key={item.size}
                onClick={() => onFontSizeChange(item.size)}
                className={`py-2 px-1 text-center rounded-lg transition-all ${
                  fontSize === item.size ? 'shadow-sm font-bold' : 'opacity-65 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: fontSize === item.size ? 'var(--bg-card)' : 'transparent',
                  color: fontSize === item.size ? 'var(--accent)' : 'var(--text-primary)'
                }}
              >
                <div className="text-xs">{item.label}</div>
                <div className="text-[9px] opacity-60">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* TTS Speed Rate */}
        <div>
          <label className="text-xs font-semibold block mb-2 opacity-85"
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
                className={`flex-1 py-2 px-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                  speechRate === r.rate ? 'ring-2 ring-amber-500 font-bold' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: speechRate === r.rate ? 'var(--accent-light)' : 'var(--bg-secondary)',
                  borderColor: speechRate === r.rate ? 'var(--accent)' : 'var(--border-color)'
                }}
              >
                <Gauge className="w-3.5 h-3.5" />
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Focus Ruler Toggle */}
        <div>
          <label className="text-xs font-semibold block mb-2 opacity-85"
            style={{ color: 'var(--text-secondary)' }}>
            Garis Pemandu Fokus (Focus Ruler):
          </label>
          <button
            onClick={onToggleFocusRuler}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
              showFocusRuler ? 'ring-2 ring-amber-500 font-bold' : 'opacity-75 hover:opacity-100'
            }`}
            style={{
              backgroundColor: showFocusRuler ? 'var(--accent-light)' : 'var(--bg-secondary)',
              borderColor: showFocusRuler ? 'var(--accent)' : 'var(--border-color)'
            }}
          >
            <span>{showFocusRuler ? '👁️ Garis Fokus Aktif (Mengikuti Kursor)' : 'Garis Fokus Nonaktif'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
