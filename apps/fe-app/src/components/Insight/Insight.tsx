import { Container, Translation } from "./Insight.styles";

type Props = {
  translation: string | null;
  insight: string | null;
};

function Insight({ translation, insight }: Props) {
  if (!translation && !insight) {
    return null;
  }

  const insightParts = insight?.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <Container>
      {translation && <Translation>{translation}</Translation>}

      {insightParts && (
        <div>
          {insightParts.map((part, index) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith("*") && part.endsWith("*")) {
              return <Translation key={index}>{part.slice(1, -1)}</Translation>;
            }
            return part;
          })}
        </div>
      )}
    </Container>
  );
}

export default Insight;
