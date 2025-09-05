import React from "react";
import {
  ArticleTitle,
  Container,
  ArticleTextContainer,
  ArticleTitleTexts,
  ArticleTitleHeadphoneIcon,
  ArticleTitleNative,
  TextTranslated,
  ArticleText,
  TextNative,
  ArticleSentence,
} from "./ArticleBody.styles";
import { SentenseCharacter } from "../SentenceCharacter";

const ArticlesSentenses = [
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
    sentenseBaloonDirection: "left",
    sentenceBaloonType: "speech",
    character: "Emma",
    avatar: "",
    expression: "talk",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
    sentenseBaloonDirection: "right",
    sentenceBaloonType: "speech",
    character: "Theo",
    avatar: "",
    expression: "smile",
  },
  {
    native: "askas asd asd asa sd asd daks dalkds lakds",
    translated: "aksj hdkjsaa sd aasd asd as hdkjash dkasjd kjh ads",
    sentenseBaloonDirection: "left",
    sentenceBaloonType: "thought",
    character: "Emma",
    avatar: "",
    expression: "think",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
  {
    native: "askas asd asd asa sd asd daks dalkds lakds",
    translated: "aksj hdkjsaa sd aasd asd as hdkjash dkasjd kjh ads",
    sentenseBaloonDirection: "right",
    sentenceBaloonType: "thought",
    character: "Theo",
    avatar: "",
    expression: "think",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
];

export default function ArticleBody() {
  return (
    <Container>
      <ArticleTitle>
        <ArticleTitleTexts>
          <ArticleTitleNative>Die Vorbereitung</ArticleTitleNative>
          <TextTranslated>The preparation</TextTranslated>
        </ArticleTitleTexts>
        <ArticleTitleHeadphoneIcon />
        {/* Die Vorbereitung */}
      </ArticleTitle>
      <ArticleTextContainer>
        {ArticlesSentenses.map((sentense) => (
          <ArticleSentence
            alignRight={sentense.sentenseBaloonDirection === "right"}
          >
            {sentense.sentenseBaloonDirection === "left" && (
              <SentenseCharacter
                name={sentense.character}
                type={sentense.sentenceBaloonType}
              />
            )}
            <ArticleText
              alignRight={sentense.sentenseBaloonDirection === "right"}
            >
              <TextNative>{sentense.native}</TextNative>
              <TextTranslated>{sentense.translated}</TextTranslated>
            </ArticleText>
            {sentense.sentenseBaloonDirection === "right" && (
              <SentenseCharacter
                name={sentense.character}
                direction="right"
                type={sentense.sentenceBaloonType}
              />
            )}
          </ArticleSentence>
        ))}
      </ArticleTextContainer>
    </Container>
  );
}
