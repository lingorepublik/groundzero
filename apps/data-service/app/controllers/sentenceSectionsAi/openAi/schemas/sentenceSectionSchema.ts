export const sentenceSectionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    sentenceSections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          word: { type: "string" },
          lemma: { type: "string" },
          refIndex: { type: "number" },
          punctuationMark: { type: "string" },
        },
        required: ["word"],
      },
    },
  },
};
