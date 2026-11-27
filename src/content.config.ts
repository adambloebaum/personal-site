import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blogs' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    ogImage: z.string(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    short: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    type: z.enum(['publication', 'patent', 'project']),
    venue: z.string(),
    sample: z.array(z.string()).default([]),
    method: z.string().optional(),
    figureCaption: z.string().optional(),
    url: z.string().optional(),
    pdfUrl: z.string().optional(),
  }),
});

export const collections = { blogs, works };
