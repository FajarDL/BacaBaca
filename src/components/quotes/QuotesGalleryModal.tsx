import React, { useState } from 'react';
import { X, Bookmark, Copy, Check, Trash2, Quote as QuoteIcon } from 'lucide-react';
import type { SavedQuote } from '../../types';

interface QuotesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: SavedQuote[];
  onRemoveQuote: (id: string) => void;
}

export const QuotesGalleryModal: React.FC<QuotesGalleryModalProps> = ({
  isOpen,
  onClose,
  quotes,
  onRemoveQuote
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string, title: string) => {
    navigator.clipboard.writeText(`"${text}" — ${title}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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
            <Bookmark className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold">Koleksi Kutipan Hikmah</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {quotes.length === 0 ? (
            <div className="text-center py-12 px-4">
              <QuoteIcon className="w-12 h-12 mx-auto text-amber-500/40 mb-3" />
              <h3 className="font-semibold text-base mb-1">Belum Ada Kutipan Tersimpan</h3>
              <p className="text-xs max-w-xs mx-auto opacity-75" style={{ color: 'var(--text-secondary)' }}>
                Saat membaca materi atau artikel, Anda dapat menyorot kalimat penting untuk menyimpannya sebagai kartu kutipan di sini.
              </p>
            </div>
          ) : (
            quotes.map((q) => (
              <div 
                key={q.id}
                className="p-4 rounded-xl border relative group transition-all"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)'
                }}
              >
                <QuoteIcon className="w-6 h-6 text-amber-500/30 absolute top-3 left-3 -z-0" />
                
                <p className="text-sm font-reading-serif italic leading-relaxed relative z-10 pl-5 mb-3"
                  style={{ color: 'var(--text-primary)' }}>
                  "{q.text}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t text-xs"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  <div>
                    <span className="font-semibold block truncate max-w-[200px]"
                      style={{ color: 'var(--text-primary)' }}>
                      {q.storyTitle}
                    </span>
                    <span className="text-[10px] opacity-75">
                      {q.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(q.id, q.text, q.storyTitle)}
                      title="Salin Kutipan"
                      className="p-1.5 rounded-lg hover:bg-black/10 transition-colors text-xs flex items-center gap-1"
                    >
                      {copiedId === q.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-medium">Tersalin</span>
                        </>
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onRemoveQuote(q.id)}
                      title="Hapus Kutipan"
                      className="p-1.5 rounded-lg hover:bg-red-500/10 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end"
          style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
