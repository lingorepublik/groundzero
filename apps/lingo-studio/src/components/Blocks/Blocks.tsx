import { Container } from "./Blocks.styles";
import { useParams } from "react-router";

function Blocks() {
  const { chapterId } = useParams();
  return <Container>Blocks {chapterId}</Container>;
}

export default Blocks;
