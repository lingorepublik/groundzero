// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App, GlobalStyles } from "./components";
import { QueryProvider } from "react-query";
import { BrowserRouter } from "react-router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./mui/theme.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <GlobalStyles />
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  </>,
  // </StrictMode>,
);
