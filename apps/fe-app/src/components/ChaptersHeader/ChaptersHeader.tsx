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
  Trophies,
  Trophy,
} from "./ChaptersHeader.styles.ts";
import { useFetchChapterNavItems } from "react-query";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

export default function ChaptersHeader() {
  const navigate = useNavigate();
  const { storyId, chapterId } = useParams();
  const { data } = useFetchChapterNavItems(storyId);

  useEffect(() => {
    if (data && data.length > 0) {
      const activeChapterId = data.find(
        (navItem) => navItem.isActive,
      )?.chapterId;

      !chapterId &&
        activeChapterId &&
        navigate(`/stories/${storyId}/chapters/${activeChapterId}`, {
          replace: true,
        });
    }
  }, [data]);

  if (!data || data.length === 0) {
    return null;
  }

  const handleClick = (chapterId: string) => {
    navigate(`/stories/${storyId}/chapters/${chapterId}`);
  };

  return (
    <Container>
      <TestCircle />
      <ArticleNavigatorContainer>
        <ArticalNavigatorEnd />
        <ArticalNavigator>
          <ArticalNavigatorInner>
            {data?.map((navItem) => (
              <ArticleNavigatorButton
                key={navItem.chapterId}
                isStarred={!!navItem.isStarred}
                isDisabled={!!navItem.isDisabled}
                isActive={chapterId === navItem.chapterId}
                progress={navItem.progress}
                onClick={() =>
                  !navItem.isDisabled &&
                  !(chapterId === navItem.chapterId) &&
                  handleClick(navItem.chapterId)
                }
              >
                {navItem.number}
              </ArticleNavigatorButton>
            ))}
          </ArticalNavigatorInner>
          <ArticleNavigatorWave numButtons={data.length} />
        </ArticalNavigator>
        <ArticalNavigatorEnd />
      </ArticleNavigatorContainer>
      <Trophies>
        <Trophy>
          <TrophyIcon progress={0} />
        </Trophy>
        <Trophy>
          <TrophyIcon progress={0} isStarred />
        </Trophy>
      </Trophies>
      <TestCircle />
    </Container>
  );
}
