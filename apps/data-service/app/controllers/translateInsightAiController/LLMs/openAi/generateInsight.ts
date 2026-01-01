import { Language } from "shared";
import { OpenAI } from "openai";
import { insightSchema } from "./schemas/insightSchema";
import { insightPrompt } from "./prompts/insightPrompt";
import { OPEN_AI_MODEL } from "../../../../utils/openAiModels";

export const generateInsight = async (
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
        name: "insight_response",
        strict: false,
        schema: insightSchema,
      },
    },

    input: insightPrompt(text, langOrigin, langTarget),
  });

  return JSON.parse(response.output_text);
};
