import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "react-query";
import { GlobalStyles, App } from "./components";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>,
);
