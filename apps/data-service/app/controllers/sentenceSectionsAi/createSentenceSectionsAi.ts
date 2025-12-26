import { Request, Response, NextFunction } from "express";
import { generateSentenceSections } from "./openAi/generateSentenceSections";
import { BlockModel } from "../../models/BlockModel";
import createHttpError from "http-errors";

export const createSentenceSectionsAi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { sentence, blockId, langOrigin } = req.body;
    /**
     * langOrigin can be used to select the right prompt later
     * */

    const generatedSentenceSections = await generateSentenceSections(sentence);

    const retrievedBlock = await BlockModel.findById(blockId);

    if (!retrievedBlock) {
      throw createHttpError(401, "Block not found");
    }

    retrievedBlock.content = generatedSentenceSections.sentenceSections;

    const block = await retrievedBlock.save();

    res.send({ block, generatedSentenceSections });
  } catch (e) {
    next(e);
  }
};
