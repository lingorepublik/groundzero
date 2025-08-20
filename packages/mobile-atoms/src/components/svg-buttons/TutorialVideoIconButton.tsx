/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Colors } from "mobile-atoms";
import SvgButton from "./SvgButton";

type Props = {
  disabled?: boolean;
};

const TutorialVideoButton = ({ disabled }: Props) => (
  <SvgButton onClick={() => console.log("Tutorial Icon Clicked")}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.318573"
      height="40"
      viewBox="0 0 7.4926223 10.583333"
      css={css`
        stroke: ${disabled ? Colors.paleGray : "#8E8E8E"};
        stroke-width: 0.264583;
        fill: none;
        stroke-opacity: 1;
        transition: stroke 0.2s ease-in-out;
        :hover {
          stroke: ${!disabled && Colors.charcoalGray};
        }
      `}
    >
      <g
        transform="translate(-87.584725,-72.096231)"
        css={css`
          display: inline;
        `}
      >
        <rect
          x="87.716965"
          y="72.228462"
          width="7.1438642"
          height="10.318864"
          ry="1.424117"
        />
        <g
          css={css`
            stroke-linecap: round;
          `}
        >
          <path d="M88.705446,73.776998 h4.944491" />
          <path d="M88.705446,74.57682 h1.678869" />
          <path d="M91.145765,74.57682 h1.1028" />
          <path d="M88.705446,80.12739 h1.269151" />
          <path d="M90.787323,80.12739 h2.217745" />
          <path d="M88.705446,80.912954 H91.28002" />
          <path
            d="m 91.665267,77.042627 -2.620811,0.143857 a 0.151129,0.151129 56.858164 0 1 -0.14311,-0.219179 l 1.178366,-2.326896 a 0.14305666,0.14305666 176.85816 0 1 0.247409,-0.01358 l 1.442634,2.209468 a 0.13352953,0.13352953 116.85816 0 1 -0.104488,0.206331 z"
            transform="rotate(93.174157,90.066308,77.074909)"
            className="play-icon"
            css={css`
              stroke: ${disabled ? Colors.pastelOrange : Colors.orange};
              fill: ${disabled ? Colors.pastelOrange : Colors.orange};
              transition: fill 0.2s ease-in-out;
            `}
          />
        </g>
      </g>
    </svg>
  </SvgButton>
);

export default TutorialVideoButton;
