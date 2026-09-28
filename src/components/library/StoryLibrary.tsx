import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';
import type { Story, StoryCategory } from '../../types';

interface StoryLibraryProps {
  stories: Story[];
  completedStoryIds: string[];
  onSelectStory: (story: Story) => void;
  onOpenStats: () => void;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  stories,
  completedStoryIds,
  onSelectStory,
  onOpenStats
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory>('Semua');

  const categories: StoryCategory[] = [
    'Semua',
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
      story.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategory === 'Semua' || story.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredStory = stories[0];

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
            Membaca Tanpa Beban, Mengalir dengan Makna
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--text-primary)' }}>
            Temukan Kesenangan dalam Setiap Lembar Kata
          </h1>

          <p className="text-sm sm:text-base leading-relaxed opacity-80"
            style={{ color: 'var(--text-secondary)' }}>
            Selamat datang di <strong>BacaBaca</strong>. Di sini, Anda dapat menikmati kisah-kisah bernutrisi dengan suara latar alam yang menenangkan, narasi suara interaktif, serta ruang refleksi yang menyegarkan pikiran.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectStory(featuredStory)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <BookOpen className="w-4 h-4" />
              Baca Rekomendasi Hari Ini
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

      {/* Search & Category Filter Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Cari cerita, penulis, atau kata kunci..."
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

          <div className="text-xs font-semibold opacity-75 sm:text-right"
            style={{ color: 'var(--text-secondary)' }}>
            Menampilkan {filteredStories.length} cerita
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
              onClick={() => onSelectStory(story)}
              className="group rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer relative overflow-hidden"
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

                  <div className="flex items-center gap-1.5">
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selesai
                      </span>
                    )}
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border opacity-75"
                      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                      {story.category}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-base sm:text-lg mb-1 leading-snug group-hover:text-amber-600 transition-colors"
                  style={{ color: 'var(--text-primary)' }}>
                  {story.title}
                </h3>

                <p className="text-xs opacity-75 font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Oleh {story.author}
                </p>

                <p className="text-xs leading-relaxed opacity-80 line-clamp-3 mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {story.summary}
                </p>
              </div>

              {/* Card Bottom Meta & Button */}
              <div className="pt-4 border-t flex items-center justify-between text-xs"
                style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-1 font-medium opacity-75" style={{ color: 'var(--text-secondary)' }}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{story.readingTimeMinutes} mnt baca</span>
                </div>

                <span className="inline-flex items-center gap-1 font-bold text-amber-600 group-hover:translate-x-1 transition-transform">
                  Mulai Baca
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Motivational Reading Quote Footer */}
      <footer className="pt-8 text-center border-t space-y-2 opacity-75"
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
