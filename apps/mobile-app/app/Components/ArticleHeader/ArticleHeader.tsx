import { ArticleNavigatorWave } from "mobile-atoms";
import {
  ArticalNavigator,
  ArticalNavigatorEnd,
  ArticalNavigatorInner,
  ArticleNavigatorContainer,
  Container,
  TestCircle,
  TestPokalHolter,
} from "./ArticleHeader.styles";

const articleNavigation = [
  { progress: 1 },
  { progress: 0.5 },
  { progress: 0 },
  { progress: 0 },
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
              <TestCircle />
            ))}
          </ArticalNavigatorInner>
          <ArticleNavigatorWave numButtons={articleNavigation.length} />
        </ArticalNavigator>
        <ArticalNavigatorEnd />
      </ArticleNavigatorContainer>
      <TestPokalHolter />
      <TestCircle />
    </Container>
  );
}
