import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import DraftifyReact from "./draftify-react/DraftifyReact";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DraftifyReact />
  </StrictMode>
);
