import { StoryEntryProgress, TrophyIcon } from "mobile-atoms";
import {
  Container,
  Title,
  Extra,
  TitleTexts,
  TitleTranslation,
  ProgressArea,
  Trophy,
} from "./StoryEntry.styles";
import type { StoryUI } from "shared";

type Props = {} & StoryUI;

export default function StoryEntry({
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
        <StoryEntryProgress progressList={progressList} />
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
