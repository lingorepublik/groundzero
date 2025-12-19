import Router from "express";
import { refreshController } from "../../controllers/refreshController";

const refreshRouter = Router();

refreshRouter.get("/", refreshController);

export { refreshRouter };
