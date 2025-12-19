import Router from "express";
import { changePasswordController } from "../../controllers/changePasswordController";

const passwordChangeRouter = Router();

passwordChangeRouter.post("/", changePasswordController);

export { passwordChangeRouter };
