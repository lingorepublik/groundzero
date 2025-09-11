import React from "react";
import {
  Container,
  MenuBar,
  ArticleInfo,
  LanguageLevel,
  ArticleTitle,
  ArticleTitleTranslation,
  GrammerPoint,
  Sheet,
} from "./ArticleFooter.styles";
import TutorialIconButton from "mobile-atoms/src/components/svg-buttons/TutorialIconButton";
import TutorialVideoButton from "mobile-atoms/src/components/svg-buttons/TutorialVideoIconButton";
import TranslationIconButton from "mobile-atoms/src/components/svg-buttons/TranslationIconButton";
import { useInsight } from "react-query";

export default function ArticleFooter() {
  const { data } = useInsight(null);

  return (
    <Container>
      <MenuBar>
        <TranslationIconButton disabled={false} active={false} />
        <TutorialIconButton />
        <TutorialVideoButton disabled />
        {data && <Sheet>data: {data}</Sheet>}
      </MenuBar>
      <ArticleInfo>
        <LanguageLevel>A1</LanguageLevel>
        <ArticleTitle>nach Berlin</ArticleTitle>
        <ArticleTitleTranslation>to Berlin</ArticleTitleTranslation>
        <GrammerPoint>sein mit Perfect</GrammerPoint>
      </ArticleInfo>
    </Container>
  );
}
