import {
  SpeechIndicator,
  Avatar,
  Container,
  Name,
  ThoughtIndicator,
  ThoughtIndicator2,
} from "./SentenceCharacter.styles";
import type { AvatarExpression, BalloonDirection, BalloonType } from "shared";

type Props = {
  name: string;
  expression?: AvatarExpression;
  direction?: BalloonDirection;
  type?: BalloonType;
};

export default function SentenceCharacter({
  name,
  expression = "NEUTRAL",
  direction = "LEFT",
  type = "TALK",
}: Props) {
  return (
    <Container direction={direction}>
      <Avatar name={name.toLowerCase()} expression={expression}>
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
