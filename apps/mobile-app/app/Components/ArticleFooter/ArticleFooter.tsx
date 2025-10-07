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
import Insight from "../Insight/Insight";

export default function ArticleFooter() {
  const { insight } = useInsight();

  return (
    <Container>
      <MenuBar>
        <TranslationIconButton disabled={false} active={false} />
        <TutorialIconButton />
        <TutorialVideoButton disabled />
        {insight?.length && insight.length > 0 && (
          <Sheet>
            <Insight translation={insight[0]} insight={insight[1]}></Insight>
          </Sheet>
        )}
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
