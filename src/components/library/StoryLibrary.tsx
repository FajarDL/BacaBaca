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
  ShieldCheck,
  FileText,
  Brain,
  User,
  Compass
} from 'lucide-react';
import type { Story, StoryCategory } from '../../types';
import { parseMarkdownToStory } from '../../utils/markdownParser';
import { ReadingScienceModal } from '../readingScience/ReadingScienceModal';

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
  onDirectAddStoryData?: (storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>) => void;
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
  onDirectAddStoryData,
  onResetToDefault
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory>('Semua');
  const [isScienceModalOpen, setIsScienceModalOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docFileInputRef = useRef<HTMLInputElement>(null);

  const categories: StoryCategory[] = [
    'Semua',
    'Rangkuman & Modul',
    'Data & Tech',
    'Digital Marketing',
    'Filosofis & Esai',
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

  // Handle direct file upload (.md, .txt)
  const handleDocFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text && onDirectAddStoryData) {
          const parsed = parseMarkdownToStory(text, file.name);
          onDirectAddStoryData(parsed);
          alert(`Materi "${parsed.title}" berhasil diimpor dan siap dibaca!`);
        }
      };
      reader.readAsText(file);
    }
  };

  // Handle backup JSON file upload
  const handleBackupFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = onImportData(text);
          if (success) {
            alert('Catatan & data bacaan berhasil dipulihkan!');
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
      
      {/* Editorial Header Banner */}
      <section 
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border shadow-xs transition-all"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)'
        }}
      >
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border"
            style={{
              backgroundColor: 'var(--accent-light)',
              borderColor: 'var(--accent)',
              color: 'var(--accent-hover)'
            }}>
            <Sparkles className="w-3.5 h-3.5" />
            Ruang Baca Mandiri & Belajar Bebas Distraksi
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
            style={{ color: 'var(--text-primary)' }}>
            Membaca Lebih Santai, Fokus, & Bermakna
          </h1>

          <p className="text-xs sm:text-sm md:text-base leading-relaxed opacity-85"
            style={{ color: 'var(--text-secondary)' }}>
            Selamat datang di <strong>BacaBaca</strong>. Masukkan teks apa saja—mulai dari <strong>rangkuman webinar RevoU, modul belajar, artikel riset, esai, hingga buku</strong>. Nikmati membaca dengan tipografi terkalibrasi ilmiah, suara alam penunjang fokus, dan narasi audio interaktif.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={onAddNewStory}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <Plus className="w-4 h-4" />
              Tulis Catatan / Materi
            </button>

            <button
              onClick={() => docFileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border flex items-center gap-1.5 transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <FileText className="w-4 h-4 text-blue-600" />
              Impor File (.md / .txt)
            </button>
            <input
              type="file"
              ref={docFileInputRef}
              onChange={handleDocFileUpload}
              accept=".md,.txt,.markdown"
              className="hidden"
            />

            <button
              onClick={() => setIsScienceModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border flex items-center gap-1.5 transition-colors hover:bg-amber-500/10"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent-hover)',
                backgroundColor: 'var(--accent-light)'
              }}
              title="Pelajari riset psikologi & ergonomi membaca menyenangkan"
            >
              <Brain className="w-4 h-4 text-amber-600" />
              Sains Membaca 🔬
            </button>

            <button
              onClick={onOpenStats}
              className="px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Statistik Baca
            </button>
          </div>
        </div>

        {/* Subtle Decorative Graphic */}
        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none select-none text-9xl hidden md:block">
          📖
        </div>
      </section>

      {/* Featured Spotlight Card (If available and not actively searching) */}
      {featuredStory && !searchQuery && selectedCategory === 'Semua' && (
        <section 
          className="rounded-3xl border p-6 sm:p-8 transition-all hover:shadow-md relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  Rekomendasi Bacaan Pilihan
                </span>
                <span className="text-xs opacity-50">•</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md border"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  {featuredStory.category}
                </span>
              </div>

              <h2 
                onClick={() => onSelectStory(featuredStory)}
                className="text-xl sm:text-2xl font-bold cursor-pointer hover:text-amber-700 transition-colors leading-snug"
                style={{ color: 'var(--text-primary)' }}
              >
                {featuredStory.title}
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed opacity-85 line-clamp-2"
                style={{ color: 'var(--text-secondary)' }}>
                {featuredStory.summary}
              </p>

              <div className="flex items-center gap-4 text-xs pt-1 opacity-75"
                style={{ color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {featuredStory.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredStory.readingTimeMinutes} mnt baca
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectStory(featuredStory)}
              className="px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform hover:scale-105 flex-shrink-0"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <BookOpen className="w-4 h-4" />
              Mulai Baca Sekarang
            </button>
          </div>
        </section>
      )}

      {/* Search, Action Tools & Category Filter Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="text"
              placeholder="Cari materi, rangkuman, penulis, atau kata kunci..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition-all focus:ring-2 focus:ring-amber-500"
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
              title="Tulis Catatan / Materi Baru"
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <Plus className="w-4 h-4" />
              <span>Tulis</span>
            </button>

            <button
              onClick={() => docFileInputRef.current?.click()}
              title="Impor Dokumen Markdown (.md atau .txt)"
              className="p-2.5 rounded-xl border text-xs font-medium hover:bg-black/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <FileText className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={onExportData}
              title="Cadangkan / Ekspor Data ke File JSON"
              className="p-2.5 rounded-xl border text-xs font-medium hover:bg-black/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              title="Pulihkan / Impor Cadangan Data dari File JSON"
              className="p-2.5 rounded-xl border text-xs font-medium hover:bg-black/5 transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleBackupFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Category Filter Pills with Item Count */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'Semua' 
              ? stories.length 
              : stories.filter(s => s.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected ? 'shadow-xs font-bold' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--accent)' : 'var(--bg-secondary)',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border-color)',
                  color: isSelected ? '#fff' : 'var(--text-primary)'
                }}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/5'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Reading Materials Grid (Refined Editorial Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => {
          const isCompleted = completedStoryIds.includes(story.id);

          return (
            <div
              key={story.id}
              className="group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)'
              }}
            >
              {/* Card Top Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg" title={story.category}>
                    {story.coverEmoji}
                  </span>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Selesai
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border opacity-80"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      {story.category}
                    </span>
                  </div>
                </div>

                <h3 
                  onClick={() => onSelectStory(story)}
                  className="font-bold text-base sm:text-[17px] leading-snug group-hover:text-amber-700 transition-colors cursor-pointer line-clamp-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {story.title}
                </h3>

                <p className="text-xs opacity-75 font-medium flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <User className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                  <span className="truncate">{story.author}</span>
                </p>

                {story.attribution && (
                  <p className="text-[10px] italic text-amber-800/80 truncate">
                    ℹ️ {story.attribution}
                  </p>
                )}

                <p className="text-xs leading-relaxed opacity-80 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {story.summary}
                </p>
              </div>

              {/* Card Bottom Meta & Actions */}
              <div className="pt-4 mt-4 border-t flex items-center justify-between text-xs"
                style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-1 font-medium opacity-75 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
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
                    title="Edit Teks Ini"
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
                    title="Hapus Teks Ini"
                    className="p-1.5 rounded-lg border hover:bg-red-500/10 hover:text-red-600 transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Read Action Button */}
                  <button
                    onClick={() => onSelectStory(story)}
                    className="inline-flex items-center gap-1 font-bold text-amber-700 pl-1 group-hover:translate-x-0.5 transition-transform text-xs"
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
      <section className="p-5 rounded-2xl border text-xs space-y-2.5"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)'
        }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kaidah Etika Belajar & Kepatuhan Hak Cipta (*Fair Use*)</span>
          </div>

          <button
            onClick={() => setIsScienceModalOpen(true)}
            className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1"
          >
            <Brain className="w-3.5 h-3.5" />
            Baca Panduan Sains Membaca
          </button>
        </div>

        <p className="leading-relaxed opacity-85 text-xs">
          Proyek <strong>BacaBaca</strong> dirancang untuk mendukung studi mandiri (*personal study / Fair Use*). Seluruh data catatan, modul, dan rangkuman webinar tersimpan privat di perangkat lokal Anda. Kami mendorong pengguna untuk merangkum dengan parafrase bahasa sendiri dan menyertakan atribusi sumber materi secara jujur.
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-black/5 text-[11px]">
          <span>Data tersimpan secara lokal di peramban Anda.</span>
          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1 text-amber-700 hover:underline"
            title="Kembalikan daftar materi ke bawaan awal"
          >
            <RotateCcw className="w-3 h-3" />
            Reset ke Materi Bawaan
          </button>
        </div>
      </section>

      {/* Motivational Reading Quote Footer */}
      <footer className="pt-4 text-center border-t space-y-2 opacity-75"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
        <p className="text-xs italic font-reading-serif">
          "Membaca bukanlah tentang menyelesaikan teks secepat mungkin, melainkan tentang apa yang tumbuh di dalam dirimu saat kata-kata itu dipahami."
        </p>
        <p className="text-[11px]">
          © {new Date().getFullYear()} BacaBaca • Ruang Membaca Nyaman untuk Segala Hal
        </p>
      </footer>

      {/* Reading Science Guide Modal */}
      <ReadingScienceModal
        isOpen={isScienceModalOpen}
        onClose={() => setIsScienceModalOpen(false)}
      />

    </div>
  );
};
