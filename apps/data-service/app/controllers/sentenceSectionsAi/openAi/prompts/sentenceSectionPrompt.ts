export const sentenceSectionPrompt = (sentence: string) => {
  return `
        You are given a German sentence ${sentence}.

        Your task is to generate a JSON array called \`sentenceSections\` that breaks the sentence into structured parts according to the rules below.

        GENERAL RULES
        - Split the sentence into individual tokens.
        - Every word and every punctuation mark MUST be its own object.
        - Preserve the original word order.
        - Use 0-based indexing when referring to positions.
        
        OBJECT SHAPE
        Each item must follow this structure:
        {
          "word": string,
          "lemma"?: string,
          "refIndex"?: number,
          "punctuationMark"?: "true"
        }
        
        RULES FOR \`word\`
        - \`word\` must be exactly the surface form as it appears in the sentence.
        
        RULES FOR \`lemma\`
        - \`lemma\` is the base (dictionary) form of the word.
        - Omit \`lemma\` if it is identical to \`word\`.
        - Lemmas MAY consist of multiple words (e.g. "sich umziehen", "in das").
        - Attach the lemma ONLY to the first occurrence of the lexical unit.
        - eg1. in this sentence 'Ich merke mich den Titel.', lemma of 'merke' is 'sich merken' and refIndex of 'mich' is 1.
        - eg2. in this sentence 'Ich ziehe mich um', lemma of 'ziehe' is 'sich umziehen' and the refIndex of 'mich' and 'um' is 1 and no ref index is needed for 'ziehe'.
        - eg3. 'Ich kann ein bisschen deutsch', lemma of ein is 'ein bisschen' and refIndex of 'bisschen' is 2.
        - when deciding on lemma, you have top consider separable verbs, reflexive verbs, etc...
        
        MULTI-WORD LEMMAS
        - If a lemma consists of multiple surface words (e.g. separable verbs or reflexive verbs):
          - Attach the lemma to the first relevant verb token.
          - All other surface parts belonging to the lemma MUST:
            - have NO lemma
            - include a \`refIndex\` pointing to the index of the lemma-owning token.
        
        REFLEXIVE VERBS
        - If a lemma contains "sich":
          - All corresponding reflexive pronouns (mich, mir, dich, sich, uns, euch) MUST reference the lemma owner via \`refIndex\`.
        
        SEPARABLE VERBS
        - For separable verbs (e.g. "einkaufen", "umziehen"):
          - Attach the lemma to the conjugated verb.
          - The separated particle MUST reference the verb using \`refIndex\`.
        
        PREPOSITIONS + ARTICLES
        - Contracted forms (e.g. "ins", "zum", "am") MUST have a lemma (e.g. "in das", "zu dem", "an dem").
        
        PUNCTUATION
        - Punctuation marks (e.g. ",", ".", "?", "!") MUST:
          - be their own object
          - include \`"punctuationMark": "true"\`
          - have NO lemma
          - have NO refIndex
          - You MUST NOT add, infer, normalize, or duplicate any token.
          - Adding any extra punctuation token is INVALID.
          - if the sentence ends with '.' you MUST NOT add an additional section with another '.'.
          `;
};
