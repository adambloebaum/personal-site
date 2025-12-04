import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.adambloebaum.com';
const DIST_DIR = path.resolve(__dirname, '../dist');
const BLOGS_DIR = path.resolve(__dirname, '../src/content/blogs');

// Read the base index.html
const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

// Get all blog markdown files
const blogFiles = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith('.md'));

console.log(`Found ${blogFiles.length} blog posts to process...`);

blogFiles.forEach(filename => {
  const id = filename.replace('.md', '');
  const filePath = path.join(BLOGS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  const title = data.title || 'Blog Post';
  const description = data.summary || '';
  const image = data.ogImage ? `${SITE_URL}/images/${data.ogImage}` : `${SITE_URL}/images/home.jpg`;
  const url = `${SITE_URL}/blog/${id}`;

  // Create the meta tags for this blog
  const ogTags = `
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="Adam Bloebaum" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />

    <meta name="description" content="${escapeHtml(description)}" />`;

  // Replace existing meta tags in index.html
  let blogHtml = indexHtml
    // Replace title
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)} | Adam Bloebaum</title>`)
    // Replace meta description
    .replace(/<meta name="description"[^>]*>/, '')
    // Replace OG tags
    .replace(/<meta property="og:title"[^>]*>/, '')
    .replace(/<meta property="og:description"[^>]*>/, '')
    .replace(/<meta property="og:type"[^>]*>/, '')
    .replace(/<meta property="og:url"[^>]*>/, '')
    .replace(/<meta property="og:image"[^>]*>/, '')
    // Replace Twitter tags
    .replace(/<meta name="twitter:card"[^>]*>/, '')
    .replace(/<meta name="twitter:title"[^>]*>/, '')
    .replace(/<meta name="twitter:description"[^>]*>/, '')
    .replace(/<meta name="twitter:image"[^>]*>/, '')
    // Insert new tags after <head>
    .replace('<head>', `<head>${ogTags}`);

  // Create directory for this blog post
  const blogDir = path.join(DIST_DIR, 'blog', id);
  fs.mkdirSync(blogDir, { recursive: true });

  // Write the HTML file
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml);
  console.log(`  Generated: /blog/${id}/index.html`);
});

console.log('\nOG pages generated successfully!');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
