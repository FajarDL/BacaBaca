import React from 'react';
import { Sparkles, Brain, Eye, Clock, Heart, X, CheckCircle2 } from 'lucide-react';

interface ReadingScienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReadingScienceModal: React.FC<ReadingScienceModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b"
          style={{ borderColor: 'var(--border-color)' }}>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
              style={{
                backgroundColor: 'var(--accent-light)',
                borderColor: 'var(--accent)',
                color: 'var(--accent-hover)'
              }}>
              <Brain className="w-3.5 h-3.5" />
              Riset Psikologi & Ergonomi Membaca
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}>
              Sains di Balik Membaca yang Menyenangkan
            </h2>
            <p className="text-xs sm:text-sm opacity-80"
              style={{ color: 'var(--text-secondary)' }}>
              Berdasarkan studi neurosains kognitif, psikologi motivasi, dan riset tipografi layar.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sections */}
        <div className="space-y-5 text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}>

          {/* Point 1: Flow State */}
          <div className="p-4 rounded-2xl border space-y-2"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>1. Memasuki 'Flow State' (Mihaly Csikszentmihalyi & Nell, 1988)</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Riset tentang <em>Ludic Reading</em> (membaca untuk kenikmatan) menunjukkan bahwa pembaca yang paling menikmati teks adalah mereka yang berhasil masuk ke kondisi <strong>Flow</strong>—kondisi di mana kesadaran menyatu dengan bahan bacaan. Hal ini dicapai dengan:
            </p>
            <ul className="text-xs space-y-1.5 pt-1 pl-2 list-none opacity-90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Zero Distraction:</strong> Menghilangkan banner iklan, popup, dan sidebar yang membebani memori kerja otak (*cognitive load*).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Suara Latar Alam (Pink Noise):</strong> Suara hujan atau ombak menyamarkan suara acak lingkungan dan menstimulasi gelombang alfa otak untuk konsentrasi rileks.</span>
              </li>
            </ul>
          </div>

          {/* Point 2: Ergonomi Tipografi */}
          <div className="p-4 rounded-2xl border space-y-2"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>2. Ergonomi Layar: Ukuran Font, Lebar Kolom & Kelelahan Mata</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Studi dari <em>Nielsen Norman Group</em> dan <em>Harvard Reading Lab</em> menemukan aturan emas kenyamanan membaca di layar:
            </p>
            <ul className="text-xs space-y-1.5 pt-1 pl-2 list-none opacity-90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Ukuran Huruf Ideal (16–18px):</strong> Teks yang terlalu kecil memicu ketegangan otot mata, sedangkan teks yang terlalu besar (22px+) memecah ritme sakadik mata dan membuat bacaan terasa lambat.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Panjang Baris Optimal (Measure 50–75 Karakter):</strong> Kolom teks selebar ~640–700px memastikan mata tidak "kehilangan jejak" saat melompat dari akhir baris ke awal baris berikutnya.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Kertas Hangat (Sepia/Parchment):</strong> Menghilangkan silau kontras ekstrem putih-hitam murni (*glare halation*), terbukti menurunkan kelelahan mata hingga 30% dalam sesi baca 20+ menit.</span>
              </li>
            </ul>
          </div>

          {/* Point 3: Self-Determination Theory */}
          <div className="p-4 rounded-2xl border space-y-2"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>3. Teori Determinasi Diri (Guthrie & Wigfield, 2000)</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Membaca menjadi sangat menyenangkan bila didorong oleh <strong>motivasi intrinsik</strong>, bukan kewajiban paksaan:
            </p>
            <ul className="text-xs space-y-1.5 pt-1 pl-2 list-none opacity-90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Otonomi (Choice):</strong> Anda memegang kendali penuh memasukkan materi apa saja yang ingin dipelajari (rangkuman webinar, catatan kerja, modul belajar) serta mengatur gaya baca Anda sendiri.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Kompetensi (Chunking):</strong> Teks yang dipecah per bab ringkas dengan estimasi waktu (misal "5 mnt baca") memberi rasa pencapaian (*sense of progress*) yang melepaskan dopamin alami di otak.</span>
              </li>
            </ul>
          </div>

          {/* Point 4: Pacing & Micro-breaks */}
          <div className="p-4 rounded-2xl border space-y-2"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2 font-bold text-amber-700">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>4. Refleksi Aktif & Menandai Kutipan Emas</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Studi pembelajaran kognitif membuktikan bahwa menyimpan kutipan favorit dan merenungkan 1 pertanyaan di akhir bacaan melipatgandakan retensi ingatan jangka panjang (*Long-Term Potentiation*) dibanding sekadar membaca sepintas lalu.
            </p>
          </div>

        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-xs opacity-75">
            Diterapkan langsung di seluruh fitur BacaBaca
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-transform hover:scale-105"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Tutup & Mulai Membaca
          </button>
        </div>

      </div>
    </div>
  );
};
