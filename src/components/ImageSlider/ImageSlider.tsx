import React from "react";
import { Carousel } from "react-bootstrap";
import GuitarsImage from "../../assets/gtrs.jpg";
import StaffImage from "../../assets/staff.jpg";
import StringsImage from "../../assets/strings.jpg";
import "./ImageSlider.css"

export default function ImageSlider() {
  return (
    <div className="ImageSliderContainer">
      <Carousel className="ImageSlider" data-bs-theme="light">
        <Carousel.Item className="ImageSlide">
          <img
            className="d-block w-100 fit slideImg"
            src={GuitarsImage}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item className="ImageSlide">
          <img
            className="d-block w-100 fit slideImg"
            src={StaffImage}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item className="ImageSlide">
          <img
            className="d-block w-100 fit slideImg"
            src={StringsImage}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
