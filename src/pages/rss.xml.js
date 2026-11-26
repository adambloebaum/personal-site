import rss from '@astrojs/rss';
import { getPosts } from '../lib/site';

export async function GET(context) {
  return rss({
    title: 'Adam Bloebaum',
    description: 'Essays by Adam Bloebaum on biomechanics, motor learning, and training.',
    site: context.site,
    items: (await getPosts()).map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: `/blog/${p.id}`,
    })),
  });
}
