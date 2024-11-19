import { createRoot } from "react-dom/client";
import { AppProviders } from "@/providers";
import { StrictMode } from "react";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
