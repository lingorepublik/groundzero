import {
  SpeechIndicator,
  Avatar,
  Container,
  Name,
  ThoughtIndicator,
  ThoughtIndicator2,
} from "./SentenceCharacter.styles";
import type { BalloonDirection, BalloonType } from "shared";

type Props = {
  name: string;
  direction?: BalloonDirection;
  type?: BalloonType;
};

export default function ArticleCharacter({
  name,
  direction = "LEFT",
  type = "TALK",
}: Props) {
  return (
    <Container direction={direction}>
      <Avatar name={name.toLowerCase()}>
        {type === "TALK" && <SpeechIndicator direction={direction} />}
        {type === "THINK" && (
          <>
            <ThoughtIndicator direction={direction} />
            <ThoughtIndicator2 direction={direction} />
          </>
        )}
      </Avatar>
      {name && <Name>{name}</Name>}
    </Container>
  );
}
