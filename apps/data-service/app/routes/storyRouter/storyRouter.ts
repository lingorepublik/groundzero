import { Router } from "express";
import {
  createStory,
  getStoriesByLang,
  validateStory,
} from "../../controllers/storyController.ts";

const storyRouter = Router();

storyRouter.post("/", validateStory, createStory);
storyRouter.get("/lang/:lang", getStoriesByLang);

export { storyRouter };
