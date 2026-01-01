import { IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import {
  Container,
  StoryContent,
  UtilityButtons,
  RightColumn,
  LevelTier,
  Level,
  Tier,
  IdSeq,
  Title,
  NavDiv,
} from "./Story.styles";
import type { SavedStory } from "shared";
import { useStories, useUpdateStory } from "react-query";
import { ReactNode, useState } from "react";
import { UpdateStoryForm } from "../UpdateStoryForm";
import { StoryLocaleForm } from "../StoryLocaleForm";
import { StoryLocales } from "../StoryLocales";
import { useNavigate, useParams } from "react-router";

type Props = {
  index: number;
};

function Story({ index }: Props) {
  const { data, isLoading } = useStories();
  const updateStoryMutation = useUpdateStory();
  const navigate = useNavigate();
  const { storyId } = useParams();

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showLocalesForm, setShowLocalesForm] = useState(false);

  if (isLoading) {
    return <div>Loading...!</div>;
  }

  if (!data) {
    return;
  }

  const handleNavigation = (storyId: string) => {
    if (!storyId) {
      return;
    }

    navigate(`/stories/chapters/${storyId}`);
  };

  const story: SavedStory = data[index];

  const handleArrowClick = (index: number, arrow: "up" | "down") => {
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

  return (
    <>
      {!showUpdateForm ? (
        <Container isSelected={storyId === story._id}>
          <StoryContent>
            <NavDiv onClick={() => handleNavigation(story._id)}>
              <LevelTier>
                <Level>{story.level as ReactNode}</Level>
                <Tier>{story.tier}</Tier>
              </LevelTier>
              <div>
                <Title>{story.title}</Title>
                {story.note}
              </div>
              <IdSeq>
                <div>
                  <strong>IsDeleted:</strong>{" "}
                  {story.isDeleted ? "true" : "false"}
                </div>
                <div>
                  <strong>IsPublished:</strong>{" "}
                  {story.isPublished ? "true" : "false"}
                </div>
                <div>
                  <strong>Id:</strong> {story._id}
                </div>
                <div>
                  <strong>Seq:</strong> {story.seq}
                </div>
              </IdSeq>
            </NavDiv>
            {!showLocalesForm && <StoryLocales storyId={story._id} />}
            {showLocalesForm ? (
              <StoryLocaleForm
                storyId={story._id}
                setShowLocalesForm={setShowLocalesForm}
              />
            ) : (
              <UtilityButtons>
                <IconButton
                  onClick={() => {
                    setShowLocalesForm(false);
                    setShowUpdateForm(true);
                  }}
                  sx={{
                    width: 20,
                    height: 20,
                    padding: 0,
                  }}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setShowUpdateForm(false);
                    setShowLocalesForm(true);
                  }}
                  sx={{
                    width: 20,
                    height: 20,
                    padding: 0,
                  }}
                >
                  <GTranslateOutlinedIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    updateStoryMutation.mutate({
                      id: data[index]._id,
                      story: {
                        ...data[index],
                        isPublished: !story.isPublished,
                      },
                    });
                  }}
                  sx={{
                    width: 20,
                    height: 20,
                    padding: 0,
                  }}
                >
                  <NewReleasesOutlinedIcon
                    color={story.isPublished ? "primary" : "action"}
                  />
                </IconButton>
                <IconButton
                  onClick={() => {
                    updateStoryMutation.mutate({
                      id: data[index]._id,
                      story: {
                        ...data[index],
                        isDeleted: true,
                      },
                    });
                  }}
                  sx={{
                    width: 20,
                    height: 20,
                    padding: 0,
                  }}
                >
                  <DeleteOutlineOutlinedIcon color="error" />
                </IconButton>
              </UtilityButtons>
            )}
          </StoryContent>
          {!showLocalesForm && (
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
          )}
        </Container>
      ) : (
        <UpdateStoryForm story={story} setShowForm={setShowUpdateForm} />
      )}
    </>
  );
}

export default Story;
