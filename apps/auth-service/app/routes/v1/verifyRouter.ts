import Router from "express";
import { verifyController } from "../../controllers/verifyController";

const verifyRouter = Router();

verifyRouter.get("/", verifyController);

export { verifyRouter };
