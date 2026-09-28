import type { Story, StoryChapter, StoryCategory } from '../types';

/**
 * Parses a Markdown document into a BacaBaca Story/Reading object.
 * Detects headers (# and ##) to split into structured chapters and paragraphs.
 */
export function parseMarkdownToStory(
  markdownText: string,
  fileName: string = 'Dokumen Bacaan'
): Omit<Story, 'id' | 'createdAt' | 'updatedAt'> {
  const lines = markdownText.split('\n');
  let title = fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  let author = 'Catatan Mandiri';
  let summary = '';
  let category: StoryCategory = 'Rangkuman & Modul';
  let attribution = 'Dokumen Diimpor dari Markdown Lokal';

  const chapters: StoryChapter[] = [];
  let currentChapterTitle = 'Pengantar & Ringkasan';
  let currentParagraphs: string[] = [];

  // Estimate reading time: ~200 words per minute
  const totalWords = markdownText.trim().split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.round(totalWords / 180));


  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    // Detect Main Title if line starts with single #
    if (line.startsWith('# ') && !title.includes('RevoU')) {
      const detected = line.replace(/^#\s+/, '').trim();
      if (!title || title === fileName) {
        title = detected;
      }
      continue;
    }

    // Detect Subheaders (# or ## or ###) as Chapter divisions
    if (line.startsWith('## ') || (line.startsWith('# ') && chapters.length > 0)) {
      if (currentParagraphs.length > 0) {
        chapters.push({
          id: `c_${chapters.length + 1}`,
          title: currentChapterTitle,
          paragraphs: currentParagraphs
        });
        currentParagraphs = [];
      }
      currentChapterTitle = line.replace(/^#+\s+/, '').trim();
      continue;
    }

    // Detect summary or metadata
    if (line.toLowerCase().includes('penyelenggara:') || line.toLowerCase().includes('narasumber:')) {
      attribution += ` • ${line.replace(/\*+/g, '')}`;
      continue;
    }

    // Clean markdown formatting for comfortable reading
    const cleanLine = line
      .replace(/^[-*]\s+/, '') // remove bullet point dashes
      .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold asterisks for clean narration
      .replace(/\*(.*?)\*/g, '$1')
      .trim();

    if (cleanLine.length > 0) {
      if (!summary && cleanLine.length > 30) {
        summary = cleanLine.slice(0, 160) + '...';
      }
      currentParagraphs.push(cleanLine);
    }
  }

  // Push final chapter
  if (currentParagraphs.length > 0 || chapters.length === 0) {
    chapters.push({
      id: `c_${chapters.length + 1}`,
      title: currentChapterTitle,
      paragraphs: currentParagraphs.length > 0 ? currentParagraphs : ['Konten dokumen.']
    });
  }

  // Categorize based on keywords
  const lowerTitle = title.toLowerCase() + ' ' + markdownText.toLowerCase();
  if (lowerTitle.includes('marketing') || lowerTitle.includes('dmmc')) {
    category = 'Digital Marketing';
  } else if (lowerTitle.includes('data') || lowerTitle.includes('damc') || lowerTitle.includes('analytics')) {
    category = 'Data & Tech';
  }

  return {
    title: title || 'Dokumen Bacaan Baru',
    author: author,
    coverEmoji: category === 'Data & Tech' ? '📊' : category === 'Digital Marketing' ? '🎯' : '📄',
    coverGradient: 'from-amber-700 to-yellow-800',
    category,
    difficulty: 'Menengah',
    readingTimeMinutes,
    summary: summary || 'Rangkuman catatan dan materi belajar mandiri.',
    attribution,
    chapters,
    reflections: [],
    isCustom: true
  };
}
