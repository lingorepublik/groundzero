import { Language } from "shared";

export const translatePrompt = (
  text: string,
  langOrigin: Language,
  langTarget: Language,
) => {
  return `
    You are a native ${langTarget} speaker and an experienced professional translator.
    
    Translate the following text from ${langOrigin} to ${langTarget} so that it sounds natural, fluent, and idiomatic to a native speaker.
    
    Guidelines:
    - Prefer how native speakers actually talk or write.
    - Adapt idioms and phrasing naturally.
    - Preserve emotions, politeness level, and intent.
    - Avoid literal or unnatural translations.
    - Do NOT add explanations or extra fields.
    - Return the result strictly as JSON in the following format:
      { "translation": "<translated text>" }
    
    Text to translate:
    """${text}"""
    `;
};
