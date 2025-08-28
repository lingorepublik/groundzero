// import React from "react";
import { Colors } from "../../constants";

type Props = {
  progress: number;
  isStarred?: boolean;
};

export default function TrophyIcon({ progress, isStarred = false }: Props) {
  const rotation = Math.floor(Math.random() * 31) - 15;

  const x = (1 - progress) * 25;

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke={Colors.primary}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      transform={`rotate(${rotation})`}
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
        fill={progress > 0.95 ? "#ffe291" : "none"}
      />

      {progress <= 0.95 && (
        <>
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
              fill="#ffe291"
              transform={`translate(0, ${x}) rotate(${-rotation}, 20, 20)`}
              style={{
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </g>
        </>
      )}
      <path
        d="
          M 27 5
          L 30 5
          L 30 15
          L 22 22
          L 27 15
          Z
        "
        fill="white"
        stroke="none"
        strokeWidth="0.5"
      />
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
      {isStarred && (
        <path
          transform="translate(15, 7) scale(1.2, 1.2)"
          d="
          M4.65311 0.947069
          L5.30307 3.39175
          L7.98682 3.59382
          L5.70476 4.90265
          L6.35472 7.34733
          L4.29438 5.71155
          L2.01232 7.02037
          L3.02101 4.70058
          L0.960668 3.0648
          L3.64442 3.26687
          L4.65311 0.947069
          Z
          "
          fill="#1CC9BA"
        />
      )}
    </svg>
  );
}
