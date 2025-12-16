import {
  Container,
  MenuBar,
  ArticleInfo,
  LanguageLevel,
  ArticleTitle,
  ArticleTitleTranslation,
  GrammerPoint,
  Sheet,
} from "./ChaptersFooter.styles.ts";
import TutorialIconButton from "mobile-atoms/src/components/svg-buttons/TutorialIconButton";
import TutorialVideoButton from "mobile-atoms/src/components/svg-buttons/TutorialVideoIconButton";
import TranslationIconButton from "mobile-atoms/src/components/svg-buttons/TranslationIconButton";
import {
  useFetchStoriesWithTranslationsByLangs,
  useInsight,
} from "react-query";
import Insight from "../Insight/Insight";
import { useParams } from "react-router";

export default function ChaptersFooter() {
  const { storyId } = useParams();
  const { insight } = useInsight();

  const { data: stories } = useFetchStoriesWithTranslationsByLangs();

  if (!stories && !storyId) {
    return null;
  }

  const story = stories?.find((story) => story.storyId === storyId);

  if (!story) {
    return null;
  }

  return (
    <Container>
      <MenuBar>
        <TranslationIconButton disabled={false} active={false} />
        <TutorialIconButton />
        <TutorialVideoButton disabled />
        {insight?.length && insight.length > 0 && (
          <Sheet>
            <Insight translation={insight[0]} insight={insight[1]}></Insight>
          </Sheet>
        )}
      </MenuBar>
      <ArticleInfo>
        <LanguageLevel>{story.level}</LanguageLevel>
        <ArticleTitle>{story.title}</ArticleTitle>
        <ArticleTitleTranslation>
          {story.titleTranslation}
        </ArticleTitleTranslation>
        {story.note && <GrammerPoint>{story.note}</GrammerPoint>}
      </ArticleInfo>
    </Container>
  );
}
