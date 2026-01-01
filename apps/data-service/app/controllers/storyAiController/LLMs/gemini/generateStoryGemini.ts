import { GoogleGenerativeAI } from "@google/generative-ai";
import { schema } from "./schemas/storySchema";
import { StoryAiRequestBody } from "shared";
import { storyPrompt } from "./prompts/storyPrompt";
import { AI_MODEL_GEMINI_3_PRO } from "../../../../utils/openAiModels";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const genAI = new GoogleGenerativeAI("AIzaSyByAMkKQezlKxN2g6pVFN8mYf6pROWf2d0");

async function generateStoryGemini(
  storyPromptMetaData: Partial<StoryAiRequestBody>,
) {
  const model = genAI.getGenerativeModel({
    model: AI_MODEL_GEMINI_3_PRO,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = storyPrompt(storyPromptMetaData);

  try {
    const result = await model.generateContent(prompt);
    const storyData = JSON.parse(result.response.text());
    //
    // console.log(storyData);
    return storyData;
    // return "asdasd";
  } catch (e) {
    console.error("Failed to parse or generate JSON:", e);
  }
}

export { generateStoryGemini };
