import { StoryEntry } from "~/Components";
import { Container } from "./StoriesPage.styles";
import { useFetchStoriesWithTranslationsByLangs } from "react-query";
import type { StoryUI } from "shared";

// TODO: type story

export default function StoriesPage() {
  const { data: stories, isLoading } = useFetchStoriesWithTranslationsByLangs();

  if (isLoading) {
    // TODO: add progress skeleton
    return;
  }

  return (
    <Container>
      {stories?.map((story: StoryUI) => (
        <StoryEntry
          link={story.link}
          progressList={story.progressList}
          trophyProgress={story.trophyProgress}
          starredTrophyProgress={story.starredTrophyProgress}
          title={story.title}
          titleTranslation={story.titleTranslation}
          note={story.note}
        />
      ))}
    </Container>
  );
}
