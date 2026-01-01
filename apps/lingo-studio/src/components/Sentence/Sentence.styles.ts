import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BalloonType } from "shared";

export const Container = styled.div`
  display: flex;
`;

export const SentenceParagraph = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  font-size: 18px;
`;

type SentenceSectionProps = {
  zeroMarginLeft?: boolean;
};

export const SentenceSection = styled.span<SentenceSectionProps>`
  margin-left: ${(props) => (props.zeroMarginLeft ? "0" : "4px")};
`;

type CharacterContainerProps = {
  renderedDirection: "left" | "right";
};

export const CharacterContainer = styled.div<CharacterContainerProps>`
  width: 80px;
  height: 80px;
  min-width: 80px;
  min-height: 80px;
  position: relative;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.renderedDirection === "left"
      ? css`
          margin-right: 15px;
          margin-left: 0;
          border-right: solid 1px #666;
        `
      : css`
          margin-left: 15px;
          margin-right: 0;
          border-left: solid 1px #666;
        `}
`;

export const CharacterAvatar = styled.img`
  width: 76px;
  height: 76px;
  z-index: 0;
`;

type CharacterExpressionProps = {
  renderedDirection: "left" | "right";
  ballonType?: BalloonType;
};

export const CharacterExpression = styled.div<CharacterExpressionProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  top: 10px;
  ${(props) =>
    props.renderedDirection === "left"
      ? css`
          right: -6px;
          transform: rotate(45deg);
        `
      : css`
          left: -6px;
          transform: rotate(225deg);
        `};
  ${(props) =>
    props.ballonType === "TALK"
      ? css`
          border-top: solid 1px #666;
          border-right: solid 1px #666;
        `
      : css`
          border-radius: 50%;
          border: solid 1px #666;
        `}
`;

export const SentenceWhole = styled.div`
  color: forestgreen;
  font-size: 14px;
`;

export const SentencesWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
