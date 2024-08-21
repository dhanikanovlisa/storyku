import prisma from "@/prisma";

class StoryModel {

    async getStories(page:number, pageSize:number) {
        const skip = ( page - 1 ) * pageSize;
        const [stories, total] = await Promise.all([
            prisma.stories.findMany({
                skip: skip,
                take: pageSize,
                orderBy: {
                    id: 'asc'
                },
            }),
            prisma.stories.count(),
        ])
        return {
            data: stories,
            meta: {
                from: skip + 1,
                to: skip + stories.length,
                page: page,
                last_page: Math.ceil(total / pageSize), 
                pageSize: pageSize,
                total: await prisma.stories.count()
            }
        };
    }

    async getStoryById(id: number) {
        return prisma.stories.findUnique({
            where: {
                id: id
            }
        })
    }

    async createStory(data: any) {
        return prisma.stories.create({
            data
        })
    }

    async updateStory(id: number, data: any) {
        return prisma.stories.update({
            where: {
                id: id
            },
            data
        })
    }

    async deleteStory(id:number){
        return prisma.stories.delete({
            where: {
                id: id
            }
        })
    }
}

export default StoryModel;