import { ChapterController, StoryController } from '@/controllers';
import wrapWithErrorHandling from '@/utils/wrap';
import express from 'express';

const router = express.Router();
const storyController = new StoryController();

router.get('/', wrapWithErrorHandling(async(req, res) => {
    await storyController.getStories(req, res);
}))

router.get('/:id', wrapWithErrorHandling(async(req, res) => {
    await storyController.getStoryById(req, res);
}))

router.post('/', wrapWithErrorHandling(async(req, res) => {
    await storyController.createStory(req, res);
}))

router.put('/:id', wrapWithErrorHandling(async(req, res) => {
    await storyController.updateStory(req, res);
}))

router.delete('/:id', wrapWithErrorHandling(async(req, res) => {
    await storyController.deleteStory(req, res);
}))

const chapterController = new ChapterController();

router.get('/:story_id/chapters', wrapWithErrorHandling(async(req, res) => {
    await chapterController.getChapters(req, res);
}))

router.get('/:story_id/chapter/:id', wrapWithErrorHandling(async(req, res) => {
    await chapterController.getChapterById(req, res);
}))

router.post('/:story_id/chapter', wrapWithErrorHandling(async(req, res) => {
    await chapterController.createChapter(req, res);
}))

router.put('/:story_id/chapter/:id', wrapWithErrorHandling(async(req, res) => {
    await chapterController.updateChapter(req, res);
}))

router.delete('/story_id/chapter/:id', wrapWithErrorHandling(async(req, res) => {
    await chapterController.deleteChapter(req, res);
}))

export default router;