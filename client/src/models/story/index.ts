import { DELETE, GET, POST, PUT } from "@/utils"

export type storyProps = {
    id: number,
    title: string,
    author: string,
    synopsis?: string,
    category?: string,
    status?: string,
    cover?: string,
    keyword?: string,
    created_at: string,
    updated_at: string
}

export const fetchStories = async (page = 1, pageSize = 10) => {
    const res = await GET(`/stories?page=${page}&pageSize=${pageSize}`)
    return res;
}

export const fetchStoryById = async (id: number, additionalHeaders:Record<string,string>) => {
    const res = await GET(`/stories/${id}`, additionalHeaders);
    return res;
}

export const createStory = async (additionalHeaders: Record<string,string>, payload:storyProps) => {
    const res = await POST(`/stories/`, additionalHeaders, payload);
    return res;
}

export const updateStory = async (id: number, additionalHeaders: Record<string,string>, payload: storyProps) => {
    const res = await PUT(`/stories/${id}`, additionalHeaders, payload)
    return res;
}

export const deleteStory = async (id: number, additionalHeaders: Record<string,string>) => {
    const res = await DELETE(`/stories/${id}`, additionalHeaders)
    return res;
}