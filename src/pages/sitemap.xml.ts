import { getCollection } from 'astro:content';

const staticPaths = ['/', '/projects/', '/contact/', '/certificates/', '/blog/'];

function buildUrl(base: URL, path: string): string {
  return new URL(path, base).toString();
}

function toW3CDate(date: Date): string {
  return date.toISOString();
}

export async function GET(context: any) {
  const site = context.site;
  if (!site) {
    return new Response('Missing site URL for sitemap generation.', { status: 500 });
  }

  let posts: any[] = [];
  try {
    posts = await getCollection('blog');
  } catch {
    posts = [];
  }

  const urls: Array<{ loc: string; lastmod?: string }> = staticPaths.map((path) => ({
    loc: buildUrl(site, path),
  }));

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
