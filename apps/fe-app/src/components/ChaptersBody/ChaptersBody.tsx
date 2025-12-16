import {
  ArticleTitle,
  Container,
  ArticleTextContainer,
  ArticleTitleHeadphoneIcon,
  ArticleTitleTexts,
  ArticleTitleNative,
  ArticleTitleTranslated,
} from "./ChaptersBody.styles.ts";
import { Sentence } from "../Sentence";
import { useFetchChapterAndBlocksWithLocales } from "react-query";
import { useParams } from "react-router";

export default function ChaptersBody() {
  const { chapterId } = useParams();
  const { data: chapter } = useFetchChapterAndBlocksWithLocales(chapterId);

  console.log(chapter);

  if (!chapter) {
    return null;
  }

  return (
    <Container>
      <ArticleTitle>
        <ArticleTitleTexts>
          <ArticleTitleNative>{chapter.title}</ArticleTitleNative>
          {chapter.locales?.titleTranslation && (
            <ArticleTitleTranslated>
              {chapter.locales.titleTranslation}
            </ArticleTitleTranslated>
          )}
        </ArticleTitleTexts>
        <ArticleTitleHeadphoneIcon />
      </ArticleTitle>
      <ArticleTextContainer>
        {chapter.blocks.map((block, index) => {
          return block.contentType === "SENTENCE" ? (
            <Sentence key={index} block={block} />
          ) : (
            <div>illustration</div>
          );
        })}
      </ArticleTextContainer>
    </Container>
  );
}
