import prisma from "@/prisma";
class ChapterModel {

    async getChapterById(story_id:number, id:number){
        return prisma.chapters.findUnique({
            where: {
                storyId: story_id,
                id: id
            }
        });
    }

    async createChapter(story_id:string, data: any){
        return prisma.chapters.create({
            data: {
                ...data,
                storyId: story_id
            }
        });
    }

    async updateChapter(story_id:number, id:number, data: any){
        return prisma.chapters.update({
            where: {
                storyId: story_id,
                id: id
            },
            data
        });
    }

    async deleteChapter(story_id:number, id:number){
        return prisma.chapters.delete({
            where: {
                storyId: story_id,
                id: id
            }
        });
    }
}



export default ChapterModel;