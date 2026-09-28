import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  FileText,
  HelpCircle,
  Upload
} from 'lucide-react';
import type { Story, StoryCategory, StoryChapter, ReflectionQuestion } from '../../types';
import { parseMarkdownToStory } from '../../utils/markdownParser';

interface StoryEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyToEdit?: Story | null;
  onSaveStory: (storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const StoryEditorModal: React.FC<StoryEditorModalProps> = ({
  isOpen,
  onClose,
  storyToEdit,
  onSaveStory
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverEmoji, setCoverEmoji] = useState('📚');
  const [category, setCategory] = useState<StoryCategory>('Rangkuman & Modul');
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Menengah' | 'Mendalam'>('Menengah');
  const [readingTime, setReadingTime] = useState<number>(3);
  const [summary, setSummary] = useState('');
  const [moralLesson, setMoralLesson] = useState('');
  const [attribution, setAttribution] = useState('Catatan Belajar Pribadi • Sintesis Pemahaman Mandiri');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chapter State
  const [chapters, setChapters] = useState<{ id: string; title: string; rawText: string }[]>([
    {
      id: 'c1',
      title: 'Bagian 1: Pengantar & Konsep Utama',
      rawText: 'Tuliskan rangkuman atau materi bab pertama Anda di sini. Setiap baris baru atau spasi antar paragraf akan otomatis tersusun rapi saat dibaca.'
    }
  ]);

  // Optional Quiz State
  const [includeQuiz, setIncludeQuiz] = useState<boolean>(true);
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState<string[]>(['', '', '', '']);
  const [quizCorrectIndex, setQuizCorrectIndex] = useState<number>(0);
  const [quizExplanation, setQuizExplanation] = useState('');
  const [quizThoughtPrompt, setQuizThoughtPrompt] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (storyToEdit) {
      setTitle(storyToEdit.title);
      setAuthor(storyToEdit.author);
      setCoverEmoji(storyToEdit.coverEmoji || '📚');
      setCategory(storyToEdit.category);
      setDifficulty(storyToEdit.difficulty);
      setReadingTime(storyToEdit.readingTimeMinutes);
      setSummary(storyToEdit.summary);
      setMoralLesson(storyToEdit.moralLesson || '');
      setAttribution(storyToEdit.attribution || '');
      setChapters(
        storyToEdit.chapters.map((c, idx) => ({
          id: c.id || `c${idx + 1}`,
          title: c.title,
          rawText: c.paragraphs.join('\n\n')
        }))
      );
      if (storyToEdit.reflections && storyToEdit.reflections.length > 0) {
        setIncludeQuiz(true);
        const q = storyToEdit.reflections[0];
        setQuizQuestion(q.question);
        setQuizOptions(q.options);
        setQuizCorrectIndex(q.correctIndex ?? 0);
        setQuizExplanation(q.explanation);
        setQuizThoughtPrompt(q.thoughtPrompt || '');
      } else {
        setIncludeQuiz(false);
      }
    } else {
      // Reset form
      setTitle('');
      setAuthor('Pembelajar Mandiri');
      setCoverEmoji('🚀');
      setCategory('Rangkuman & Modul');
      setDifficulty('Menengah');
      setReadingTime(3);
      setSummary('');
      setMoralLesson('');
      setAttribution('Catatan Belajar Pribadi • Sintesis Pemahaman Mandiri');
      setChapters([
        {
          id: 'c1',
          title: 'Bagian 1: Konsep & Latar Belakang',
          rawText: ''
        }
      ]);
      setIncludeQuiz(false);
      setQuizQuestion('');
      setQuizOptions(['', '', '', '']);
      setQuizExplanation('');
      setQuizThoughtPrompt('');
    }
  }, [storyToEdit, isOpen]);

  if (!isOpen) return null;

  // Handle uploading a Markdown or TXT file directly
  const handleMarkdownUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const parsed = parseMarkdownToStory(text, file.name);
          setTitle(parsed.title);
          setAuthor(parsed.author);
          setCoverEmoji(parsed.coverEmoji);
          setCategory(parsed.category);
          setDifficulty(parsed.difficulty);
          setReadingTime(parsed.readingTimeMinutes);
          setSummary(parsed.summary);
          setAttribution(parsed.attribution || 'Dokumen Diimpor');
          setChapters(
            parsed.chapters.map(c => ({
              id: c.id,
              title: c.title,
              rawText: c.paragraphs.join('\n\n')
            }))
          );
        }
      };
      reader.readAsText(file);
    }
  };

  // Quick Template: Digital Marketing
  const handleApplyDMMCTemplate = () => {
    setTitle('Rangkuman Belajar: Karir Digital Marketing di Era AI');
    setAuthor('Catatan Belajar Mandiri');
    setCoverEmoji('🎯');
    setCategory('Digital Marketing');
    setDifficulty('Menengah');
    setReadingTime(4);
    setSummary('Rangkuman sesi webinar: Paradigma AI sebagai Copilot bukan Autopilot, T-Shaped Marketer, dan penguasaan metrik bisnis.');
    setMoralLesson('Jadikan AI sebagai Copilot (asisten pembantu), bukan Autopilot. Manusia tetap kapten yang memegang arah dan strategi.');
    setAttribution('Catatan Belajar Pribadi • Webinar RevoU DMMC');
    setChapters([
      {
        id: 'c1',
        title: '1. AI Merevolusi, Bukan Menggantikan',
        rawText: 'AI menggeser tugas repetitif (drafting caption, variasi copy, A/B testing) sehingga marketer memiliki waktu lebih banyak untuk berpikir strategis.\n\nYang paling dicari industri adalah AI-Augmented Marketer yang mampu mengarahkan AI untuk mendorong keuntungan bisnis.'
      },
      {
        id: 'c2',
        title: '2. T-Shaped Marketer & Tools Wajib',
        rawText: 'Memiliki wawasan luas tentang digital marketing secara umum, dan spesialisasi mendalam di satu bidang (Ads, SEO, CRM).\n\nTool nomor satu yang wajib dikuasai untuk analisis data adalah Spreadsheet (Excel/Google Sheets).'
      }
    ]);
    setIncludeQuiz(true);
    setQuizQuestion('Apa peran ideal AI bagi seorang digital marketer modern?');
    setQuizOptions([
      'Pengganti total seluruh fungsi pemasaran tanpa pengawasan',
      'Copilot (asisten cerdas) yang mempercepat eksekusi di bawah kendali strategis manusia',
      'Hanya boleh digunakan untuk membuat gambar poster',
      'Tidak boleh digunakan sama sekali'
    ]);
    setQuizCorrectIndex(1);
    setQuizExplanation('AI mempercepat pekerjaan teknis, namun arah brand, empati, dan keputusan strategis tetap dipimpin manusia.');
    setQuizThoughtPrompt('Skill digital apa yang paling ingin Anda perdalam bulan ini?');
  };

  // Quick Template: Data Analytics
  const handleApplyDAMCTemplate = () => {
    setTitle('Rangkuman Belajar: Karir Data Analytics di Era AI');
    setAuthor('Catatan Belajar Mandiri');
    setCoverEmoji('📊');
    setCategory('Data & Tech');
    setDifficulty('Menengah');
    setReadingTime(5);
    setSummary('Rangkuman peran analis data sebagai jembatan bisnis, ledakan Big Data 2026, 4 tingkat analisis, dan percepatan workflow AI.');
    setMoralLesson('Formula Analis Unggul = Data Thinking + Leveraging AI Tools + Business Judgement.');
    setAttribution('Catatan Belajar Pribadi • Webinar RevoU DAMC');
    setChapters([
      {
        id: 'c1',
        title: '1. Analis Data Sebagai Jembatan Bisnis',
        rawText: 'Data Analyst bukan sekadar tukang hitung angka, melainkan jembatan antara data mentah yang berantakan dengan keputusan bisnis nyata.\n\nPerusahaan membutuhkan insight yang dapat ditindaklanjuti untuk meningkatkan profit atau memangkas kerugian.'
      },
      {
        id: 'c2',
        title: '2. 4 Tingkatan Analisis Data',
        rawText: '1. Descriptive: What happened? (Apa yang terjadi di masa lalu)\n\n2. Diagnostic: Why did it happen? (Mengapa itu terjadi)\n\n3. Predictive: What will happen? (Apa yang mungkin terjadi ke depan)\n\n4. Prescriptive: What should we do? (Rekomendasi tindakan terbaik yang harus diambil)'
      }
    ]);
    setIncludeQuiz(true);
    setQuizQuestion('Apa tingkatan analisis data dengan nilai bisnis tertinggi?');
    setQuizOptions([
      'Descriptive Analytics',
      'Diagnostic Analytics',
      'Predictive Analytics',
      'Prescriptive Analytics'
    ]);
    setQuizCorrectIndex(3);
    setQuizExplanation('Prescriptive analytics meresepkan langkah aksi konkret terbaik untuk menghasilkan dampak bisnis terbesar.');
    setQuizThoughtPrompt('Keputusan apa dalam keseharian Anda yang bisa diperbaiki dengan dukungan data?');
  };

  const handleAddChapter = () => {
    const nextIdx = chapters.length + 1;
    setChapters(prev => [
      ...prev,
      {
        id: `c${Date.now()}`,
        title: `Bagian ${nextIdx}: Topik Pembahasan`,
        rawText: ''
      }
    ]);
  };

  const handleRemoveChapter = (index: number) => {
    if (chapters.length <= 1) return;
    setChapters(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateChapter = (index: number, field: 'title' | 'rawText', val: string) => {
    setChapters(prev => prev.map((chap, i) => i === index ? { ...chap, [field]: val } : chap));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      alert('Judul dan Nama Penulis wajib diisi.');
      return;
    }

    // Process chapters paragraphs
    const formattedChapters: StoryChapter[] = chapters.map((c, idx) => ({
      id: c.id || `c${idx + 1}`,
      title: c.title.trim() || `Bagian ${idx + 1}`,
      paragraphs: c.rawText
        .split('\n')
        .map(p => p.trim())
        .filter(p => p.length > 0)
    }));

    // Ensure at least one paragraph exists
    if (formattedChapters.length === 0 || formattedChapters.every(c => c.paragraphs.length === 0)) {
      alert('Mohon isi konten bacaan setidaknya satu paragraf.');
      return;
    }

    // Process reflections/quiz if included
    const reflections: ReflectionQuestion[] = [];
    if (includeQuiz && quizQuestion.trim()) {
      reflections.push({
        id: 'q1',
        question: quizQuestion.trim(),
        options: quizOptions.map(o => o.trim()).filter(o => o.length > 0),
        correctIndex: quizCorrectIndex,
        explanation: quizExplanation.trim() || 'Pilihan yang tepat berdasarkan pemahaman bacaan.',
        thoughtPrompt: quizThoughtPrompt.trim() || undefined
      });
    }

    const storyData: Omit<Story, 'id' | 'createdAt' | 'updatedAt'> = {
      title: title.trim(),
      author: author.trim(),
      coverEmoji: coverEmoji.trim() || '📚',
      coverGradient: 'from-amber-700 to-yellow-800',
      category,
      difficulty,
      readingTimeMinutes: readingTime || 3,
      summary: summary.trim() || `Rangkuman materi tentang ${title.trim()}`,
      moralLesson: moralLesson.trim() || undefined,
      attribution: attribution.trim() || 'Catatan Belajar Pribadi',
      chapters: formattedChapters,
      reflections,
      isCustom: true
    };

    onSaveStory(storyData);
    onClose();
  };

  const popularEmojis = ['🚀', '📊', '🎯', '📚', '💡', '☕', '🧠', '💼', '💻', '📈', '🌱', '✨'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[92vh]"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)'
        }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold">
              {storyToEdit ? 'Edit Materi Bacaan' : 'Tambah Bacaan / Rangkuman Baru'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          
          {/* Ethical Banner */}
          <div className="p-3.5 rounded-2xl border text-xs space-y-1.5"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)'
            }}>
            <div className="flex items-center gap-1.5 font-bold text-amber-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Kaidah Etika Belajar & Kepatuhan Hak Cipta
            </div>
            <p className="opacity-80 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              BacaBaca dapat digunakan untuk membaca segala jenis materi: <strong>rangkuman webinar, modul kursus, artikel, riset, atau esai pribadi</strong>. Seluruh data disimpan privat di peramban Anda (*Fair Use / Personal Study*).
            </p>
          </div>

          {/* Quick Actions: Templates & File Import */}
          {!storyToEdit && (
            <div className="p-3.5 rounded-2xl border bg-amber-500/5 space-y-2.5"
              style={{ borderColor: 'var(--accent)' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold block">Pilih Cara Memulai Cepat:</span>
                <span className="text-[11px] opacity-75" style={{ color: 'var(--text-secondary)' }}>
                  Impor file Markdown atau pilih template
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:bg-black/5 flex items-center gap-1.5"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <Upload className="w-3.5 h-3.5 text-blue-600" />
                  Impor File (.md / .txt)
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMarkdownUpload}
                  accept=".md,.txt,.markdown"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleApplyDMMCTemplate}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:bg-black/5 flex items-center gap-1"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Template Digital Marketing
                </button>

                <button
                  type="button"
                  onClick={handleApplyDAMCTemplate}
                  className="px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all hover:bg-black/5 flex items-center gap-1"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Template Data Analytics
                </button>
              </div>
            </div>
          )}

          {/* Title & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold block mb-1">
                Judul Materi / Rangkuman *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="mis. Rangkuman RevoU DMMC: Karir Marketing"
                className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-500"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">
                Penulis / Pembuat Catatan *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="mis. Catatan Belajar Pribadi"
                className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-500"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          {/* Category, Emoji, Difficulty, Time */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-bold block mb-1">Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StoryCategory)}
                className="w-full px-2.5 py-2 rounded-xl border text-xs outline-none"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="Rangkuman & Modul">Rangkuman & Modul</option>
                <option value="Data & Tech">Data & Tech</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Filosofis & Esai">Filosofis & Esai</option>
                <option value="Inspirasi">Inspirasi</option>
                <option value="Sains & Alam">Sains & Alam</option>
                <option value="Refleksi">Refleksi</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Emoji Ikon</label>
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={coverEmoji}
                  maxLength={4}
                  onChange={(e) => setCoverEmoji(e.target.value)}
                  className="w-12 text-center py-1.5 rounded-xl border text-sm"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <div className="flex items-center gap-0.5 overflow-x-auto">
                  {popularEmojis.slice(0, 4).map(em => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setCoverEmoji(em)}
                      className="p-1 rounded hover:bg-black/5 text-xs"
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Tingkat</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'Mudah' | 'Menengah' | 'Mendalam')}
                className="w-full px-2.5 py-2 rounded-xl border text-xs outline-none"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="Mudah">Mudah</option>
                <option value="Menengah">Menengah</option>
                <option value="Mendalam">Mendalam</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold block mb-1">Durasi Baca</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={readingTime}
                  onChange={(e) => setReadingTime(parseInt(e.target.value) || 3)}
                  className="w-full px-2.5 py-2 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
                <span className="text-[11px] opacity-75 whitespace-nowrap">mnt</span>
              </div>
            </div>
          </div>

          {/* Summary & Key Takeaways */}
          <div>
            <label className="text-xs font-bold block mb-1">
              Ringkasan Singkat (Abstrak)
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Deskripsi singkat mengenai isi bacaan atau rangkuman ini..."
              className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-500"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="text-xs font-bold block mb-1">
              Pesan Intisari / Poin Kunci
            </label>
            <input
              type="text"
              value={moralLesson}
              onChange={(e) => setMoralLesson(e.target.value)}
              placeholder="mis. Winning Junior Analyst = Data Thinking + AI Tools + Business Judgement."
              className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-500"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Source Attribution */}
          <div>
            <label className="text-xs font-bold block mb-1">
              Atribusi & Catatan Sumber (Etis & Transparan)
            </label>
            <input
              type="text"
              value={attribution}
              onChange={(e) => setAttribution(e.target.value)}
              placeholder="mis. Catatan Belajar Pribadi • Modul RevoU / Webinar DMMC"
              className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none focus:ring-2 focus:ring-amber-500"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          {/* Chapters Section */}
          <div className="space-y-4 pt-2 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-500" />
                  Isi Bab & Bagian Pembahasan
                </h3>
                <p className="text-[11px] opacity-75" style={{ color: 'var(--text-secondary)' }}>
                  Pisahkan baris untuk membuat paragraf baru. Teks akan otomatis tersambung dengan fitur suara dan fokus baca.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddChapter}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition-colors hover:bg-black/5"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Bagian
              </button>
            </div>

            {chapters.map((chap, idx) => (
              <div 
                key={chap.id}
                className="p-4 rounded-2xl border space-y-3"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={chap.title}
                    onChange={(e) => handleUpdateChapter(idx, 'title', e.target.value)}
                    placeholder={`Judul Bagian ${idx + 1}`}
                    className="font-bold text-xs flex-1 px-3 py-1.5 rounded-lg border outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                  {chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChapter(idx)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Hapus Bagian Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <textarea
                  rows={4}
                  value={chap.rawText}
                  onChange={(e) => handleUpdateChapter(idx, 'rawText', e.target.value)}
                  placeholder={`Tuliskan isi teks atau rangkuman untuk bagian ${idx + 1}...`}
                  className="w-full p-3 rounded-xl border text-xs font-reading-sans leading-relaxed outline-none focus:ring-2 focus:ring-amber-500"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                />
              </div>
            ))}
          </div>

          {/* Optional Reflection / Quiz */}
          <div className="pt-2 border-t space-y-3" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold">Sertakan Pertanyaan Refleksi / Kuis?</span>
              </div>
              <input
                type="checkbox"
                checked={includeQuiz}
                onChange={(e) => setIncludeQuiz(e.target.checked)}
                className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
              />
            </div>

            {includeQuiz && (
              <div className="p-4 rounded-2xl border space-y-3"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <div>
                  <label className="text-[11px] font-bold block mb-1">Pertanyaan Refleksi:</label>
                  <input
                    type="text"
                    value={quizQuestion}
                    onChange={(e) => setQuizQuestion(e.target.value)}
                    placeholder="mis. Apa pesan kunci dari materi ini?"
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold block">Pilihan Jawaban (Pilih radio untuk jawaban benar):</label>
                  {quizOptions.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctOpt"
                        checked={quizCorrectIndex === oIdx}
                        onChange={() => setQuizCorrectIndex(oIdx)}
                        className="accent-amber-600"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...quizOptions];
                          newOpts[oIdx] = e.target.value;
                          setQuizOptions(newOpts);
                        }}
                        placeholder={`Pilihan ${String.fromCharCode(65 + oIdx)}`}
                        className="flex-1 px-3 py-1.5 rounded-lg border text-xs outline-none"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-[11px] font-bold block mb-1">Penjelasan Singkat:</label>
                  <input
                    type="text"
                    value={quizExplanation}
                    onChange={(e) => setQuizExplanation(e.target.value)}
                    placeholder="Penjelasan mengapa pilihan tersebut tepat..."
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold block mb-1">💡 Pertanyaan Renungan Batin:</label>
                  <input
                    type="text"
                    value={quizThoughtPrompt}
                    onChange={(e) => setQuizThoughtPrompt(e.target.value)}
                    placeholder="mis. Bagaimana Anda akan menerapkan konsep ini besok?"
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t flex items-center justify-end gap-2"
            style={{ borderColor: 'var(--border-color)' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
              style={{ backgroundColor: 'var(--accent)', color: '#fff' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {storyToEdit ? 'Simpan Perubahan' : 'Terbitkan Bacaan'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
