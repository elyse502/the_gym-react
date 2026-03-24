import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Parent } from "./examples/Example1.jsx";
import { Parent1 } from "./examples/Example2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Parent /> */}
    {/* <Parent1 /> */}
  </StrictMode>,
);
