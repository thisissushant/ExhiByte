import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Twubric from "./components/Twubric.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Twubric />
  </StrictMode>
);
