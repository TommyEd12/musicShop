import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../styles/Shop.css";
import ShopSlider from "../components/ShopSlider";
import TypeBar from "../components/TypeBar";

const Shop = () => {
  return (
    <Container className="ShopContainer">
      <TypeBar></TypeBar>
      <ShopSlider></ShopSlider>
    </Container>
  );
};

export default Shop;
