import { useState } from "react";
import {
  Container,
  VerticalSeparator,
  Button,
} from "./NewBlockButton.styles.ts";
import { NewBlockForm } from "../NewBlockForm";

type Props = {
  seq: number;
  chapterId?: string;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
};

function NewBlockButton({
  chapterId,
  seq,
  topSeparator = true,
  bottomSeparator = true,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  if (!chapterId) {
    return;
  }

  return (
    <Container>
      {topSeparator && <VerticalSeparator />}
      {!showForm && <Button onClick={() => setShowForm(true)}>+</Button>}
      {showForm && (
        <NewBlockForm
          chapterId={chapterId}
          seq={seq}
          setShowForm={setShowForm}
        />
      )}
      {bottomSeparator && <VerticalSeparator />}
    </Container>
  );
}

export default NewBlockButton;
