import { Container, Progress } from "./CatalogEntryProgressCircle.styles";

type Props = {
  progress?: number;
};

export default function CatalogEntryProgressCircle({ progress = 0 }: Props) {
  console.log(1 - Math.floor(progress * 10) / 10);

  const progressInverted = 1 - Math.floor(progress * 10) / 10;

  return (
    <Container>
      <Progress progress={progressInverted} />
    </Container>
  );
}
