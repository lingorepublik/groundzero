import React from "react";
import { Cup, Vine } from "./TrophyIcon.styles";

export default function TrophyIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <Cup
          d="
            M 7 1 
            L 33 1 
            L 33 14 
            C 31 23 20 25 20 25
            C 20 25 10 23 7 14
            L 7 1
            Z
            "
          fill="yellow"
          stroke="black"
          strokeWidth="2"
        ></Cup>
      <mask id="cup-mask">
        <Cup
          d="
            M 7 1 
            L 33 1 
            L 33 14 
            C 31 23 20 25 20 25
            C 20 25 10 23 7 14
            L 7 1
            Z
            "
          fill="yellow"
          stroke="black"
          strokeWidth="2"
        ></Cup>
      </mask>
      <Vine
        d="
            M 0 0
            L 40 0
            L 40 40
            L 0 40
            Z
        "
        fill="red"
        mask="url(#cup-mask)"
      />
      // handle left
      <path
        d="
            M 7 4 
            L 1 4
            C 1 10 1 10 7 14 
            "
        stroke="black"
        strokeWidth="2"
      ></path>
      // handle right
      <path
        d="
            M 33 4 
            L 39 4
            C  39 10 39 10 33 14
            "
        stroke="black"
        strokeWidth="2"
      ></path>
      <path
        d="
            M 20 25 
            L 20 39 
            "
        stroke="black"
        strokeWidth="2"
      ></path>
      <path
        d="
            M 10 39
            L 30 39
        "
        stroke="black"
        strokeWidth="2"
      ></path>
    </svg>
  );
}
