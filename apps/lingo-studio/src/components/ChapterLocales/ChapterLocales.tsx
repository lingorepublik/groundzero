import { useFetchChapterLocales } from "react-query";
import { Container } from "./ChapterLocales.styles";

type Props = {
  chapterId: string;
};

function ChapterLocales({ chapterId }: Props) {
  const { data, isLoading } = useFetchChapterLocales(chapterId);

  if (isLoading) {
    return <div>...</div>;
  }

  if (!data) {
    return;
  }

  return (
    <Container>
      {data.map((data) => (
        <p>
          <strong>{data.lang}</strong>: {data.titleTranslation}
        </p>
      ))}
    </Container>
  );
}

export default ChapterLocales;
