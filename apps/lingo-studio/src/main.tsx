import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "react-query";
import { GlobalStyles, App } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <GlobalStyles />
      <App />
    </QueryProvider>
  </StrictMode>,
);
