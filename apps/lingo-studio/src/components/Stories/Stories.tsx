import { useStories, useUpdateStory } from "react-query";
import {
  Story,
  StoriesWrapper,
  Container,
  RightColumn,
  StoryContent,
} from "./Stories.styles";
import { NewStoryButton } from "../NewStoryButton";
import { IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

function Stories() {
  const { data, isLoading } = useStories();
  const updateStoryMutation = useUpdateStory();

  const handleArrowClick = (index: number, arrow: "up" | "down") => {
    if (!data) {
      return;
    }

    const seq1 =
      arrow === "down"
        ? data[index + 1]?.seq || data[data?.length - 1].seq
        : data[index - 1]?.seq || data[0].seq;
    const seq2 =
      arrow === "down"
        ? data[index + 2]?.seq || data[data?.length - 1].seq + 1
        : data[index - 2]?.seq || 0;

    const newSeq = (seq1 + seq2) / 2;

    updateStoryMutation.mutate({
      id: data[index]._id,
      story: { ...data[index], seq: newSeq },
    });
  };

  if (isLoading) {
    return <Container>Loading...!</Container>;
  }

  return (
    <Container>
      {data && data.length > 0 ? (
        <>
          <StoriesWrapper>
            {data.map((story, index) => (
              <div key={index}>
                {index === 0 && (
                  <NewStoryButton seq={story.seq / 2} topSeparator={false} />
                )}
                <Story>
                  <StoryContent>
                    <span>{story.title}</span>
                    <span>{story.note}</span>
                    <span>Level: {story.level}</span>
                    <span>Tier: {story.tier}</span>
                    <span>{story.seq}</span>
                  </StoryContent>
                  <RightColumn>
                    <IconButton
                      onClick={() => handleArrowClick(index, "up")}
                      disabled={index === 0}
                      sx={{
                        width: 20,
                        height: 20,
                        padding: 0,
                      }}
                    >
                      <ExpandLessOutlinedIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleArrowClick(index, "down")}
                      disabled={index >= data.length - 1}
                      sx={{
                        width: 20,
                        height: 20,
                        padding: 0,
                      }}
                    >
                      <ExpandMoreOutlinedIcon />
                    </IconButton>
                  </RightColumn>
                </Story>
                <NewStoryButton
                  seq={
                    ((data[index + 1]?.seq || story.seq + 1) + story.seq) / 2
                  }
                  bottomSeparator={index < data.length - 1}
                />
              </div>
            ))}
          </StoriesWrapper>
        </>
      ) : (
        <NewStoryButton seq={1} topSeparator={false} bottomSeparator={false} />
      )}
    </Container>
  );
}

export default Stories;
