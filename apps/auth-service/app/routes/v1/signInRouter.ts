import { Router } from "express";
import { signInController } from "../../controllers/signInController";

const signInRouter = Router();

signInRouter.post("/", signInController);

export { signInRouter };
