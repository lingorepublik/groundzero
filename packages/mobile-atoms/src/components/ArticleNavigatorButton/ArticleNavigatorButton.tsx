import { type PropsWithChildren } from "react";
import {
  NavigatorButton,
  Content,
  Container,
  Star
} from "./ArticleNavigatorButton.styles";
import { ArticleNavigatorButtonProgress } from "../ArticleNavigatorButtonProgress";
import { StarIcon } from "../svg-icons";

const getColors = (
  isStarred: boolean,
  isDisabled: boolean,
  isActive: boolean,
  progress: number
): { background: string; wave: string; text: string } => {
  const colors = {
    background: "#c7c7c7",
    wave: "#ababab",
    text: "#ffffff",
  };

  if (isStarred && isDisabled) {
    return {
      background: "#F5F5F5",
      wave: "#dedede",
      text: "#c8c8c8",
    };
  }

  if (isActive) {
    if (progress === 1) {
      return { ...colors, wave: "#1CC9BA", text: "#7DE1D9" };
    } else {
      return { ...colors, background: "#7DE1D9", wave: "#1CC9BA" };
    }
  }

  if (progress === 1) {
    return { ...colors, text: "#E1E1E1" };
  }

  return colors;
};

const rotation = () => Math.floor(Math.random() * 36);

type Props = {
  isStarred: boolean;
  isDisabled: boolean;
  isActive: boolean;
  progress: number;
} & PropsWithChildren;

export default function ArticleNavigatorButton({
  children,
  isStarred,
  isDisabled,
  isActive,
  progress,
}: Props) {
  const { background, wave, text } = getColors(
    isStarred,
    isDisabled,
    isActive,
    progress
  );

  return (
    <Container>
      <NavigatorButton backgroundColor={background}>
        <Content textColor={text}>{children}</Content>
        <ArticleNavigatorButtonProgress
          progress={progress}
          backgroundColor={wave}
        />
      </NavigatorButton>
      {isStarred && (
        <Star rotation={rotation()}>
          <StarIcon />
        </Star>
      )}
    </Container>
  );
}
