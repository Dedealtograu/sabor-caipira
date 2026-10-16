import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { DeskItmsProvider } from "./contexts/DeskItmsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <DeskItmsProvider>
        <RouterProvider router={router} />
      </DeskItmsProvider>
    </UserProvider>
  </StrictMode>,
);
