import { useFetchChapters } from "react-query";
import { ChaptersWrapper, Container } from "./Chapters.styles";
import { useParams } from "react-router";
import { NewChapterButton } from "../NewChapterButton";
import Chapter from "../Chapter/Chapter";
import { useState } from "react";

function Chapters() {
  const [selectedId, setSelectedId] = useState("");
  const { storyId } = useParams();
  const { data: chapters, isLoading } = useFetchChapters(storyId);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <div>CHAPTERS</div>
      {chapters && chapters.length > 0 ? (
        <ChaptersWrapper>
          {chapters?.map((chapter, index) => (
            <div key={index}>
              {index === 0 && (
                <NewChapterButton
                  storyId={storyId}
                  seq={chapter.seq / 2}
                  topSeparator={false}
                />
              )}
              <Chapter
                index={index}
                storyId={storyId}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
              <NewChapterButton
                storyId={storyId}
                seq={
                  ((chapters[index + 1]?.seq || chapter.seq + 1) +
                    chapter.seq) /
                  2
                }
                bottomSeparator={index < chapters.length - 1}
              />
            </div>
          ))}
        </ChaptersWrapper>
      ) : (
        <NewChapterButton
          storyId={storyId}
          seq={1}
          topSeparator={false}
          bottomSeparator={false}
        />
      )}
    </Container>
  );
}

export default Chapters;
