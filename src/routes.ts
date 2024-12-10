import Admin from "./pages/Admin";
import { Routes } from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth/Auth";
import ProductPage from "./pages/ProductPage";
import Basket from "./pages/Basket/Basket";
import AboutUs from "./pages/AboutUs";
import Catalog from "./pages/Catalog/Catalog";
import ProfilePage from "./pages/profile/profile";
import OrderCreationPage from "./pages/orderCreatingPage/orderCreatingPage";

export interface IRoute {
  path: string;
  Element: React.FC;
}

export const authRoutes: IRoute[] = [
  {
    path: Routes.ADMIN_ROUTE,
    Element: Admin,
  },
  {
    path: Routes.ABOUT_US_ROUTE,
    Element: AboutUs,
  },
];

export const publicRoutes: IRoute[] = [
  {
    path: Routes.SHOP_ROUTE,
    Element: Shop,
  },
  {
    path: Routes.ORDER_CREATING,
    Element: OrderCreationPage
  },
  {
    path: Routes.CATALOG_ROUTE,
    Element: Catalog,
  },
  {
    path: Routes.BASKET_ROUTE,
    Element: Basket,
  },
  {
    path: Routes.LOGIN_ROUTE,
    Element: Auth,
  },
  {
    path: Routes.PRODUCT_ROUTE + "./id",
    Element: ProductPage,
  },
  {
    path: Routes.REGISTRATION_ROUTE,
    Element: Auth,
  },
  {
    path: Routes.PERSONAL_ROUTE,
    Element: ProfilePage
  }
];
