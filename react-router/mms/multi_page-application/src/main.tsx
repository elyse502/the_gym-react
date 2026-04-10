import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TeamProvider>
      <App />
    </TeamProvider>
  </BrowserRouter>,
);
