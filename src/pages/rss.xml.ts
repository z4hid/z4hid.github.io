import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
    let posts: any[] = [];
    try {
        posts = await getCollection('blog');
    } catch (e) {
        posts = [];
    }

    return rss({
        title: 'Md. Zahid Hasan — AI Engineer Blog',
        description: 'Articles on AI engineering, machine learning, LLMs, and software development.',
        site: context.site,
        items: posts
            .filter((p: any) => !p.data.draft)
            .sort((a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
            .map((post: any) => ({
                title: post.data.title,
                pubDate: post.data.pubDate,
                description: post.data.description,
                link: `${import.meta.env.BASE_URL}blog/${post.id}/`,
            })),
    });
}
