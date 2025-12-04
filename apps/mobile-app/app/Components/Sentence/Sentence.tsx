import React, { useEffect, useRef, useState } from "react";
import {
  ArticleText,
  Container,
  TextNative,
  TextTranslated,
  Word,
} from "./Sentence.styles";
import { SentenseCharacter } from "../SentenceCharacter";
import { type SentenceUnit } from "./Sentence.types";
import { useInsight } from "react-query";

type Props = {
  sentenceUnit: SentenceUnit;
};

export default function Sentence({ sentenceUnit }: Props) {
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

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartTimeRef = useRef<number | null>(null);

  const startPress = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.preventDefault();
    pressStartTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      setSelectedWordIndex(null);
      setIsSentenceSelected(true);
      setInsight([
        sentenceUnit.translation || null,
        sentenceUnit.insight || null,
      ]);
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
          if (refIndex) {
            setSelectedWordIndex(refIndex);
            setInsight([
              sentenceUnit.sentence[refIndex].translation || null,
              sentenceUnit.sentence[refIndex].insight || null,
            ]);
          } else {
            setSelectedWordIndex(index);
            setInsight([
              sentenceUnit.sentence[index].translation || null,
              sentenceUnit.sentence[index].insight || null,
            ]);
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
    <Container alignRight={sentenceUnit.sentenceBaloonDirection === "right"}>
      {sentenceUnit.character &&
        sentenceUnit.sentenceBaloonDirection === "left" && (
          <SentenseCharacter
            name={sentenceUnit.character}
            type={sentenceUnit.sentenceBaloonType}
          />
        )}
      <ArticleText
        alignRight={sentenceUnit.sentenceBaloonDirection === "right"}
      >
        <TextNative
          alignRight={sentenceUnit.sentenceBaloonDirection === "right"}
        >
          {sentenceUnit.sentence.map((word, index) => (
            <Word
              key={index}
              isRightMargin={
                sentenceUnit.sentence[index + 1] &&
                !sentenceUnit.sentence[index + 1]?.punctuationMark
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
        {sentenceUnit.translation && (
          <TextTranslated>{sentenceUnit.translation}</TextTranslated>
        )}
      </ArticleText>
      {sentenceUnit.character &&
        sentenceUnit.sentenceBaloonDirection === "right" && (
          <SentenseCharacter
            name={sentenceUnit.character}
            direction="right"
            type={sentenceUnit.sentenceBaloonType}
          />
        )}
    </Container>
  );
}
