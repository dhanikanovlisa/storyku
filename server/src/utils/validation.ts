import { z } from 'zod';
export const storySchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    synopsis: z.string().optional(),
    category: z.string().min(1, "Category is required"),
    status: z.enum(['Draft', 'Publish']),
    cover: z.string().url("Cover must be a valid URL").optional(),
    keyword: z.string().optional(),
});

export const chapterSchemea = z.object({
    title: z.string().min(1, "Title is required"),
    story: z.string().optional(),
})