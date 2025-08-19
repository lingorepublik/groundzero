import { useParams } from "react-router";
import { ArticlePage } from "~/pages";

export default function ArticleRoute() {
  const { title, page } = useParams<{ title: string; page: string }>();

  return <ArticlePage title={title} page={page} />;
}
