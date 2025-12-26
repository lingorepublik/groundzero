import { Language } from "shared";
import { OpenAI } from "openai";
import { translatePrompt } from "./prompts/translatePrompt";
import { translateSchema } from "./schemas/translateSchema";
import { OPEN_AI_MODEL } from "../../../../utils/openAiModel";

export const translateText = async (
  text: string,
  langOrigin: Language,
  langTarget: Language,
) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: OPEN_AI_MODEL,

    text: {
      format: {
        type: "json_schema",
        name: "translate_response",
        strict: false,
        schema: translateSchema,
      },
    },

    input: translatePrompt(text, langOrigin, langTarget),
  });

  return JSON.parse(response.output_text);
};
