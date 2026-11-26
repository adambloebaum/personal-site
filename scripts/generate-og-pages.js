import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.adambloebaum.com';
const DIST_DIR = path.resolve(__dirname, '../dist');
const BLOGS_DIR = path.resolve(__dirname, '../src/content/blogs');
const OG_IMAGE = `${SITE_URL}/favicon-og-black.png`;
const OG_BODY_STYLE = 'background-color: #000; color: #fff;';

// Read the base index.html
const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

// Generate static OG pages
const staticPages = [
  {
    path: '',
    title: 'Adam Bloebaum',
    description:
      'Adam Bloebaum — Applied quantitative engineer and minor league pitcher. Science, technology, training, and curiosity.',
    image: OG_IMAGE,
    type: 'website',
  },
  {
    path: 'blog',
    title: 'Blog | Adam Bloebaum',
    description: 'Blog posts by Adam Bloebaum.',
    image: OG_IMAGE,
    type: 'website',
  },
  {
    path: 'works',
    title: 'Works | Adam Bloebaum',
    description: 'Projects, patents, and publications by Adam Bloebaum.',
    image: OG_IMAGE,
    type: 'website',
  },
  {
    path: 'about',
    title: 'About | Adam Bloebaum',
    description: 'About Adam Bloebaum.',
    image: OG_IMAGE,
    type: 'website',
  },
  {
    path: 'contact',
    title: 'Contact | Adam Bloebaum',
    description: 'Get in touch with Adam Bloebaum.',
    image: OG_IMAGE,
    type: 'website',
  },
];

staticPages.forEach((page) => {
  const url = page.path ? `${SITE_URL}/${page.path}` : `${SITE_URL}/`;
  writeOgPage({
    outputDir: path.join(DIST_DIR, page.path),
    title: page.title,
    ogTitle: page.title,
    description: page.description,
    url,
    image: page.image,
    type: page.type,
  });
  const outputPath = page.path ? `/${page.path}/index.html` : '/index.html';
  console.log(`  Generated: ${outputPath}`);
});

// Get all blog markdown files
const blogFiles = fs.readdirSync(BLOGS_DIR).filter((f) => f.endsWith('.md'));
console.log(`Found ${blogFiles.length} blog posts to process...`);

const posts = [];
blogFiles.forEach((filename) => {
  const id = filename.replace('.md', '');
  const filePath = path.join(BLOGS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(fileContent);

  const title = data.title || 'Blog Post';
  const description = data.summary || '';
  const image = data.ogImage ? `${SITE_URL}/images/${data.ogImage}` : OG_IMAGE;
  const url = `${SITE_URL}/blog/${id}`;
  posts.push({ title, description, url, date: data.date });

  writeOgPage({
    outputDir: path.join(DIST_DIR, 'blog', id),
    title: `${title} | Adam Bloebaum`,
    ogTitle: title,
    description,
    url,
    image,
    type: 'article',
  });
  console.log(`  Generated: /blog/${id}/index.html`);
});

// GitHub Pages serves 404.html for unknown paths; the SPA renders its own NotFound.
fs.copyFileSync(path.join(DIST_DIR, 'index.html'), path.join(DIST_DIR, '404.html'));

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(
  path.join(DIST_DIR, 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Adam Bloebaum</title>
    <link>${SITE_URL}/blog</link>
    <description>Blog posts by Adam Bloebaum.</description>
${posts
  .map(
    (p) => `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${p.url}</link>
      <guid>${p.url}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeHtml(p.description)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`
);

const sitemapUrls = [...staticPages.map((p) => `${SITE_URL}/${p.path}`), ...posts.map((p) => p.url)];
fs.writeFileSync(
  path.join(DIST_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`
);

console.log('\nOG pages, 404.html, rss.xml, and sitemap.xml generated successfully!');

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyOgBodyStyle(html) {
  return html.replace(/<body([^>]*)>/i, (match, attrs) => {
    const styleMatch = attrs.match(/\sstyle=(["'])(.*?)\1/i);
    if (styleMatch) {
      const quote = styleMatch[1];
      const styleValue = styleMatch[2];
      if (/background/i.test(styleValue)) {
        return match;
      }
      const separator = styleValue.trim().endsWith(';') ? ' ' : '; ';
      const merged = `${styleValue}${separator}${OG_BODY_STYLE}`;
      const newAttrs = attrs.replace(
        styleMatch[0],
        ` style=${quote}${merged}${quote}`
      );
      return `<body${newAttrs}>`;
    }
    return `<body${attrs} style="${OG_BODY_STYLE}">`;
  });
}

function buildOgHtml({ title, ogTitle, description, url, image, type }) {
  const twitterCard = image === OG_IMAGE ? 'summary' : 'summary_large_image';
  const ogTags = `
    <meta property="og:title" content="${escapeHtml(ogTitle || title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:site_name" content="Adam Bloebaum" />

    <meta name="twitter:card" content="${twitterCard}" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle || title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${image}" />

    <meta name="description" content="${escapeHtml(description)}" />`;

  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/gi, '')
    .replace(/<meta property="og:[^"]+"[^>]*>/gi, '')
    .replace(/<meta name="twitter:[^"]+"[^>]*>/gi, '')
    .replace('<head>', `<head>${ogTags}`);

  html = applyOgBodyStyle(html);
  return html;
}

function writeOgPage({ outputDir, title, ogTitle, description, url, image, type }) {
  const html = buildOgHtml({ title, ogTitle, description, url, image, type });
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
}
