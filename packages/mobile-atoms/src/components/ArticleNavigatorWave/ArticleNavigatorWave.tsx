import { Colors } from "../../constants";
import { Container } from "./ArticleNavigatorWave.styles";

type Props = {
  numButtons: number;
};

export default function ArticleNavigatorWave({ numButtons }: Props) {
  return (
    <Container
      width={numButtons * 44 + 2}
      height={46}
      viewBox={`0 0 ${numButtons * 44} 46`}
    >
      <g>
        <line
          x1="0"
          y1="23"
          x2="0"
          y2="27"
          stroke={Colors.primaryDull}
          strokeWidth="2"
          strokeLinecap="round"
        />
        {Array.from({ length: numButtons }).map((_, i) => (
          <path
            d={`M ${44 * i} 23 A 21 21 0 0 ${1 - (i % 2)} ${44 * (i + 1)} 23`}
            stroke={Colors.primaryDull}
            strokeWidth="2"
            fill="none"
          ></path>
        ))}

        <line
          x1={44 * numButtons}
          y1="23"
          x2={44 * numButtons}
          y2={numButtons % 2 === 0 ? "21" : "27"}
          stroke={Colors.primaryDull}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </Container>
  );
}
