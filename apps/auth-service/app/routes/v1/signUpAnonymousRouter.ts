import { Router } from "express";
import { signUpAnonymousController } from "../../controllers/signUpAnonymousController";

const signUpAnonymousRouter = Router();

signUpAnonymousRouter.get("/", signUpAnonymousController);

export { signUpAnonymousRouter };
