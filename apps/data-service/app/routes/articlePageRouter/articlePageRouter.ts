import {Router} from 'express';
import { getArticlePage } from '../../controllers/articlePageController';

const articlePageRouter = Router();

articlePageRouter.get("/", getArticlePage)

export {articlePageRouter}