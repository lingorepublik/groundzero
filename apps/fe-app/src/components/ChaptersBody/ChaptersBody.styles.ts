import styled from "@emotion/styled";

export const Container = styled.section`
  //flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  //overflow-y: auto;
  //background-color: coral;
`;

export const ArticleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: solid 1px #ddd;
  /* box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0); */
  /* margin-bottom: 20px; */
  /* box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 0.25); */
`;

export const ArticleTitleTexts = styled.div`
  flex: 1;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ArticleTitleNative = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

export const ArticleTitleTranslated = styled.div`
  font-size: 16px;
  color: #23d280;
  font-style: italic;
`;

export const ArticleTitleHeadphoneIcon = styled.div`
  width: 32px;
  height: 32px;
  /* background-color: blueviolet; */
`;

type ArticleSentenceProps = {
  alignRight: boolean;
};

export const ArticleSentence = styled.div<ArticleSentenceProps>`
  display: flex;
  gap: 10px;
  justify-content: ${({ alignRight }) =>
    alignRight ? "flex-end" : "flex-start"};
`;

export const ArticleTextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  gap: 20px;
  padding-top: 20px;
  overflow-y: auto;
  /* background-color: red; */
`;

export const Illustration = styled.img`
  width: 100%;
  height: auto;
  //border: solid 1px #eaeaea;
  //box-shadow: 0 2px 4px #d5d5d5;
`;
