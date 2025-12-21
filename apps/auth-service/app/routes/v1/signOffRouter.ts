import { Router } from "express";
import { signOffController } from "../../controllers/signOffController";

const signOffRouter = Router();

signOffRouter.get("/", signOffController);

export { signOffRouter };
