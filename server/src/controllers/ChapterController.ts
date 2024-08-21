import { Request, Response } from 'express';
import ChapterModel from "@/models/Chapter";
class ChapterController {
    private chapterModel: ChapterModel;

    constructor(){
        this.chapterModel = new ChapterModel();
    }

}

export default ChapterController;