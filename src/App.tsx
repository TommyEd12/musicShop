import "./App.css";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
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
