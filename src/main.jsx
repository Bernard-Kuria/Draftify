import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Draftify from "./Draftify.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Draftify />
  </StrictMode>
);
