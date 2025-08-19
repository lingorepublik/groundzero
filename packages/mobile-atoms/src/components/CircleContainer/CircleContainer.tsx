import type { PropsWithChildren } from "react";
import { Container } from "./CircleContainer.styles";

type Props = {} & PropsWithChildren;

export default function CircleContainer({ children }: Props) {
  return <Container>{children}</Container>;
}
