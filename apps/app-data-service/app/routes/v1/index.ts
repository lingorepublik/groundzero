import { Router } from "express";
import { storiesRouter } from "./storiesRouter";
import { chaptersRouter } from "./chaptersRouter";
import { chapterRouter } from "./chapterRouter";

const v1Router = Router();

v1Router.use("/stories", storiesRouter);
v1Router.use("/chapters", chaptersRouter);
v1Router.use("/chapter", chapterRouter);

export { v1Router };
