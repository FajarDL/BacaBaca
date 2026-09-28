import React, { useState, useRef } from 'react';
import { 
  Search, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight,
  Plus,
  Edit3,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import type { Story, StoryCategory } from '../../types';

interface StoryLibraryProps {
  stories: Story[];
  completedStoryIds: string[];
  onSelectStory: (story: Story) => void;
  onOpenStats: () => void;
  onAddNewStory: () => void;
  onEditStory: (story: Story) => void;
  onDeleteStory: (story: Story) => void;
  onExportData: () => void;
  onImportData: (jsonString: string) => boolean;
  onResetToDefault: () => void;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  stories,
  completedStoryIds,
  onSelectStory,
  onOpenStats,
  onAddNewStory,
  onEditStory,
  onDeleteStory,
  onExportData,
  onImportData,
  onResetToDefault
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory>('Semua');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories: StoryCategory[] = [
    'Semua',
    'Edukasi & Rangkuman',
    'Teknologi & Bisnis',
    'Filosofis',
    'Petualangan',
    'Fabel & Dongeng',
    'Inspirasi',
    'Sains & Alam'
  ];

  const filteredStories = stories.filter((story) => {
    const matchesSearch = 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (story.attribution && story.attribution.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'Semua' || story.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredStory = stories[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = onImportData(text);
          if (success) {
            alert('Catatan & data bacaan berhasil diimpor!');
          } else {
            alert('Format file JSON tidak valid. Pastikan file backup berasal dari BacaBaca.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      
      {/* Welcome Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border shadow-sm transition-all"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)'
        }}>
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border"
            style={{
              backgroundColor: 'var(--accent-light)',
              borderColor: 'var(--accent)',
              color: 'var(--accent-hover)'
            }}>
            <Sparkles className="w-3.5 h-3.5" />
            Membaca Nyaman & Rangkuman Belajar Pribadi
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}>
            Temukan Kesenangan dalam Setiap Lembar Kata
          </h1>

          <p className="text-sm sm:text-base leading-relaxed opacity-80"
            style={{ color: 'var(--text-secondary)' }}>
            Selamat datang di <strong>BacaBaca</strong>. Nikmati kisah-kisah penuh hikmah dan <strong>catatan rangkuman belajar Anda (mis. RevoU / kursus / buku)</strong> dalam lingkungan membaca yang tenang, bebas distraksi, dan bernutrisi tinggi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            {featuredStory && (
              <button
                onClick={() => onSelectStory(featuredStory)}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
                style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
              >
                <BookOpen className="w-4 h-4" />
                Baca Rekomendasi Hari Ini
              </button>
            )}

            <button
              onClick={onAddNewStory}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border flex items-center gap-1.5 transition-all hover:bg-black/5"
              style={{
                borderColor: 'var(--accent)',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--text-primary)'
              }}
            >
              <Plus className="w-4 h-4 text-amber-600" />
              Tambah / Tulis Rangkuman Baru
            </button>

            <button
              onClick={onOpenStats}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              Lihat Jejak Membaca
            </button>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="absolute right-4 -bottom-6 text-8xl sm:text-9xl opacity-20 pointer-events-none select-none">
          📖
        </div>
      </section>

      {/* Search, Actions & Category Filter Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Cari cerita, rangkuman, penulis, atau topik belajar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-amber-500"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Quick Action Tools: Add, Export, Import */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAddNewStory}
              title="Tulis Rangkuman / Bacaan Baru"
              className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Bacaan</span>
            </button>

            <button
              onClick={onExportData}
              title="Cadangkan / Ekspor Data ke File JSON"
              className="p-2 rounded-xl border text-xs font-medium hover:bg-black/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Pulihkan / Impor Data dari File JSON"
              className="p-2 rounded-xl border text-xs font-medium hover:bg-black/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  isSelected ? 'shadow-sm font-bold' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-secondary)',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border-color)',
                  color: isSelected ? '#fff' : 'var(--text-primary)'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Story Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => {
          const isCompleted = completedStoryIds.includes(story.id);

          return (
            <div
              key={story.id}
              className="group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              {/* Card Top */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  {/* Emoji Cover badge */}
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform"
                    style={{ borderColor: 'var(--border-color)' }}>
                    {story.coverEmoji}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Selesai
                      </span>
                    )}
                    {story.isCustom && (
                      <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        Kustom
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border opacity-75"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      {story.category}
                    </span>
                  </div>
                </div>

                <h3 
                  onClick={() => onSelectStory(story)}
                  className="font-bold text-base sm:text-lg mb-1 leading-snug group-hover:text-amber-600 transition-colors cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {story.title}
                </h3>

                <p className="text-xs opacity-75 font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Oleh <span className="font-semibold">{story.author}</span>
                </p>

                {story.attribution && (
                  <p className="text-[10px] italic text-amber-800/80 mb-2 truncate">
                    ℹ️ {story.attribution}
                  </p>
                )}

                <p className="text-xs leading-relaxed opacity-80 line-clamp-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {story.summary}
                </p>
              </div>

              {/* Card Bottom Meta & Actions */}
              <div className="pt-4 border-t flex items-center justify-between text-xs"
                style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-1 font-medium opacity-75" style={{ color: 'var(--text-secondary)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{story.readingTimeMinutes} mnt baca</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Edit Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStory(story);
                    }}
                    title="Edit Bacaan Ini"
                    className="p-1.5 rounded-lg border hover:bg-black/5 transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  {/* Delete Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteStory(story);
                    }}
                    title="Hapus Bacaan Ini"
                    className="p-1.5 rounded-lg border hover:bg-red-500/10 hover:text-red-600 transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Read Story Action */}
                  <button
                    onClick={() => onSelectStory(story)}
                    className="inline-flex items-center gap-1 font-bold text-amber-600 pl-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Ethical & Copyright Compliance Notice Banner */}
      <section className="p-5 rounded-2xl border text-xs space-y-2"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)'
        }}>
        <div className="flex items-center gap-2 font-bold text-amber-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Komitmen Etika & Kepatuhan Hak Cipta
        </div>
        <p className="leading-relaxed opacity-85">
          Proyek <strong>BacaBaca</strong> menghargai integritas akademik dan hak cipta. Seluruh catatan, rangkuman, dan materi yang dibuat di platform ini disimpan secara lokal di perangkat pribadi Anda untuk tujuan <em>personal study</em> / studi mandiri (*Fair Use*). Kami mengimbau seluruh pengguna untuk menyusun rangkuman menggunakan kalimat hasil sintesis pemahaman sendiri (parafrase) dan menyertakan atribusi sumber materi secara jujur dan transparan.
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-black/5 text-[11px]">
          <span>Data tersimpan secara privat di peramban lokal Anda.</span>
          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1 text-amber-700 hover:underline"
            title="Kembalikan daftar cerita ke bawaan awal"
          >
            <RotateCcw className="w-3 h-3" />
            Reset ke Cerita Bawaan
          </button>
        </div>
      </section>

      {/* Motivational Reading Quote Footer */}
      <footer className="pt-4 text-center border-t space-y-2 opacity-75"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
        <p className="text-xs italic font-reading-serif">
          "Membaca bukanlah tentang menyelesaikan buku secepat mungkin, melainkan tentang apa yang tumbuh di dalam dirimu saat kata-kata itu lewat."
        </p>
        <p className="text-[11px]">
          © {new Date().getFullYear()} BacaBaca • Ruang Membaca Menyenangkan untuk Semua
        </p>
      </footer>

    </div>
  );
};
