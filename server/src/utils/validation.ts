import { z } from 'zod';
export const storySchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    synopsis: z.string().min(1, "Synopsis is required"),
    category: z.string().min(1, "Category is required"),
    status: z.enum(['Draft', 'Publish']),
    cover: z.string().min(1, "Cover is required"),
    keyword: z.string().min(1, "Keyword is required"),
});

export const chapterSchemea = z.object({
    title: z.string().min(1, "Title is required"),
    story: z.string().optional(),
})