import { OpenAI } from "openai";
import { sentenceSectionPrompt } from "./prompts/sentenceSectionPrompt";
import { sentenceSectionSchema } from "./schemas/sentenceSectionSchema";
import { OPEN_AI_MODEL } from "../../../utils/openAiModel";

export const generateSentenceSections = async (sentence: string) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: OPEN_AI_MODEL,

    text: {
      format: {
        type: "json_schema",
        name: "sentence_section_response",
        strict: false,
        schema: sentenceSectionSchema,
      },
    },

    input: sentenceSectionPrompt(sentence),
  });

  return JSON.parse(response.output_text);
};
