import { useState } from "react";
import { Container, VerticalSeparator, Button } from "./NewStoryButton.styles";
import { NewStoryForm } from "../NewStoryForm";

type Props = {
  seq: number;
  topSeparator?: boolean;
  bottomSeparator?: boolean;
};

function NewStoryButton({
  seq,
  topSeparator = true,
  bottomSeparator = true,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <Container>
      {topSeparator && <VerticalSeparator />}
      {!showForm && <Button onClick={handleClick}>+</Button>}
      {showForm && <NewStoryForm seq={seq} setShowForm={setShowForm} />}
      {bottomSeparator && <VerticalSeparator />}
    </Container>
  );
}

export default NewStoryButton;
