import React from "react";
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
import Smile from "../assets/emoji-hug.svg"
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Footer from "../components/Footer/Footer";

const Shop = () => {
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
        <CardItem></CardItem>
        <CardItem></CardItem>
        <CardItem></CardItem>
        <CardItem></CardItem>
        <CardItem></CardItem>
        <CardItem></CardItem>
      </div>
      <div className="Block">
        <h2 className="NewItems">Наши бренды</h2>
        <img className="GuitarImage" src={GuitarImage}></img>
      </div>

      <BrandBar></BrandBar>
      <br></br>
      <div className="Block">
        <h2 className="NewItems">О нашей компании</h2>
        <img className="NoteImage" src={NoteImage}></img>
      </div>
      <Container className="AboutUsBlock">
        <div className="AboutUs">
          <p>
            Мы - небольшая команда <strong> MUS&CO </strong>, основанная в 2020
            году и расположенная в городе <strong>Пермь</strong> по адресу
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
    </Container>
    
  );
};

export default Shop;
