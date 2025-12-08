import { IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";

import {
  Container,
  StoryContent,
  UtilityButtons,
  RightColumn,
  StyledNavLink,
} from "./Story.styles";
import type { SavedStory } from "shared";
import { useStories, useUpdateStory } from "react-query";
import { useState } from "react";
import { UpdateStoryForm } from "../UpdateStoryForm";
import { StoryLocaleForm } from "../StoryLocaleForm";
import { StoryLocales } from "../StoryLocales";

type Props = {
  index: number;
};

function Story({ index }: Props) {
  const { data, isLoading } = useStories();
  const updateStoryMutation = useUpdateStory();

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showLocalesForm, setShowLocalesForm] = useState(false);

  if (isLoading) {
    return <Container>Loading...!</Container>;
  }

  if (!data) {
    return;
  }

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
        <Container>
          <StoryContent>
            <StyledNavLink
              to={`/studio/chapters/${story._id}`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "aquamarine" : "white",
              })}
            >
              <div>id: {story._id}</div>
              <div>seq: {story.seq}</div>
              <div>title: {story.title}</div>
              <div>note: {story.note}</div>
              <div>Level: {story.level}</div>
              <div>Tier: {story.tier}</div>
              <div>isDeleted: {story.isDeleted ? "true" : "false"}</div>
              <div>isPublished: {story.isPublished ? "true" : "false"}</div>
            </StyledNavLink>
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
                  onClick={() => undefined}
                  sx={{
                    width: 20,
                    height: 20,
                    padding: 0,
                  }}
                >
                  <AutoAwesomeMotionOutlinedIcon />
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
