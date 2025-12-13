import { useFetchStoryLocales } from "react-query";
import { Container } from "./StoryLocales.styles";

type Props = {
  storyId: string;
};

function StoryLocales({ storyId }: Props) {
  const { data, isLoading } = useFetchStoryLocales(storyId);

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
          <strong>{data.lang}:</strong> {data.titleTranslation}
        </p>
      ))}
    </Container>
  );
}

export default StoryLocales;
