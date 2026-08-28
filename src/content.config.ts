import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        draft: z.boolean().default(false),
    }),
});

const writeups = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum(['offensive', 'defensive']).optional(),
        labType: z.string().optional(),
        difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Insane']).optional(),
        pubDate: z.coerce.date().default(() => new Date()),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        draft: z.boolean().default(false),
        targetOs: z.string().optional(),
        toolsUsed: z.array(z.string()).default([]),
    }),
});

export const collections = { blog, writeups };
