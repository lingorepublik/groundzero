// import React from "react";
import { Colors } from "../../constants";

export default function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke={Colors.primary}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0)"
    >
      <path
        d="
            M 7 1 
            L 33 1 
            L 33 14 
            C 31 23 20 25 20 25
            C 20 25 10 23 7 14
            L 7 1
            Z
            "
      />
      <clipPath id="cup-mask">
        <path
          d="
            M 8 1 
            L 32 1 
            L 32 14 
            C 31 22 20 24 20 24
            C 20 24 10 22 8 14
            L 8 1
            Z
            "
          stroke="none"
          fill="white"
        />
      </clipPath>
      <g clipPath="url(#cup-mask)">
        <path
          d="
            M 0 1
            L 40 1
            L 40 40
            L 0 40
            Z
        "
          fill="yellow"
          transform="translate(0, 0) rotate(0)"
          style={{
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </g>
      <path
        d="
            M 7 4 
            L 1 4
            C 1 10 1 10 7 14 
            "
      />
      <path
        d="
            M 33 4 
            L 39 4
            C  39 10 39 10 33 14
            "
      />
      <path
        d="
            M 20 25 
            L 20 39 
            "
      />
      <path
        d="
            M 13 39
            L 27 39
        "
        strokeLinecap="round"
      />
    </svg>
  );
}
