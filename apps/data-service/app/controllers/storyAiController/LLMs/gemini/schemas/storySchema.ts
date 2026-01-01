import { SchemaType, Schema } from "@google/generative-ai";
import { AVATAR_EXPRESSIONS, BALLOON_DIRECTIONS, BALLOON_TYPES } from "shared";

export const schema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    storyTitle: { type: SchemaType.STRING },
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
  required: ["storyTitle", "chapters"],
};
