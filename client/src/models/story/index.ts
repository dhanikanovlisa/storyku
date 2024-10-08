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
    created_at?: string,
    updated_at?: string
}

export const fetchStories = async (page = 1, pageSize = 10, search = "", category = "", status = "") => {
    const params = new URLSearchParams();

    if (search) params.append("search", search)
    if (category) params.append("category", category)
    if (status) params.append("status", status);

    params.append("page", page.toString());
    params.append("pageSize", pageSize.toString());
    const queryString = params.toString();
    const res = await GET(`/stories?${queryString}`)
    return res;
}

export const fetchStoryById = async (id: number, additionalHeaders: Record<string, string>) => {
    const res = await GET(`/stories/${id}`, additionalHeaders);
    return res;
}

export const createStory = async (additionalHeaders: Record<string, string>, payload: storyProps) => {
    const res = await POST(`/stories/`, additionalHeaders, payload);
    return res;
}

export const updateStory = async (id: number, additionalHeaders: Record<string, string>, payload: storyProps) => {
    const res = await PUT(`/stories/${id}`, additionalHeaders, payload)
    return res;
}

export const deleteStory = async (id: number, additionalHeaders: Record<string, string>) => {
    const res = await DELETE(`/stories/${id}`, additionalHeaders)
    return res;
}