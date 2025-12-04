import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: bisque;
  width: 400px;
  max-width: 400px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CreateNewArticle = styled.button`
  all: unset;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: cadetblue;
  color: white;
  font-size: 18px;
`;

export const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Article = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonWrapper = styled.div``;

export const CatalogView = styled.button`
  all: unset;
  width: 70px;
  background-color: purple;
  text-align: center;
`;
export const ArticleView = styled.button`
  all: unset;
  width: 70px;
  background-color: greenyellow;
  text-align: center;
`;
