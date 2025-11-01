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
import type { Catalog } from "shared";

type Props = {} & Catalog;

export default function CatalogEntry({
  link,
  progressList,
  trophyProgress,
  starredTrophyProgress,
  title,
  titleTranslation,
  note,
}: Props) {
  return (
    <Container to={link}>
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
      {note && <Extra>{note}</Extra>}
    </Container>
  );
}
