import styled from "@emotion/styled";

const SIZE = 15;

export const Container = styled.div`
  width: ${SIZE}px;
  min-width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: 50%;
  outline: 1px solid white;
  outline-offset: -1px;
  overflow: hidden;
  position: relative;
`;

type ProgressProps = {
  progress: number;
};

export const Progress = styled.div<ProgressProps>`
  position: absolute;
  width: ${SIZE}px;
  height: ${SIZE}px;
  background-color: white;
  top: ${(props) => props.progress * SIZE}px;
`;
