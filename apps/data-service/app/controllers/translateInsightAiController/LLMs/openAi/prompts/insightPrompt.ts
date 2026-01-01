import { Language } from "shared";

export const insightPrompt = (
  text: string,
  langOrigin: Language,
  langTarget: Language,
) => {
  return `
You are a professional language teacher and a native speaker of ${langTarget}.

Explain the language aspects of the text written in ${langOrigin} for a ${langTarget} learner.

Rules:
- Do NOT translate the text
- Do NOT restate or quote the text
- Do NOT add a summary or conclusion
- Keep the explanation short, clear, and engaging
- Do NOT explain the same word or grammer twice

Formatting:
- Use **Markdown (MD3)**
- Use small headings (####)
- Do NOT use short bullet points but line breaks
- Do NOT use horizontal rules or separators
- Avoid verbosity

Return strictly valid JSON matching this schema:
{ "insight": "<Markdown explanation>" }

Text:
"""${text}"""
`;
};
