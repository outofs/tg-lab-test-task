import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FavoritesCitiesProvider } from "./components/FavoritesCitiesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FavoritesCitiesProvider>
      <App />
    </FavoritesCitiesProvider>
  </StrictMode>,
);
