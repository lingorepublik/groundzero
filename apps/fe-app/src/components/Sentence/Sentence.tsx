import React, { useEffect, useRef, useState } from "react";
import {
  ArticleText,
  Container,
  TextNative,
  TextTranslated,
  Word,
} from "./Sentence.styles";
import { SentenseCharacter } from "../SentenceCharacter";
import { useInsight } from "react-query";
import type { FetchedBlock, Sentence } from "shared";

type Props = {
  block: FetchedBlock;
};

export default function Sentence({ block }: Props) {
  const blockContent: Sentence = block.content as Sentence;

  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(
    null,
  );
  const [isSentenceSelected, setIsSentenceSelected] = useState(false);

  const { setInsight } = useInsight();

  const wordRefs = useRef<Array<HTMLSpanElement>>([]);

  const setWordRef = (element: HTMLSpanElement | null) => {
    if (element && !wordRefs.current.includes(element)) {
      wordRefs.current.push(element);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: PointerEvent) => {
      if (
        wordRefs.current.length > 0 &&
        !wordRefs.current.some((ref) => ref?.contains(e.target as Node))
      ) {
        setIsSentenceSelected(false);
        setSelectedWordIndex(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [setInsight, isSentenceSelected]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartTimeRef = useRef<number | null>(null);

  const startPress = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.preventDefault();
    pressStartTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      setSelectedWordIndex(null);
      setIsSentenceSelected(true);
      setInsight([block.translation || null, block.insight || null]);
    }, 500);
  };

  const endPress = (index: number, refIndex?: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      if (!isSentenceSelected) {
        console.log("sentence not selected");
        if (selectedWordIndex === index || selectedWordIndex === refIndex) {
          setSelectedWordIndex(null);
          setInsight([]);
        } else {
          // TODO: word translation and insight will come from a different api end point... not included in blockContent
          if (refIndex) {
            setSelectedWordIndex(refIndex);
            // setInsight([
            //   blockContent[refIndex].translation || null,
            //   blockContent[refIndex].insight || null,
            // ]);
          } else {
            setSelectedWordIndex(index);
            // setInsight([
            //   blockContent[index].translation || null,
            //   blockContent[index].insight || null,
            // ]);
          }
        }
      } else if (pressStartTimeRef.current) {
        const duration = Date.now() - pressStartTimeRef.current;
        if (duration < 500) {
          setIsSentenceSelected(false);
          setInsight([]);
        }
      }
    }

    pressStartTimeRef.current = null;
  };

  return (
    <Container alignRight={block.balloonDirection === "RIGHT"}>
      {block.character && block.balloonDirection === "LEFT" && (
        <SentenseCharacter name={block.character} type={block.balloonType} />
      )}
      <ArticleText alignRight={block.balloonDirection === "RIGHT"}>
        <TextNative alignRight={block.balloonDirection === "RIGHT"}>
          {blockContent.map((word, index) => (
            <Word
              key={index}
              isRightMargin={
                blockContent[index + 1] &&
                !blockContent[index + 1]?.punctuationMark
              }
              ref={setWordRef}
              onContextMenu={(e) => e.preventDefault()}
              onPointerDown={(e) => startPress(e)}
              onPointerUp={() => endPress(index, word.refIndex)}
              onPointerCancel={() => endPress(index, word.refIndex)}
              onPointerLeave={() => endPress(index, word.refIndex)}
              selected={
                isSentenceSelected ||
                index === selectedWordIndex ||
                word.refIndex === selectedWordIndex
              }
            >
              {word.word}
            </Word>
          ))}
        </TextNative>
        {block.translation && (
          <TextTranslated>{block.translation}</TextTranslated>
        )}
      </ArticleText>
      {block.character && block.balloonDirection === "RIGHT" && (
        <SentenseCharacter
          name={block.character}
          direction="RIGHT"
          type={block.balloonType}
        />
      )}
    </Container>
  );
}
