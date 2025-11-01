import { CatalogEntry } from "~/Components";
import { Container } from "./CatalogPage.styles";
import { useCatalog } from "react-query";

export default function CatalogPage() {
  const { data: catalog, isLoading } = useCatalog();

  if (isLoading) {
    return;
  }

  return (
    <Container>
      {catalog?.map((catalogEntry) => (
        <CatalogEntry
          link={catalogEntry.link}
          progressList={catalogEntry.progressList}
          trophyProgress={catalogEntry.trophyProgress}
          starredTrophyProgress={catalogEntry.starredTrophyProgress}
          title={catalogEntry.title}
          titleTranslation={catalogEntry.titleTranslation}
          note={catalogEntry.note}
        />
      ))}
    </Container>
  );
}
