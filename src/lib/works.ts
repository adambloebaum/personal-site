import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

export interface Work {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  type: 'external-blog' | 'patent' | 'publication';
  tags: string[];
  featured: boolean;
  url?: string; // For external blogs
  pdfUrl?: string; // For patents/publications
  logo?: string; // Company logo or icon
  image: string; // Cover image for the work
}

// Load all markdown files from the works directory
const workFiles = import.meta.glob('../content/works/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export const works: Work[] = Object.entries(workFiles).map(([filepath, content]) => {
  // Extract the filename without extension to use as ID
  const id = filepath.split('/').pop()?.replace('.md', '') || '';

  // Parse frontmatter and content
  const { data, content: markdown } = matter(content);

  return {
    id,
    title: data.title || '',
    summary: data.summary || '',
    content: markdown,
    date: data.date || '',
    type: data.type || 'publication',
    tags: data.tags || [],
    featured: data.featured || false,
    url: data.url || '',
    pdfUrl: data.pdfUrl || '',
    logo: data.logo || '',
    image: data.image || '',
  };
}).sort((a, b) => {
  // Sort by date, newest first
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// Helper to get a single work by ID
export const getWorkById = (id: string): Work | undefined => {
  return works.find(work => work.id === id);
};

// Helper to get featured works
export const getFeaturedWorks = (): Work[] => {
  return works.filter(work => work.featured);
};
