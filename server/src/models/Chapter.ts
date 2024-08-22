import prisma from "@/prisma";
class ChapterModel {
    async getChapters(story_id:number, page:number, pageSize:number){
        const skip = ( page - 1 ) * pageSize;
        const [chapters, total] = await Promise.all([
            prisma.chapters.findMany({
                where: {
                    storyId: story_id
                },
                skip: skip,
                take: pageSize,
                orderBy: {
                    id: 'asc'
                },
            }),
            prisma.chapters.count({
                where: {
                    storyId: story_id
                }
            }),
        ])
        return {
            data: chapters,
            meta: {
                from: skip + 1,
                to: skip + chapters.length,
                page: page,
                last_page: Math.ceil(total / pageSize), 
                pageSize: pageSize,
                total: await prisma.chapters.count({
                    where: {
                        storyId: story_id
                    }
                })
            }
        };
    }
    async getChapterById(story_id:number, id:number){
        return prisma.chapters.findUnique({
            where: {
                storyId: story_id,
                id: id
            }
        });
    }

    async createChapter(story_id:number, chapter: any){
        return prisma.chapters.create({
            data: {
                title: chapter.title,  
                story: chapter.story,  
                storyId: story_id,     
            },
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

    async deleteChapters(story_id:number){
        return prisma.chapters.deleteMany({
            where: {
                storyId: story_id
            }
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