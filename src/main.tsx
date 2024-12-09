import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductStore from "./store/productStore.ts";
import UserStore from "./store/userStore.ts";

interface StoreContextType {
  product: ProductStore;
  user: UserStore;
}
export const Context = createContext<StoreContextType | undefined>(undefined);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
