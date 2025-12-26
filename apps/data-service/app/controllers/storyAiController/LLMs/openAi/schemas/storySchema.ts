import { AVATAR_EXPRESSIONS, BALLOON_DIRECTIONS, BALLOON_TYPES } from "shared";

export const storySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    chapters: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          blocks: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                content: { type: "string" },
                character: { type: "string" },
                avatarExpression: {
                  type: "string",
                  enum: AVATAR_EXPRESSIONS,
                },
                balloonDirection: {
                  type: "string",
                  enum: BALLOON_DIRECTIONS,
                },
                balloonType: {
                  type: "string",
                  enum: BALLOON_TYPES,
                },
              },
              required: ["content"],
            },
          },
        },
        required: ["title"],
      },
    },
  },
  required: ["title"],
};
