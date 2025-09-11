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

type Props = {
  sentenceUnit: SentenceUnit;
};

export default function Sentence({ sentenceUnit }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSentenceSelected, setIsSentenceSelected] = useState(false);

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
        setSelectedIndex(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pressStartTimeRef = useRef<number | null>(null);

  const startPress = (e: React.PointerEvent<HTMLSpanElement>) => {
    e.preventDefault();
    pressStartTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      setSelectedIndex(null);
      setIsSentenceSelected(true);
    }, 500);
  };

  const endPress = (index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      if (!isSentenceSelected) {
        console.log("sentence not selected");
        if (selectedIndex === index) {
          setSelectedIndex(null);
        } else {
          setSelectedIndex(index);
        }
      } else if (pressStartTimeRef.current) {
        const duration = Date.now() - pressStartTimeRef.current;
        console.log(duration);
        if (duration < 500) {
          setIsSentenceSelected(false);
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
              onPointerUp={() => endPress(index)}
              onPointerCancel={() => endPress(index)}
              onPointerLeave={() => endPress(index)}
              selected={isSentenceSelected || index === selectedIndex}
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
