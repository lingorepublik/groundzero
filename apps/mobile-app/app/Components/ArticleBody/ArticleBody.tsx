import {
  ArticleTitle,
  Container,
  ArticleTextContainer,
  ArticleTitleHeadphoneIcon,
  ArticleTitleTexts,
  ArticleTitleNative,
  ArticleTitleTranslated,
} from "./ArticleBody.styles";
import { type SentenceUnit, Sentence } from "../Sentence";
import { useArticle } from "react-query";

export default function ArticleBody() {
  const { data } = useArticle();

  return (
    <Container>
      <ArticleTitle>
        <ArticleTitleTexts>
          <ArticleTitleNative>Die Vorbereitung</ArticleTitleNative>
          <ArticleTitleTranslated>The preparation</ArticleTitleTranslated>
        </ArticleTitleTexts>
        <ArticleTitleHeadphoneIcon />
      </ArticleTitle>
      <ArticleTextContainer>
        {data?.map((sentenceUnit, index) => (
          <Sentence key={index} sentenceUnit={sentenceUnit} />
        ))}
      </ArticleTextContainer>
    </Container>
  );
}
