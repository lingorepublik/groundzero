import { Stories } from "../Stories";
import { Container, Footer, Header, Main, WorkBench } from "./App.styles";
function App() {
  return (
    <Container>
      <Header>header</Header>
      <Main>
        <Stories />
        <WorkBench />
      </Main>
      <Footer>footer</Footer>
    </Container>
  );
}

export default App;
