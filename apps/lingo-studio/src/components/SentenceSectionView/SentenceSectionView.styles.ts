import styled from "@emotion/styled";

export const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SentenceSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ViewAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ViewArea = styled.div`
  border-top: solid 1px #ccc;
  border-bottom: solid 1px #ccc;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const SentencePreview = styled.div`
  color: #008984;
  display: flex;
  flex-wrap: wrap;
  font-style: italic;
`;

type WordPreviewProps = {
  marginLeft?: boolean;
};

export const WordPreview = styled.span<WordPreviewProps>`
  margin-left: ${(props) => (props.marginLeft ? "5px" : "0")};
`;
