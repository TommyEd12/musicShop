import React, { useContext, useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import "../styles/Shop.css";
import ShopSlider from "../components/ShopSlider";
import TypeBar from "../components/TypeBar";
import CardItem from "../components/Card";
import BrandBar from "../components/BrandBar/BrandBar";
import FireImage from "../assets/fire.png";
import GuitarImage from "../assets/guitar.svg";
import MusImage from "../assets/mus1.svg";
import NoteImage from "../assets/note1.svg";
import Reviews from "../components/ReviewsWidget/Reviews";
import Smile from "../assets/emoji-hug.svg";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import { Context } from "../main";
import { fetchProducts } from "../http/productAPI";
import ProductStore, { products } from "../store/productStore";
import { observer } from "mobx-react-lite";

const Shop = observer(() => {
  const product = products;

  try {
    useEffect(() => {
      const fetchData = async () => {
        await fetchProducts().then((data) => product.setProducts(data));
      };
      fetchData();
    }, [product]);
  } catch (error) {
    console.log("Something went wrong");
  }
  const stringifiedObj = JSON.parse(JSON.stringify(product)) as ProductStore;
  console.log(product._products);

  return (
    <Container className="ShopContainer">
      <TypeBar></TypeBar>
      <div className="TextDiv">
        <h2 className="Greetings">Добро пожаловать в MUS&CO!</h2>
      </div>
      <ShopSlider></ShopSlider>
      <div className="Block">
        <h2 className="NewItems">Новинки и акции!</h2>
        <img className="FireImage" src={FireImage}></img>
      </div>
      <div className="CardsContainer">
        {stringifiedObj._products ? (
          stringifiedObj._products
            .slice(-6)
            .map((product) => <CardItem product={product}></CardItem>)
        ) : (
          <div>Загрузка</div>
        )}
      </div>
      <div className="Block">
        <h2 className="NewItems">Наши бренды</h2>
        <img className="GuitarImage" src={GuitarImage}></img>
      </div>

      <BrandBar></BrandBar>
      <div id="AboutUs" className="Block">
        <h2 className="NewItems">О нашей компании</h2>
        <img className="NoteImage" src={NoteImage}></img>
      </div>
      <Container className="AboutUsBlock">
        <div className="AboutUs">
          <p>
            Мы - небольшая команда <strong> MUS&CO </strong>, основанная в 2020
            году и расположенная в городе <strong>Пермь</strong>, по адресу
            Революции 22.
          </p>
          <p>
            В магазине представлены товары мировых брендов для новичков и
            профессионалов.
          </p>
          <p>
            Среди них - всемирно известные бренды музыкальных инструментов:
            Cort, LAG, Sigma, Ditson, Flight, JET, Casio, NUX и др.
          </p>
        </div>
        <img className="MusImage" src={MusImage}></img>
      </Container>
      <div className="ReviewBlock">
        <h2 className="ReviewsTitle">
          О нас <strong>вашими словами</strong>
        </h2>
        <img className="smile" src={Smile}></img>
      </div>
      <div className="Widgets">
        <div className="RewiewsWrapper">
          <Reviews></Reviews>
        </div>
        <ImageSlider></ImageSlider>
      </div>
      <br></br>
    </Container>
  );
});

export default Shop;
