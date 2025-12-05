import { Router } from "express";
import {
  createStory,
  getStoriesByLang,
  updateStory,
  validateStory,
} from "../../controllers/storyController.ts";

const storyRouter = Router();

storyRouter.post("/", validateStory, createStory);
storyRouter.get("/lang/:lang", getStoriesByLang);
storyRouter.put("/:id", validateStory, updateStory);

export { storyRouter };
