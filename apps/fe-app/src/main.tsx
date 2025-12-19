import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App, GlobalStyles } from "./components";
import { QueryProvider } from "react-query";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyles />
    <QueryProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
);
