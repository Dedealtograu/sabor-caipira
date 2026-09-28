import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { OrderItmsProvider } from "./contexts/OrderItmsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <OrderItmsProvider>
        <RouterProvider router={router} />
      </OrderItmsProvider>
    </UserProvider>
  </StrictMode>,
);
