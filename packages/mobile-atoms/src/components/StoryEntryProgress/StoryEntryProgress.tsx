import { StoryEntryProgressCircle } from "../StoryEntryProgressCircle";
import { Container, Separator } from "./StoryEntryProgress.styles.ts";

type Props = {
  progressList: Array<number>;
};

export default function StoryEntryProgress({ progressList }: Props) {
  if (progressList.length === 0) {
    return null;
  }

  return (
    <Container>
      <Separator />
      {progressList.map((progress) => (
        <>
          <StoryEntryProgressCircle progress={progress} />
          <Separator />
        </>
      ))}
    </Container>
  );
}
