import { useFetchBlockLocales } from "react-query";
import { Container, Translation } from "./BlockLocales.styles.ts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  blockId: string;
};

function BlockLocales({ blockId }: Props) {
  const { data } = useFetchBlockLocales(blockId);

  if (!data) {
    return null;
  }

  return (
    <Container>
      {data.map((locale) => (
        <div key={locale._id}>
          <div>
            <strong>{locale.lang}</strong>
          </div>
          <Translation>{locale.sentenceTranslation}</Translation>
          {locale.insight && (
            <div>
              insight:
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {locale.insight}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </Container>
  );
}

export default BlockLocales;
