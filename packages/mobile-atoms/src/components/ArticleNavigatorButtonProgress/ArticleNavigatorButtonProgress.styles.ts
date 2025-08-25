import styled from "@emotion/styled";

type ContainerProps = {
  top: string;
  left: number;
};

export const Container = styled.svg<ContainerProps>`
  width: 100px;
  height: 44px;
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left}px;
  transition:
    top 0.3s ease-in-out,
    left 0.3s ease-in-out;
`;
