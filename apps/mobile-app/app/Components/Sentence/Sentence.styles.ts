import styled from "@emotion/styled";

type ContainerProps = {
  alignRight: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  gap: 10px;
  justify-content: ${({ alignRight }) =>
    alignRight ? "flex-end" : "flex-start"};
`;

export const TextTranslated = styled.div`
  font-size: 16px;
  color: #23d280;
  font-style: italic;
`;

type ArticleTextProps = {
  alignRight: boolean;
};

export const ArticleText = styled.div<ArticleTextProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: ${(props) => (props.alignRight ? "right" : "left")};
`;

type TextNativeProps = {
  alignRight: boolean;
};

export const TextNative = styled.div<TextNativeProps>`
  font-size: 20px;
  display: flex;
  gap: 4px;
  flex-wrap: wrap;

  ${({ alignRight }) =>
    alignRight && "justify-content: flex-end"}/* user-select: text; */
  /* background-color: red; */
`;

type WordProps = {
  selected?: boolean;
};

export const Word = styled.span<WordProps>`
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  ${({ selected }) => selected && "background-color: yellow"}
`;
