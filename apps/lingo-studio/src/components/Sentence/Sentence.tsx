import { Block, Sentence as SentenceType } from "shared";
import {
  CharacterContainer,
  CharacterExpression,
  Container,
  SentenceParagraph,
  SentenceSection,
  SentencesWrapper,
  SentenceWhole,
} from "./Sentence.styles.ts";

type Props = {
  block: Block;
};

function Sentence({ block }: Props) {
  const sentence = block.content as SentenceType;
  const { character, balloonDirection, balloonType } = block;

  return (
    <Container>
      {character && balloonDirection === "LEFT" && (
        <CharacterContainer renderedDirection="left">
          {character}
          <CharacterExpression
            renderedDirection="left"
            ballonType={balloonType}
          />
        </CharacterContainer>
      )}
      <SentencesWrapper>
        <SentenceWhole>{block.contentString}</SentenceWhole>
        {sentence && (
          <SentenceParagraph>
            {sentence.map((sentenceSection, index) => (
              <SentenceSection
                zeroMarginLeft={index === 0 || sentenceSection.punctuationMark}
              >
                {sentenceSection.word}
              </SentenceSection>
            ))}
          </SentenceParagraph>
        )}
      </SentencesWrapper>
      {character && balloonDirection === "RIGHT" && (
        <CharacterContainer renderedDirection="right">
          {character}
          <CharacterExpression
            renderedDirection="right"
            ballonType={balloonType}
          />
        </CharacterContainer>
      )}
    </Container>
  );
}

export default Sentence;
