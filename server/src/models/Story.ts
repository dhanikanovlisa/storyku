import prisma from "@/prisma";
import { Prisma } from "@prisma/client";
class StoryModel {

    async getStories(
        page: number,
        pageSize: number,
        searchParams: { title?: string; author?: string; category?: string; status?: string }
      ) {
        const skip = (page - 1) * pageSize;
      
        const filters = {
          ...(searchParams.title && {
            title: {
              contains: searchParams.title,
              mode: Prisma.QueryMode.insensitive, 
            } as Prisma.StringFilter,
          }),
          ...(searchParams.author && {
            author: {
              contains: searchParams.author,
              mode: Prisma.QueryMode.insensitive, 
            } as Prisma.StringFilter,
          }),
          ...(searchParams.category && {
            category: {
              equals: searchParams.category,
            } as Prisma.StringFilter,
          }),
          ...(searchParams.status && {
            status: {
              equals: searchParams.status,
            } as Prisma.StringFilter,
          }),
        };
      
        const [stories, total] = await Promise.all([
          prisma.stories.findMany({
            skip: skip,
            take: pageSize,
            where: filters,
            orderBy: {
              id: 'asc',
            },
          }),
          prisma.stories.count({
            where: filters,
          }),
        ]);
      
        return {
          data: stories,
          meta: {
            from: skip + 1,
            to: skip + stories.length,
            page: page,
            last_page: Math.ceil(total / pageSize),
            pageSize: pageSize,
            total: total,
          },
        };
      }     

    async getStoryById(id: number) {
        return prisma.stories.findUnique({
            where: {
                id: id
            },
            include:{
                Chapters: true
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