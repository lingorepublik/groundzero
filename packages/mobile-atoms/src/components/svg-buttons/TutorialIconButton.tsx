/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Colors } from "mobile-atoms";
import SvgButton from "./SvgButton";

const TutorialIconButton = () => (
  <SvgButton onClick={() => console.log("Tutorial Icon Clicked")}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28.318573"
      height="40"
      viewBox="0 0 7.4926223 10.583333"
      css={css`
        stroke: ${Colors.ashGray};
        stroke-width: 0.264583;
        fill: none;
        stroke-opacity: 1;
        transition: stroke 0.2s ease-in-out;
        :hover {
          stroke: ${Colors.charcoalGray};
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
          <path d="M88.705446,75.760973 H91.82185" />
          <path d="M88.705446,76.560421 h2.29427" />
          <path d="M91.820731,76.560421 h1.857481" />
          <path d="M88.705446,77.744887 h3.116405" />
          <path d="M92.397326,77.744887 h0.673883" />
          <path d="M88.705446,78.544335 h2.29427" />
          <path d="M88.705446,80.12739 h1.269151" />
          <path d="M90.787323,80.12739 h2.217745" />
          <path d="M88.705446,80.912954 H91.28002" />
        </g>
      </g>
    </svg>
  </SvgButton>
);

export default TutorialIconButton;
