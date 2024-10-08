import React from "react";
import "../styles/ShopSlider.css";
import { Carousel } from "react-bootstrap";
import fender from "../assets/fender.jpg";
import gibson from "../assets/gibson.jpg";
import ibanez from "../assets/ibanez.jpg";

const ShopSlider = () => {
  return (
    <Carousel className="Shopslider" data-bs-theme="light">
      <Carousel.Item>
        <img className="d-block" src={fender} alt="First slide" />
        <Carousel.Caption className="Caption">
          <h5 id="CaptionText">Встречайте гитары fender</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block" src={gibson} alt="Second slide" />
        <Carousel.Caption className="Caption">
          <h5 id="CaptionText">Second slide label</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block" src={ibanez} alt="Third slide" />
        <Carousel.Caption className="Caption">
          <h5 id="CaptionText">Third slide label</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default ShopSlider;
