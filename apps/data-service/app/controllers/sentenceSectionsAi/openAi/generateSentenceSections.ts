import { OpenAI } from "openai";
import { sentenceSectionPrompt } from "./prompts/sentenceSectionPrompt";
import { sentenceSectionSchema } from "./schemas/sentenceSectionSchema";
import { OPEN_AI_MODEL } from "../../../utils/openAiModels";

export const generateSentenceSections = async (sentence: string) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const abc = sentence.endsWith(".") ? sentence.slice(0, -1) : sentence;

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

    input: sentenceSectionPrompt(abc),
  });

  return JSON.parse(response.output_text);
};
