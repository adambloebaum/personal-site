import matter from 'gray-matter';
import { Buffer } from 'buffer';

// Polyfill Buffer for gray-matter
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

export interface Blog {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  tags: string[];
}

// Load all markdown files from the blogs directory
const blogFiles = import.meta.glob('../content/blogs/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export const blogs: Blog[] = Object.entries(blogFiles).map(([filepath, content]) => {
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
    readTime: data.readTime || '',
    image: data.image || '',
    featured: data.featured || false,
    tags: data.tags || [],
  };
}).sort((a, b) => {
  // Sort by date, newest first
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

// Helper to get a single blog by ID
export const getBlogById = (id: string): Blog | undefined => {
  return blogs.find(blog => blog.id === id);
};

// Helper to get featured blogs
export const getFeaturedBlogs = (): Blog[] => {
  return blogs.filter(blog => blog.featured);
};
