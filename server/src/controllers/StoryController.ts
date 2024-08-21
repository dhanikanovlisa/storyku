import { Request, Response } from 'express';
import { StoryModel } from '@/models'
import { storySchema } from '@/utils/validation';

class StoryController {
    private storyModel: StoryModel;

    constructor(){
        this.storyModel = new StoryModel();
    }

    async getStories(req:Request, res:Response){
        try {
            const page = Number(req.query.page) || 1;
            const pageSize = Number(req.query.pageSize) || 10; 
            const stories = await this.storyModel.getStories(Number(page), Number(pageSize));
            res.status(200).json(stories);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }

    async getStoryById(req:Request, res:Response){
        try {
            const story = await this.storyModel.getStoryById(Number(req.params.id));
            if(!story){
                res.status(404).json({error:false, message:'Story Not Found'});
            }
            res.status(200).json({error: false, message:"Fetched Succesfully", data: story});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true, message: 'Internal Server Error'});
        }
    }

    async createStory(req: Request, res: Response) {
        try {
            const parsedBody = storySchema.safeParse(req.body);
    
            if (!parsedBody.success) {
                return res.status(422).json({
                    error: true,
                    message: 'Validation failed',
                    errors: parsedBody.error.issues,
                });
            }
    
            const story = await this.storyModel.createStory(parsedBody.data);
    
            res.status(201).json({ error: false, data: story });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    }
    
    async updateStory(req:Request, res:Response){
        try {
            const story = await this.storyModel.updateStory(Number(req.params.id), req.body);
            if(!story){
                res.status(404).json({error:false, message:'Story Not Found'});
            }
            res.status(200).json({error: false, data: story});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true, message: 'Internal Server Error'});
        }
    }

    async deleteStory(req:Request, res:Response){
        try {
            const story = await this.storyModel.getStoryById(Number(req.params.id));
            if (!story) {
                return res.status(404).json({error: true, message: 'Story not found'});
            }
            await this.storyModel.deleteStory(Number(req.params.id));
            res.status(204).json({error: false, message: 'Story deleted successfully', date:story});
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true, message: 'Internal Server Error'});
        }
    }
}

export default StoryController;