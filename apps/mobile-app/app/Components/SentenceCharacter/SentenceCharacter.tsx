import {
  SpeechIndicator,
  Avatar,
  Container,
  Name,
  ThoughtIndicator,
  ThoughtIndicator2,
} from "./SentenceCharacter.styles";
import type {
  SentenceBaloonDirection,
  SentenceBaloonType,
} from "./SentenceCharacter.types";

type Props = {
  name: string;
  direction?: SentenceBaloonDirection;
  type?: SentenceBaloonType;
};

export default function ArticleCharacter({
  name,
  direction = "left",
  type = "speech",
}: Props) {
  return (
    <Container direction={direction}>
      <Avatar name={name.toLowerCase()}>
        {type === "speech" && <SpeechIndicator direction={direction} />}
        {type === "thought" && (
          <>
            <ThoughtIndicator direction={direction} />
            <ThoughtIndicator2  direction={direction} />
          </>
        )}
      </Avatar>
      {name && <Name>{name}</Name>}
    </Container>
  );
}
