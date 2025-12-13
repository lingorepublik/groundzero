import { useStories } from "react-query";
import { StoriesWrapper, Container } from "./Stories.styles";
import { NewStoryButton } from "../NewStoryButton";
import { Story } from "../Story";

function Stories() {
  const { data, isLoading } = useStories();

  if (isLoading) {
    return <Container>Loading...!</Container>;
  }

  return (
    <Container>
      <div>STORIES</div>
      {data && data.length > 0 ? (
        <StoriesWrapper>
          {data.map((story, index) => (
            <div key={index}>
              {index === 0 && (
                <NewStoryButton seq={story.seq / 2} topSeparator={false} />
              )}
              <Story index={index} />
              <NewStoryButton
                seq={((data[index + 1]?.seq || story.seq + 1) + story.seq) / 2}
                bottomSeparator={index < data.length - 1}
              />
            </div>
          ))}
        </StoriesWrapper>
      ) : (
        <NewStoryButton seq={1} topSeparator={false} bottomSeparator={false} />
      )}
    </Container>
  );
}

export default Stories;
