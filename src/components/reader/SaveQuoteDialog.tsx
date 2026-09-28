import React from 'react';
import { X, Bookmark, Quote as QuoteIcon } from 'lucide-react';

interface SaveQuoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  storyTitle: string;
  storyAuthor: string;
  onConfirmSave: () => void;
}

export const SaveQuoteDialog: React.FC<SaveQuoteDialogProps> = ({
  isOpen,
  onClose,
  selectedText,
  storyTitle,
  storyAuthor,
  onConfirmSave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden p-6 space-y-4"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base">Simpan Kutipan Mutiara</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-xl border relative"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}>
          <QuoteIcon className="w-6 h-6 text-amber-500/20 absolute top-2 left-2" />
          <p className="text-sm font-reading-serif italic relative z-10 pl-4 leading-relaxed"
            style={{ color: 'var(--text-primary)' }}>
            "{selectedText}"
          </p>
          <div className="text-right text-xs mt-3 font-medium opacity-75"
            style={{ color: 'var(--text-secondary)' }}>
            — {storyTitle} ({storyAuthor})
          </div>
        </div>

        <p className="text-xs opacity-75 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Kutipan ini akan disimpan ke galeri kutipan pribadi Anda dan menambah +15 XP membaca.
        </p>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            Batal
          </button>
          <button
            onClick={() => {
              onConfirmSave();
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-105"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Simpan ke Galeri
          </button>
        </div>
      </div>
    </div>
  );
};
