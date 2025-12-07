import { ObjectId } from "mongoose";
import { useFetchStoryLocales } from "react-query";
import { Container } from "./StoryLocales.styles";

type Props = {
  storyId: ObjectId;
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
        <>
          <div>
            Title: {data.lang}: {data.titleTranslation}
          </div>
        </>
      ))}
    </Container>
  );
}

export default StoryLocales;
