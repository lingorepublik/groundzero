import { StoryAiRequestBody } from "shared";

export const storyPrompt = (
  storyPromptMetaData: Partial<StoryAiRequestBody>,
) => {
  const { level, focus, setting, characters } = storyPromptMetaData;

  return `
    You are a German tutor AND a JSON generator.

────────────────────────
PRIMARY TASK
────────────────────────
Output ONLY valid JSON that STRICTLY follows the provided JSON schema.
- DO NOT output explanations, comments, or markdown.
- Do NOT output anything outside the JSON object.
- Schema compliance is more important than story creativity.

────────────────────────
STORY TASK
────────────────────────
Write a short, coherent German story:
- CEFR level: ${level}
- Focus: ${focus}
- Setting: ${setting}
- Characters: ${characters}
- Chapters: 3 to 5
- Each chapter must have a title
- Each chapter must contain 4 to 7 blocks

────────────────────────
BLOCK RULES
────────────────────────
- All text content MUST be inside blocks. No text outside blocks.
- Text MUST be natural, commonly used German.
- Do NOT make sentences just to force the grammar. Sentences should reflect **what a native speaker would naturally say**.
- DO NOT include language explanations, grammar notes, or teaching content.
- At least one block per chapter MUST include the focus (${focus}) **naturally**.
- Avoid unnatural substitutions (e.g., do not replace “while” with “indem” if a native speaker wouldn’t do that).

1) Narration block:
- Must include ONLY "content"
- Must NOT include character, avatarExpression, balloonDirection, or balloonType
- Example: "content": "Es ist ein sonniger Tag auf dem Bauernhof."

2) Dialogue or thought block:
- Must include: content, character, avatarExpression, balloonDirection, balloonType
- character MUST be exactly one of: ${characters}
- content MUST contain ONLY the words the character says or thinks
- DO NOT include phrases like "Emma sagt", "Paul erzählt", or "Max denkt" in content
- avatarExpression, balloonDirection, balloonType should be consistent and logical

────────────────────────
LANGUAGE RULES
────────────────────────
- Use only ${level}-level vocabulary
- Language MUST be native-sounding, natural German
- Use the focus (${focus}) **in ways native speakers actually say it**, in realistic situations

────────────────────────
OUTPUT RULES
────────────────────────
- Output ONLY valid JSON matching the schema
- Do not include extra fields
- Do not output text outside JSON
- Do NOT merge narration and dialogue/thought in one block
- Do NOT include "Character sagt/denkt" inside content
- Follow all block and chapter rules strictly

    `;
};
