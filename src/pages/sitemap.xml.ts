import { getCollection } from 'astro:content';
import { projects } from '../data/projects';

export const prerender = true;

const staticPaths = ['/', '/about/', '/projects/', '/writeups/', '/contact/', '/certificates/', '/blog/', '/privacy/'];

function buildUrl(base: URL, path: string): string {
  return new URL(path, base).toString();
}

function toW3CDate(date: Date): string {
  return date.toISOString();
}

export async function GET(context: any) {
  const siteUrl = context.site?.toString() || import.meta.env.SITE || 'https://z4hid.github.io';
  const site = new URL(siteUrl);

  let posts: any[] = [];
  let writeups: any[] = [];
  try {
    posts = await getCollection('blog');
  } catch {
    posts = [];
  }
  try {
    writeups = await getCollection('writeups');
  } catch {
    writeups = [];
  }

  const urls: Array<{ loc: string; lastmod?: string }> = staticPaths.map((path) => ({
    loc: buildUrl(site, path),
  }));

  for (const project of projects) {
    urls.push({
      loc: buildUrl(site, `/projects/${project.slug}`),
    });
  }

  for (const writeup of writeups) {
    if (writeup.data.draft) continue;
    const slug = writeup.id.replace(/\.md$/, '');
    urls.push({
      loc: buildUrl(site, `/writeups/${slug}`),
      lastmod: toW3CDate(writeup.data.updatedDate || writeup.data.pubDate),
    });
  }

  for (const post of posts) {
    if (post.data.draft) continue;
    urls.push({
      loc: buildUrl(site, `/blog/${post.id}/`),
      lastmod: toW3CDate(post.data.updatedDate || post.data.pubDate),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>${item.lastmod ? `\n    <lastmod>${item.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
