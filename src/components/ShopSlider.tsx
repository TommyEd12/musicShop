import React from "react";
import "../styles/ShopSlider.css";
import { Carousel } from "react-bootstrap";
import fender from "../assets/fender.jpg";
import gibson from "../assets/gibson.jpg";
import ibanez from "../assets/ibanez.jpg";

const ShopSlider = () => {
  return (
    <div className="SliderContainer">
      <Carousel className="ShopSlider" data-bs-theme="light">
        <Carousel.Item className="Slide">
          <img
            className="d-block w-100 fit slideImg"
            src={fender}
            alt="First slide"
          />
          <Carousel.Caption className="Caption">
            <h5 id="CaptionText">Встречайте гитары fender</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="Slide">
          <img
            className="d-block w-100 fit slideImg"
            src={gibson}
            alt="Second slide"
          />
          <Carousel.Caption className="Caption">
            <h5 id="CaptionText">Гитары Les paul Supreme</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="Slide">
          <img
            className="d-block w-100 fit slideImg"
            src={ibanez}
            alt="Third slide"
          />
          <Carousel.Caption className="Caption">
            <h5 id="CaptionText">Бас гитары Ibanez</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ShopSlider;
