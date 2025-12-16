import { css, Global } from "@emotion/react";

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        * {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: "Arial", "Helvetica", sans-serif;
          touch-action: manipulation;
        }
      `}
    />
  );
}
