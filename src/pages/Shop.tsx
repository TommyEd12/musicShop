import React from "react";
import { Carousel, Container } from "react-bootstrap";
import "../styles/Shop.css";
import ShopSlider from "../components/ShopSlider";

const Shop = () => {
  return (
    <Container className="ShopContainer">
      <ShopSlider></ShopSlider>
    </Container>
  );
};

export default Shop;
