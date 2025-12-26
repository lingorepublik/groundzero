import { Request, Response, NextFunction } from "express";
import { generateStory } from "./LLMs/openAi/generateStory";
import { StoryAiRequestBody } from "shared";
import { StoryModel } from "../../models/StoryModel";
import { ChapterModel } from "../../models/ChapterModel";
import { BlockModel } from "../../models/BlockModel";

export const createStoryAi = async (
  req: Request<{}, {}, StoryAiRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { lang, seq, characters, setting, focus, level, note } = req.body;

    const generatedStory = await generateStory({
      characters,
      setting,
      focus,
      level,
    });

    const savedStory = await StoryModel.create({
      lang,
      seq,
      title: generatedStory.title,
      level,
      note,
    });

    for (const [chapterIndex, chapter] of generatedStory.chapters.entries()) {
      const savedChapter = await ChapterModel.create({
        storyId: savedStory._id,
        title: chapter.title,
        seq: chapterIndex + 1,
      });

      const blocks = generatedStory.chapters[chapterIndex].blocks;

      for (const [blockIndex, block] of blocks.entries()) {
        await BlockModel.create({
          chapterId: savedChapter._id,
          seq: blockIndex + 1,
          contentType: "SENTENCE",
          character: block.character,
          contentString: block.content,
          avatarExpression: block.avatarExpression,
          balloonDirection: block.balloonDirection,
          balloonType: block.balloonType,
        });
      }
    }

    res.send({ generatedStory, createdStory: savedStory });
  } catch (e) {
    next(e);
  }
};
