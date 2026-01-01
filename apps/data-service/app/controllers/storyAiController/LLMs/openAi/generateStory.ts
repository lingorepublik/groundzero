import { OpenAI } from "openai";
import { storySchema } from "./schemas/storySchema";
import { storyPrompt } from "./prompts/storyPrompt";
import { StoryAiRequestBody } from "shared";
import { OPEN_AI_MODEL } from "../../../../utils/openAiModels";

export const generateStory = async (
  storyPromptMetaData: Partial<StoryAiRequestBody>,
) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: OPEN_AI_MODEL,

    text: {
      format: {
        type: "json_schema",
        name: "story_response",
        strict: false,
        schema: storySchema,
      },
    },

    input: storyPrompt(storyPromptMetaData),
  });

  return JSON.parse(response.output_text);
};
