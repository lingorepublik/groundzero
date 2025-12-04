import { CatalogSideBar } from "../CatalogSideBar";
import { Container, Footer, Header, Main, WorkBench } from "./App.styles";
function App() {
  return (
    <Container>
      <Header>Header</Header>
      <Main>
        <CatalogSideBar />
        <WorkBench />
      </Main>
      <Footer>Footer</Footer>
    </Container>
  );
}

export default App;
