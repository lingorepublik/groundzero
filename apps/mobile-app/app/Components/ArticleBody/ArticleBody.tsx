import {
  ArticleTitle,
  Container,
  ArticleTextContainer,
  ArticleTitleHeadphoneIcon,
  ArticleTitleTexts,
  ArticleTitleNative,
  ArticleTitleTranslated,
} from "./ArticleBody.styles";
import { Sentence } from "../Sentence";

const ArticlesSentences = [
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
    sentenceBaloonDirection: "left",
    sentenceBaloonType: "speech",
    character: "Emma",
    avatar: "",
    expression: "talk",
  },
  {
    native: "ask daks dalkds lakds",
    translated: "aksj hdkjsa hdkjash dkasjd kjh ads",
    sentenceBaloonDirection: "right",
    sentenceBaloonType: "speech",
    character: "Theo",
    avatar: "",
    expression: "smile",
  },
  {
    native: "askas asd asd asa sd asd daks dalkds lakds",
    translated: "aksj hdkjsaa sd aasd asd as hdkjash dkasjd kjh ads",
    sentenceBaloonDirection: "left",
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
    sentenceBaloonDirection: "right",
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
          <ArticleTitleTranslated>The preparation</ArticleTitleTranslated>
        </ArticleTitleTexts>
        <ArticleTitleHeadphoneIcon />
        {/* Die Vorbereitung */}
      </ArticleTitle>
      <ArticleTextContainer>
        {ArticlesSentences.map((sentence, index) => (
          <Sentence key={index} sentence={sentence} />
        ))}
      </ArticleTextContainer>
    </Container>
  );
}
