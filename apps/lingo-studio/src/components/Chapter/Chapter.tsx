import { useFetchChapters, useUpdateChapter } from "react-query";
import {
  ChapterContent,
  Container,
  RightColumn,
  UtilityButtons,
} from "./Chapter.styles";
import { IconButton } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import { useState } from "react";
import { UpdateChapterForm } from "../UpdateChapterForm";
import { ChapterLocaleForm } from "../ChapterLocaleForm";
import { ChapterLocales } from "../ChapterLocales";
import {NavLink} from "react-router";

type Props = {
  index: number;
  storyId?: string;
};

function Chapter({ index, storyId }: Props) {
  const { data } = useFetchChapters(storyId);
  const updateChapterMutation = useUpdateChapter(storyId);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showLocalesForm, setShowLocalesForm] = useState(false);

  if (!data) {
    return;
  }

  const chapter = data[index];

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

    updateChapterMutation?.mutate({
      id: chapter._id,
      chapter: { ...chapter, seq: newSeq },
    });
  };

  return (
    <>
      {!showUpdateForm ? (
        <Container>
          <ChapterContent>
            <NavLink
              to={`/studio/chapters/${chapter.storyId}/blocks/${chapter._id}`}
            >
              <div>id: {chapter._id}</div>
              <div>seq: {chapter.seq}</div>
              <div>tier: {chapter.tier}</div>
              <div>title: {chapter.title}</div>
              <div>isDeleted: {chapter.isDeleted ? "true" : "false"}</div>
              <div>isPublished: {chapter.isPublished ? "true" : "false"}</div>
            </NavLink>
            {!showLocalesForm && <ChapterLocales chapterId={chapter._id} />}
            {showLocalesForm ? (
              <ChapterLocaleForm
                chapterId={chapter._id}
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
              </UtilityButtons>
            )}
          </ChapterContent>
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
        </Container>
      ) : (
        <UpdateChapterForm chapter={chapter} setShowForm={setShowUpdateForm} />
      )}
    </>
  );
}

export default Chapter;
