import { useFetchBlockLocales } from "react-query";
import { Container } from "./BlockLocales.styles.ts";

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
          <div>translation: {locale.sentenceTranslation}</div>
          {locale.insight && <div>insight: {locale.insight}</div>}
        </div>
      ))}
    </Container>
  );
}

export default BlockLocales;
