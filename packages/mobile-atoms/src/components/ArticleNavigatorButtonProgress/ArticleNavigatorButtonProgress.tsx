import { Container } from "./ArticleNavigatorButtonProgress.styles";

type Props = {
  progress: number;
  backgroundColor: string;
};

const calculateLeft = () => {
  const min = -9;
  const max = -1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const calculateTop = (progress: number) => {
  switch (progress) {
    case 0:
      return "38px";
    case 1:
      return "-4px";
    default:
      return `${(1 - progress - 0.05) * 100}%`;
  }
};

export default function ArticleNavigatorButtonProgress({
  progress,
  backgroundColor,
}: Props) {
  return (
    <Container
      top={calculateTop(progress)}
      left={calculateLeft()}
      width="100px"
      height="44px"
      viewBox="0 0 100 44"
    >
      <g>
        <path
          fill={backgroundColor}
          stroke="white"
          d={`
            M 0 2 
            Q 2 0 4 2 
            Q 6 4 8 2
            Q 10 0 12 2 
            Q 14 4 16 2
            Q 18 0 20 2 
            Q 22 4 24 2
            Q 26 0 28 2 
            Q 30 4 32 2
            Q 34 0 36 2 
            Q 38 4 40 2
            Q 42 0 44 2 
            Q 46 4 48 2
            Q 50 0 52 2 
            Q 54 4 56 2
            Q 58 0 60 2 
            Q 62 4 64 2
            Q 66 0 68 2 
            Q 70 4 72 2
            Q 74 0 76 2 
            Q 78 4 80 2
            Q 82 0 84 2 
            Q 86 4 88 2
            Q 90 0 92 2 
            Q 94 4 96 2
            Q 98 0 100 2 
            L 100 44 
            L 0 44 
            L 0 2
            `}
        ></path>
      </g>
    </Container>
  );
}
