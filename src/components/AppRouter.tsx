import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Router,
  BrowserRouter,
} from "react-router-dom";
import { publicRoutes, authRoutes } from "../routes";
import { observer } from "mobx-react-lite";
import { IRoute } from "../routes";
import { useAppContext } from "../hooks/UseAppContext";

const AppRouter = observer(() => {

  return (
    <Routes>
      {authRoutes.map((currentRoute: IRoute) => (
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          element={<currentRoute.Element />}
        />
      ))}
      {publicRoutes.map((currentRoute: IRoute) => (
        <Route
          key={currentRoute.path}
          path={currentRoute.path}
          element={<currentRoute.Element />}
        />
      ))}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
});

export default AppRouter;
