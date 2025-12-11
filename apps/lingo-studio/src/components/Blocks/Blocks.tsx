import { Container } from "./Blocks.styles";
import { useParams } from "react-router";
import { useFetchBlocks } from "react-query";
import { Block } from "shared";
import Sentence from "../Sentence/Sentence.tsx";
import { NewBlockButton } from "../NewBlockButton";

function Blocks() {
  const { chapterId } = useParams();
  const { data: blocks, isLoading } = useFetchBlocks(chapterId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blocks) {
    return null;
  }

  return (
    <Container>
      {blocks && blocks.length > 0 ? (
        <>
          {blocks?.map((block: Block, index: number) => (
            <>
              <div>{block.seq}</div>
              {index === 0 && (
                <NewBlockButton
                  seq={block.seq / 2}
                  chapterId={chapterId}
                  topSeparator={false}
                />
              )}
              {block.contentType === "SENTENCE" ? (
                <Sentence block={block} />
              ) : (
                <div>ILLUSTRATION</div>
              )}
              <NewBlockButton
                seq={
                  (block.seq + (blocks[index + 1]?.seq || block.seq + 1)) / 2
                }
                chapterId={chapterId}
                bottomSeparator={index < blocks.length - 1}
              />
            </>
          ))}
        </>
      ) : (
        <NewBlockButton
          seq={1}
          chapterId={chapterId}
          topSeparator={false}
          bottomSeparator={false}
        />
      )}
    </Container>
  );
}

export default Blocks;
