/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Colors } from "mobile-atoms";
import SvgButton from "./SvgButton";

type Tile = "top" | "bottom";

const getColors = (disabled: boolean, active: boolean, tile: Tile) => {
  let strokeColor = Colors.paleGray;
  let fillColor = Colors.light;
  let textColor = tile === "top" ? Colors.CalmBlue : Colors.paleGreen;

  if (!disabled && !active) {
    strokeColor = tile === "top" ? Colors.AquaBlue : Colors.vitalGreen;
    fillColor = Colors.light;
    textColor = tile === "top" ? Colors.AquaBlue : Colors.vitalGreen;
  }

  if (!disabled && active) {
    strokeColor = tile === "top" ? Colors.AquaBlue : Colors.vitalGreen;
    fillColor = tile === "top" ? Colors.AquaBlue : Colors.vitalGreen;
    textColor = Colors.light;
  }

  return {
    strokeColor,
    fillColor,
    textColor,
  };
};

type Props = {
  disabled?: boolean;
  active?: boolean;
};

const TranslationIconButton = ({ disabled, active }: Props) => (
  <SvgButton onClick={() => console.log("Tutorial Icon Clicked")}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.318573"
      height="40"
      viewBox="0 0 7.4926223 10.583333"
      css={css`
        stroke-width: 0.264583;
        stroke-opacity: 1;
        transition:
          stroke 0.2s ease-in-out,
          fill 0.2s ease-in-out;
        :hover {
          .top {
            fill: ${!disabled && Colors.AquaBlue};
          }
          .bottom {
            fill: ${!disabled && Colors.vitalGreen};
          }
          .bottomText,
          .topText {
            stroke: ${!disabled && Colors.light};
          }
        }
      `}
    >
      <g transform="translate(-87.586888,-72.097021)">
        <g
          transform="translate(-0.01626477,-0.00310059)"
          className="bottom"
          css={css`
            fill: ${getColors(!!disabled, !!active, "bottom").fillColor};
            stroke: ${getColors(!!disabled, !!active, "bottom").strokeColor};
            transition:
              stroke 0.2s ease-in-out,
              fill 0.2s ease-in-out;
          `}
        >
          <path d="m 93.436058,82.550675 h -2.135562 l -1.061558,-5.99461 h 3.19712 c 0.799687,0 1.443478,0.701571 1.443478,1.57303 v 2.988865 c 0,0.871459 -0.643791,1.432715 -1.443478,1.432715 z" />
          <path
            d="m 91.586061,81.438175 c 0.694422,-0.132929 1.788706,-0.751961 2.036223,-2.569141"
            className="bottomText"
            css={css`
              stroke: ${getColors(!!disabled, !!active, "bottom").textColor};
            `}
          />
          <path
            d="m 92.23525,79.54972 c 0.129186,0.734498 1.161953,1.652532 1.864336,1.836068"
            className="bottomText"
            css={css`
              stroke: ${getColors(!!disabled, !!active, "bottom").textColor};
            `}
          />
          <path
            d="M 92.837758,78.829476 V 78.137743"
            className="bottomText"
            css={css`
              stroke: ${getColors(!!disabled, !!active, "bottom").textColor};
            `}
          />
          <path
            d="m 91.432268,78.843731 h 2.839928"
            className="bottomText"
            css={css`
              stroke: ${getColors(!!disabled, !!active, "bottom").textColor};
            `}
          />
        </g>
        <g
          transform="translate(0,0.00431286)"
          className="top"
          css={css`
            fill: ${getColors(!!disabled, !!active, "top").fillColor};
            stroke: ${getColors(!!disabled, !!active, "top").strokeColor};
            transition:
              stroke 0.2s ease-in-out,
              fill 0.2s ease-in-out;
          `}
        >
          <path d="m 89.05603,72.225002 h 1.97781 l 0.983144,6.006764 H 89.05603 c -0.740615,0 -1.336851,-0.702995 -1.336851,-1.576219 V 73.71422 c 0,-0.899048 0.610959,-1.489218 1.336851,-1.489218 z" />
          <path
            d="m 88.626876,76.709152 1.011317,-2.554345 1.188265,2.529269"
            className="topText"
            css={css`
              stroke: ${getColors(!!disabled, !!active, "top").textColor};
            `}
          />
          <path
            d="m 89.008197,75.844034 1.394747,0.0057"
            className="topText"
            css={css`
              stroke: ${getColors(!!disabled, !!active, "top").textColor};
            `}
          />
        </g>
      </g>
    </svg>
  </SvgButton>
);

export default TranslationIconButton;
