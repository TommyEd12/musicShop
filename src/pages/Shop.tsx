import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../styles/Shop.css";
import ShopSlider from "../components/ShopSlider";
import TypeBar from "../components/TypeBar";
import CardItem from "../components/Card";
import BrandBar from "../components/BrandBar/BrandBar";

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
      </div>
      
      <BrandBar></BrandBar>
    </Container>
    
  );
};

export default Shop;
