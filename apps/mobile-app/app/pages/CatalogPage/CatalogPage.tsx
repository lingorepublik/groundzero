import { CatalogEntry } from "~/Components";
import { Container } from "./CatalogPage.styles";

export default function CatalogPage() {
  return (
    <Container>
      <CatalogEntry
        progressList={[0.2, 0.5, 1, 1, 0]}
        trophyProgress={0.7}
        starredTrophyProgress={0}
        title="nach Berlin"
        titleTranslation="to Berlin"
        extraText="perfect mit Sein"
      />
      <CatalogEntry
        progressList={[0.2, 0.5, 1, 1, 0]}
        trophyProgress={0.7}
        starredTrophyProgress={.8}
        title="nach Berlin"
        titleTranslation="to Berlin"
        extraText="perfect mit Sein"
      />
    </Container>
  );
}

// progressList,
//   trophyProgress,
//   starredTrophyProgress,
//   title,
//   titleTranslation,
//   extraText,
