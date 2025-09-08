import React, { useEffect, useRef, useState } from "react";
import {
  ArticleText,
  Container,
  TextNative,
  TextTranslated,
  Word,
} from "./Sentence.styles";
import { SentenseCharacter } from "../SentenceCharacter";
import { type Sentence } from "./Sentence.types";

type Props = {
  sentence: Sentence;
};

export default function Sentence({ sentence }: Props) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
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
        setSelectedWord(null);
        setSelectedIndex(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startPress = (
    e: React.PointerEvent<HTMLSpanElement>,
    word: string | null,
    index: number | null
  ) => {
    e.preventDefault();
    setIsSentenceSelected(false);
    if (selectedIndex === index) {
      setSelectedWord(null);
      setSelectedIndex(null);
    } else {
      setSelectedWord(word);
      setSelectedIndex(index);
    }

    timerRef.current = setTimeout(() => {
      setSelectedWord(null);
      setSelectedIndex(null);
      setIsSentenceSelected(true);
    }, 300);
  };

  const endPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <Container alignRight={sentence.sentenceBaloonDirection === "right"}>
      {sentence.character && sentence.sentenceBaloonDirection === "left" && (
        <SentenseCharacter
          name={sentence.character}
          type={sentence.sentenceBaloonType}
        />
      )}
      <ArticleText alignRight={sentence.sentenceBaloonDirection === "right"}>
        <TextNative
          alignRight={sentence.sentenceBaloonDirection === "right"}
          // onClick={handleSentenceSelect}
        >
          {sentence.native
            .trim()
            .split(" ")
            .map((word: string, index: number) => (
              <Word
                key={index}
                selected={isSentenceSelected || index === selectedIndex}
                onPointerDown={(e) => startPress(e, word, index)}
                onPointerUp={endPress}
                onPointerCancel={endPress}
                onPointerLeave={endPress}
                onContextMenu={(e) => e.preventDefault()}
                ref={setWordRef}
              >
                {word}
              </Word>
            ))}
        </TextNative>
        {sentence.translated && (
          <TextTranslated>{sentence.translated}</TextTranslated>
        )}
      </ArticleText>
      {sentence.character && sentence.sentenceBaloonDirection === "right" && (
        <SentenseCharacter
          name={sentence.character}
          direction="right"
          type={sentence.sentenceBaloonType}
        />
      )}
    </Container>
  );
}
