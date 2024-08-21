import StoryController from '@/controllers/StoryController';
import wrapWithErrorHandling from '@/utils/wrap';
import express from 'express';
const storyRouter = express.Router();
const storyController = new StoryController();

storyRouter.get('/', wrapWithErrorHandling(async(req, res) => {
    await storyController.getStories(req, res);
}))

storyRouter.get('/:id', wrapWithErrorHandling(async(req, res) => {
    await storyController.getStoryById(req, res);
}))

storyRouter.post('/', wrapWithErrorHandling(async(req, res) => {
    await storyController.createStory(req, res);
}))

storyRouter.put('/:id', wrapWithErrorHandling(async(req, res) => {
    await storyController.updateStory(req, res);
}))

storyRouter.delete('/:id', wrapWithErrorHandling(async(req, res) => {
    await storyController.deleteStory(req, res);
}))
export default storyRouter;