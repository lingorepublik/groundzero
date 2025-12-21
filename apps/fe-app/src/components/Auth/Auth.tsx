import { Body, Container, Footer, Header } from "./Auth.styles.ts";
import { Outlet } from "react-router";

function Auth() {
  return (
    <Container>
      <Header>header</Header>
      <Body>
        <Outlet />
      </Body>
      <Footer>footer</Footer>
    </Container>
  );
}

export default Auth;
