import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Shop from "./pages/Shop";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <AppRouter></AppRouter>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
