import styled from "@emotion/styled";
import type { SentenceBaloonDirection } from "./SentenceCharacter.types";

type ContainerProps = {
  direction: SentenceBaloonDirection;
};

export const Container = styled.div<ContainerProps>`
  width: 50px;
  min-width: 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  ${({ direction }) =>
    direction === "left"
      ? `border-right: solid 1px #999; padding-right: 10px`
      : `border-left: solid 1px #999; padding-left: 10px`}
`;

type AvatarProps = {
  name: string;
};

export const Avatar = styled.div<AvatarProps>`
  width: 38px;
  height: 38px;
  background-color: gray;
  border-radius: 50%;
  background-image: ${({ name }) => `url(/${name}.png)`};
  background-size: contain;
`;

export const Name = styled.div`
  font-size: 12px;
  color: #999;
`;

type ArrowProps = {
  direction: SentenceBaloonDirection;
};

export const SpeechIndicator = styled.div<ArrowProps>`
  position: absolute;
  width: 7px;
  height: 7px;
  border-top: solid 1px #999;
  border-left: solid 1px #999;
  top: 10px;
  transform: ${({ direction }) =>
    direction === "left" ? "rotate(-45deg)" : "rotate(135deg)"};
  background-color: white;
  ${({ direction }) =>
    direction === "left"
      ? `right: -4px; left: auto`
      : `left: -4px; right: auto`}
`;

type ThoughtndicatorProps = {
  direction: SentenceBaloonDirection;
}

export const ThoughtIndicator = styled.div<ThoughtndicatorProps>`
  position: absolute;
  top: 7px;
  right: ${({direction}) => direction==="left" ? '4px' : 'auto'};
  left: ${({direction}) => direction==="right" ? '4px' : 'auto'};
  width: 11px;
  height: 9px;
  border: solid 1px #999;
  border-radius: 50%;
  background-color: white;
  transform: ${({direction}) => direction==='left' ? 'rotate(15deg)' : 'rotate(-15deg)'};
`;

export const ThoughtIndicator2 = styled.div<ThoughtndicatorProps>`
  position: absolute;
  top: 11px;
  right: ${({direction}) => direction==="left" ? '-4px' : 'auto'};
  left: ${({direction}) => direction==="right" ? '-4px' : 'auto'};
  width: 7px;
  height: 5px;
  border: solid 1px #999;
  border-radius: 50%;
  background-color: white;
  transform: ${({direction}) => direction==='left' ? 'rotate(-10deg)' : 'rotate(10deg)'};
`;
