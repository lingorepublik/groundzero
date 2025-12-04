import { useCatalog } from "react-query";
import {
  Article,
  ArticleView,
  ArticleWrapper,
  ButtonWrapper,
  CatalogView,
  Container,
  CreateNewArticle,
} from "./CatalogSideBar.styles";

function CatalogSideBar() {
  const { data } = useCatalog();

  return (
    <Container>
      <CreateNewArticle>New Article</CreateNewArticle>
      {data.length > 0 && (
        <ArticleWrapper>
          {data.map((article) => (
            <Article>
              {article.title}
              <ButtonWrapper>
                <CatalogView>Catalog</CatalogView>
                <ArticleView>Article</ArticleView>
              </ButtonWrapper>
            </Article>
          ))}
        </ArticleWrapper>
      )}
    </Container>
  );
}

export default CatalogSideBar;
