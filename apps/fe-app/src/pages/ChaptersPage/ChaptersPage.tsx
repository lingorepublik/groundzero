import { Container, ChapterBodyWrapper } from "./ChaptersPage.styles.ts";
import { ChaptersFooter, ChaptersHeader } from "../../components";
import { Outlet } from "react-router";

export default function ChaptersPage() {
  return (
    <Container>
      <ChaptersHeader />
      <ChapterBodyWrapper>
        <Outlet />
      </ChapterBodyWrapper>
      <ChaptersFooter />
    </Container>
  );
}
