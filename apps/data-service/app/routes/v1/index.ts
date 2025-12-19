import { Router } from "express";
import { storyLocaleRouter } from "./storyLocaleRouter";
import { chapterRouter } from "./chapterRouter";
import { chapterLocaleRouter } from "./chapterLocaleRouter";
import { blockRouter } from "./blockRouter";
import { blockLocaleRouter } from "./blockLocaleRouter";
import { storyRouter } from "./storyRouter";

const v1Router = Router();

v1Router.use("/story", storyRouter);
v1Router.use("/story-locale", storyLocaleRouter);
v1Router.use("/chapter", chapterRouter);
v1Router.use("/chapter-locale", chapterLocaleRouter);
v1Router.use("/block", blockRouter);
v1Router.use("/block-locale", blockLocaleRouter);

export { v1Router };
