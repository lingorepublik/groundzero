import { Outlet, Route, Routes } from "react-router";
import { Stories } from "../Stories";
import { Container, Footer, Header, Main } from "./App.styles";
import { Chapters } from "../Chapters";
function App() {
  return (
    <Container>
      <Header>header</Header>
      <Main>
        <Routes>
          <Route
            path="studio"
            element={
              <>
                <Stories />
                <Outlet />
              </>
            }
          >
            <Route path="chapters/:storyId" element={<Chapters />} />
          </Route>
        </Routes>
      </Main>
      <Footer>footer</Footer>
    </Container>
  );
}

export default App;
