import { useFetchBlockLocales } from "react-query";

type Props = {
  blockId: string;
};

function BlockLocales({ blockId }: Props) {
  const { data } = useFetchBlockLocales(blockId);

  if (!data) {
    return null;
  }

  return (
    <div>
      {data.map((locale) => (
        <div key={locale._id}>
          <div>{locale.lang}</div>
          <div>translation: {locale.sentenceTranslation}</div>
          {locale.insight && <div>insight: {locale.insight}</div>}
        </div>
      ))}
    </div>
  );
}

export default BlockLocales;
