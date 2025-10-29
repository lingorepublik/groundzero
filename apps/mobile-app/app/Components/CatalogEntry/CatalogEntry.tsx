import { CatalogEntryProgress, TrophyIcon } from "mobile-atoms";
import {
  Container,
  Title,
  Extra,
  TitleTexts,
  TitleTranslation,
  ProgressArea,
  Trophy,
} from "./CatalogEntry.styles";

type Props = {
  progressList: Array<number>;
  trophyProgress: number;
  starredTrophyProgress: number;
  title: string;
  titleTranslation?: string;
  extraText?: string;
};

export default function CatalogEntry({
  progressList,
  trophyProgress,
  starredTrophyProgress,
  title,
  titleTranslation,
  extraText,
}: Props) {
  return (
    <Container>
      <ProgressArea>
        <CatalogEntryProgress progressList={progressList} />
        <Trophy>
          <TrophyIcon progress={trophyProgress} type="gold" />
        </Trophy>
        <Trophy>
          <TrophyIcon progress={starredTrophyProgress} type="gold" isStarred />
        </Trophy>
      </ProgressArea>
      <TitleTexts>
        <Title>{title}</Title>
        {titleTranslation && (
          <TitleTranslation>{titleTranslation}</TitleTranslation>
        )}
      </TitleTexts>
      {extraText && <Extra>{extraText}</Extra>}
    </Container>
  );
}
