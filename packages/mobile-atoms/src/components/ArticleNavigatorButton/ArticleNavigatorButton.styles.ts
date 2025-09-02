import styled from "@emotion/styled";

type ContainerProps = {
  backgroundColor: string;
};

export const Container = styled.div`
  width: 34px;
  height: 34px;
  position: relative;
`;

export const NavigatorButton = styled.button<ContainerProps>`
  all: unset;
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  position: relative;
  overflow: hidden;
`;

type ContentProps = {
  textColor: string;
};

export const Content = styled.div<ContentProps>`
  font-size: 22px;
  color: ${(props) => props.textColor};
  z-index: 1;
`;

type StarProps = {
  rotation: number;
};

export const Star = styled.div<StarProps>`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -7px;
  left: -5px;
  z-index: 2;
  transform: rotate(${(props) => props.rotation}deg);
`;
