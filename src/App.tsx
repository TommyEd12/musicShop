import "./App.css";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "./main";

const App = observer(() => {
  const context  = useContext(Context)
  const user = context?.user
  const product = context?.product

  return (
    <BrowserRouter>
      <NavBar></NavBar>
      <AppRouter></AppRouter>
      <Footer></Footer>
    </BrowserRouter>
  );
});

export default App;
