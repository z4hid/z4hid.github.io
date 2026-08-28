import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    let posts: any[] = [];
    let writeups: any[] = [];
    try {
        posts = await getCollection('blog');
    } catch (e) {
        posts = [];
    }
    try {
        writeups = await getCollection('writeups');
    } catch (e) {
        writeups = [];
    }

    const base = import.meta.env.BASE_URL || '/';

    const blogItems = posts
        .filter((p: any) => !p.data.draft)
        .map((post: any) => ({
            title: `[Blog] ${post.data.title}`,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `${base}blog/${post.id}/`,
        }));

    const writeupItems = writeups
        .filter((w: any) => !w.data.draft)
        .map((w: any) => {
            const slug = w.id.replace(/\.md$/, '');
            const category = w.data.category || (w.id.toLowerCase().includes('offensive') ? 'offensive' : 'defensive');
            const categoryLabel = category.toUpperCase();
            return {
                title: `[${categoryLabel} Security] ${w.data.title}`,
                pubDate: w.data.pubDate,
                description: w.data.description,
                link: `${base}writeups/${slug}/`,
            };
        });

    const allItems = [...blogItems, ...writeupItems].sort(
        (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
    );

    return rss({
        title: 'Md. Zahid Hasan — AI & Cybersecurity Insights',
        description: 'Articles and lab walkthroughs on AI engineering, agentic workflows, offensive red teaming, and defensive memory forensics.',
        site: context.site,
        items: allItems,
    });
}

