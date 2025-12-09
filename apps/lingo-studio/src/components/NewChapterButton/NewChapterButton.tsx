import { useState } from "react";
import {
  Container,
  VerticalSeparator,
  Button,
} from "./NewChapterButton.styles";
import { NewChapterForm } from "../NewChapterForm";

type Props = {
  seq: number;
  storyId?: string;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
};

function NewChapterButton({
  storyId,
  seq,
  topSeparator = true,
  bottomSeparator = true,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  if (!storyId) {
    return;
  }

  return (
    <Container>
      {topSeparator && <VerticalSeparator />}
      {!showForm && <Button onClick={() => setShowForm(true)}>+</Button>}
      {showForm && (
        <NewChapterForm storyId={storyId} seq={seq} setShowForm={setShowForm} />
      )}
      {bottomSeparator && <VerticalSeparator />}
    </Container>
  );
}

export default NewChapterButton;
