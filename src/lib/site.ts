import { getCollection } from 'astro:content';

export const kinds = {
  publication: { label: 'Research', one: 'Preprint' },
  patent: { label: 'Patents', one: 'Patent application' },
  project: { label: 'Software', one: 'Software' },
} as const;

export const monthYear = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
export const fullDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// Works newest first, each numbered within its kind in order of publication.
export async function getWorks() {
  const works = (await getCollection('works')).sort((a, b) => +a.data.date - +b.data.date);
  const counts: Record<string, number> = {};
  return works
    .map((w) => {
      counts[w.data.type] = (counts[w.data.type] ?? 0) + 1;
      return { ...w, plate: String(counts[w.data.type]).padStart(2, '0') };
    })
    .reverse();
}

export async function getPosts() {
  return (await getCollection('blogs')).sort((a, b) => +b.data.date - +a.data.date);
}
