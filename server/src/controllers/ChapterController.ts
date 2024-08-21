import { Request, Response } from 'express';
import {  ChapterModel } from '@/models';
import { chapterSchemea } from '@/utils/validation';
class ChapterController {
    private chapterModel: ChapterModel;

    constructor(){
        this.chapterModel = new ChapterModel();
    }

    async getChapters(req:Request, res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const chapters = await this.chapterModel.getChapters(Number(req.params.story_id), Number(page), Number(pageSize));
            res.status(200).json({error:false, data:chapters});
        }
        catch (error) {
            console.log(error);
            res.status(500).json({error: true, message: 'Internal Server Error'});
        }
    }

    async getChapterById(req: Request, res: Response){
        try {
            const chapter = await this.chapterModel.getChapterById(Number(req.params.story_id), Number(req.params.id))
            if(!chapter){
                res.status(404).json({error:false, message:'Chapter Not Found'});
            }
            res.status(200).json({error:false, data:chapter})
        } catch (error) {
            console.log(error);
            res.status(500).json({error: true, message: 'Internal Server Error'});
        }
    }

    async createChapter(req: Request, res: Response){
        try {
            const parsedBody = chapterSchemea.safeParse(req.body);
            if (!parsedBody.success) {
                return res.status(422).json({
                    error: true,
                    message: 'Validation failed',
                    errors: parsedBody.error.flatten(),
                });
            }
            const chapter = await this.chapterModel.createChapter(req.params.story_id, parsedBody);
            if(!chapter){
                res.status(404).json({error:false, message:'Chapter Not Found'});
            }
            res.status(201).json({error:false, data:chapter});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true, message:'Internal Server Error'});
        }
    }

    async updateChapter(req: Request, res: Response){
        try {
            const parsedBody = chapterSchemea.safeParse(req.body);
            if (!parsedBody.success) {
                return res.status(422).json({
                    error: true,
                    message: 'Validation failed',
                    errors: parsedBody.error.flatten(),
                });
            }
            const chapter = await this.chapterModel.updateChapter(Number(req.params.story_id), Number(req.params.id), parsedBody.data);
            if(!chapter){
                res.status(404).json({error:false, message:'Chapter Not Found'});
            }
            res.status(200).json({error:false, data:chapter});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true, message:'Internal Server Error'});
        }
    }

    async deleteChapter(req:Request, res:Response){
        try {
            const chapter = await this.chapterModel.getChapterById(Number(req.params.story_id), Number(req.params.id));
            if (!chapter) {
                res.status(404).json({error:false, message:'Chapter Not Found'});
            }
            await this.chapterModel.deleteChapter(Number(req.params.story_id), Number(req.params.id));
            res.status(204).json({error:false, message:'Chapter Deleted', data:chapter});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true, message: 'Internal Server Error'});
        }
    }

}

export default ChapterController;