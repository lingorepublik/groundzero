import { Router } from "express";
import { storyLocaleRouter } from "./storyLocaleRouter";
import { chapterRouter } from "./chapterRouter";
import { chapterLocaleRouter } from "./chapterLocaleRouter";
import { blockRouter } from "./blockRouter";
import { blockLocaleRouter } from "./blockLocaleRouter";
import { storyRouter } from "./storyRouter";
import { storyAiRouter } from "./storyAiRouter";
import { translateInsightRouter } from "./translateInsightRouter";
import { sentenceSectionAiRouter } from "./sentenceSectionAiRouter";

const v1Router = Router();

v1Router.use("/story", storyRouter);
v1Router.use("/story-locale", storyLocaleRouter);
v1Router.use("/chapter", chapterRouter);
v1Router.use("/chapter-locale", chapterLocaleRouter);
v1Router.use("/block", blockRouter);
v1Router.use("/block-locale", blockLocaleRouter);
v1Router.use("/story-ai", storyAiRouter);
v1Router.use("/translate-insight-ai", translateInsightRouter);
v1Router.use("/sentence-section-ai", sentenceSectionAiRouter);

export { v1Router };
