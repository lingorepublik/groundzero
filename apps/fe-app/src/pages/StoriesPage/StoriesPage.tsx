import { StoryEntry } from "../../components";
import { Container } from "./StoriesPage.styles";
import { useFetchStoriesWithTranslationsByLangs } from "react-query";

export default function StoriesPage() {
  const { data: stories, isLoading } = useFetchStoriesWithTranslationsByLangs();

  if (isLoading) {
    // TODO: add progress skeleton
    return;
  }

  return (
    <Container>
      {stories?.map((story) => (
        <StoryEntry
          key={story.storyId}
          storyId={story.storyId}
          progressList={story.progressList}
          trophyProgress={story.trophyProgress}
          starredTrophyProgress={story.starredTrophyProgress}
          title={story.title}
          titleTranslation={story.titleTranslation}
          note={story.note}
          level={story.level}
          tier={story.tier}
        />
      ))}
    </Container>
  );
}
