import { Router } from "express";
import { signUpController } from "../../controllers/signUpController";

const signUpRouter = Router();

signUpRouter.post("/", signUpController);

export { signUpRouter };
