import { GoogleGenerativeAI, SchemaType, Schema } from "@google/generative-ai";
import { AVATAR_EXPRESSIONS, BALLOON_DIRECTIONS, BALLOON_TYPES } from "shared";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function getJsonStory() {
  console.log("al djlakdjslkjs dlks jal");
  const schema: Schema = {
    type: SchemaType.OBJECT,
    properties: {
      storyTitle: { type: SchemaType.STRING },
      storyNote: { type: SchemaType.STRING },
      chapters: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            title: { type: SchemaType.STRING },
            blocks: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  content: {
                    type: SchemaType.STRING,
                  },
                  character: {
                    type: SchemaType.STRING,
                    enum: ["Emma", "Paul"],
                  } as Schema,
                  ballonDirection: {
                    type: SchemaType.STRING,
                    enum: BALLOON_DIRECTIONS,
                  } as Schema,
                  ballonType: {
                    type: SchemaType.STRING,
                    enum: BALLOON_TYPES,
                  } as Schema,
                  avatarExpression: {
                    type: SchemaType.STRING,
                    enum: AVATAR_EXPRESSIONS,
                  } as Schema,
                },
                // required: ["content"],
              },
            },
          },
          // required: ["title", "blocks"],
        },
      },
    },
    required: ["storyTitle", "storyNote", "chapters"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `
    Generate a simple German story for language learners focused on the grammar point "indem" (by doing / by means of).
    
    STORY REQUIREMENTS:
    1. Length: Create between 3 and 5 chapters.
    2. Grammar Goal: Use the connector "indem" at least once in every chapter to demonstrate its usage (e.g., "Er spart Energie, indem er das Licht ausschaltet").
    3. Language Level: Simple German (A1 level).
    4. Logic: The story must be connected and follow a logical progression from Chapter 1 to the end.
    
    BLOCK RULES:
    - If the block content is a narration/sentence, leave all the other fields of the block empty or omitted.
    - If the block is a thought or conversation, use "Emma" or "Paul" and provide the appropriate balloon and expression metadata.
    
    JSON STRUCTURE:
    - storyTitle: A catchy German title.
    - storyNote: A brief explanation (in English) of how "indem" was used in the story and the grammatical rule behind it.
    - chapters: An array of chapters containing the blocks.
    `;

  try {
    const result = await model.generateContent(prompt);
    const storyData = JSON.parse(result.response.text());
    //
    console.log(storyData);
    return storyData;
    // return "asdasd";
  } catch (e) {
    console.error("Failed to parse or generate JSON:", e);
  }
}
