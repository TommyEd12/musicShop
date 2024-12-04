import { createContext, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductStore from "./store/productStore.ts";

interface StoreContextType {
  product: ProductStore;
}
export const Context = createContext<StoreContextType | null>(null);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Context.Provider
      value={{
        product: new ProductStore(),
      }}
    >
      <App />
    </Context.Provider>
  </StrictMode>
);
