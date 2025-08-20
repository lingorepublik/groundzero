import { type ButtonHTMLAttributes, type Ref } from "react";
import { Container } from "./SvgButton.styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: Ref<HTMLButtonElement>;
};

export default function SvgButton({ ref, children, ...props }: Props) {
  return (
    <Container ref={ref} {...props}>
      {children}
    </Container>
  );
}
