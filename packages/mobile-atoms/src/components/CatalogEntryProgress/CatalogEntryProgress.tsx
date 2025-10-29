import { CatalogEntryProgressCircle } from "../CatalogEntryProgressCircle";
import { Container, Separator } from "./CatalogEntryProgress.styles";

type Props = {
  progressList: Array<number>;
};

export default function CatalogEntryProgress({ progressList }: Props) {
  if (progressList.length === 0) {
    return null;
  }

  return (
    <Container>
      <Separator />
      {progressList.map((progress) => (
        <>
          <CatalogEntryProgressCircle progress={progress} />
          <Separator />
        </>
      ))}
    </Container>
  );
}
