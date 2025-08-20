import {
  ArticleNavigatorButton,
  ArticleNavigatorWave,
  TrophyIcon,
} from "mobile-atoms";
import {
  ArticalNavigator,
  ArticalNavigatorEnd,
  ArticalNavigatorInner,
  ArticleNavigatorContainer,
  Container,
  TestCircle,
  Trophy,
  Trophies,
} from "./ArticleHeader.styles";

type ArticleNavigatorItem = {
  number: number;
  progress: number;
  isActive?: boolean;
  isDisabled?: boolean;
  isStarred?: boolean;
};

const articleNavigation: Array<ArticleNavigatorItem> = [
  { number: 1, progress: 0.2 },
  { number: 2, progress: 1 },
  // { number: 2, progress: 0 },
  { number: 3, progress: 0.2, isActive: true },
  { number: 4, progress: 0.4, isDisabled: true, isStarred: true },
  { number: 5, progress: 0.2, isDisabled: true, isStarred: true },
  // { number: 5, progress: 0.2, isDisabled: true, isStarred: true },
  // { progress: 0 },
  // { progress: 0 },
  // { progress: 0 },
  // { progress: 0 },
];

export default function ArticleHeader() {
  return (
    <Container>
      <TestCircle />
      <ArticleNavigatorContainer>
        <ArticalNavigatorEnd />
        <ArticalNavigator>
          <ArticalNavigatorInner>
            {articleNavigation.map((nav) => (
              <ArticleNavigatorButton
                isStarred={!!nav.isStarred}
                isDisabled={!!nav.isDisabled}
                isActive={!!nav.isActive}
                progress={nav.progress}
              >
                {nav.number}
              </ArticleNavigatorButton>
            ))}
          </ArticalNavigatorInner>
          <ArticleNavigatorWave numButtons={articleNavigation.length} />
        </ArticalNavigator>
        <ArticalNavigatorEnd />
      </ArticleNavigatorContainer>
      <Trophies>
        <Trophy>
          <TrophyIcon progress={0.7} />
        </Trophy>
        <Trophy>
          <TrophyIcon progress={0.3} isStarred />
        </Trophy>
      </Trophies>
      <TestCircle />
    </Container>
  );
}
