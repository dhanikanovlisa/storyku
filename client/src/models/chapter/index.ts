import { DELETE, GET, POST, PUT } from "@/utils"

export type chapterProps = {
    id: number,
    title: string,
    story?: string,
    story_id:string,
}

export const fetchChapters = async (story_id:number, page = 1, pageSize = 10) => {
    const res = await GET(`/stories/${story_id}/chapters?page=${page}&pageSize=${pageSize}`)
    return res;
}

export const fetchChapterById = async (story_id:number, id: number, additionalHeaders:Record<string,string>) => {
    const res = await GET(`/stories/${story_id}/chapter/${id}`, additionalHeaders);
    return res;
}

export const createChapter = async (story_id:number, additionalHeaders: Record<string,string>, payload:chapterProps) => {
    const res = await POST(`/stories/${story_id}`, additionalHeaders, payload);
    return res;
}

export const updateChapter = async (story_id:number, id: number, additionalHeaders: Record<string,string>, payload: chapterProps) => {
    const res = await PUT(`/stories/${story_id}/chapter/${id}`, additionalHeaders, payload)
    return res;
}

export const deleteChapter = async (story_id:number, id: number, additionalHeaders: Record<string,string>) => {
    const res = await DELETE(`/stories/${story_id}/chapter/${id}`, additionalHeaders)
    return res;
}