import React from "react";
import { Container } from "./ArticlePage.styles";
import { ArticleBody, ArticleFooter, ArticleHeader } from "~/Components";

type Props = {
  title: string;
  page: string;
};

export default function ArticlePage({ title, page }: Props) {
  return (
    <Container>
      <ArticleHeader />
      <ArticleBody />
      <ArticleFooter />
    </Container>
  );
}
