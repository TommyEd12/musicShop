import React, { useEffect, useState } from "react";
import "../styles/ShopSlider.css";
import { Carousel } from "react-bootstrap";
import fender from "../assets/fender.jpg";
import gibson from "../assets/gibson.jpg";
import ibanez from "../assets/ibanez.jpg";
import { SliderContent } from "../types/sliderContent";
import { fetchSliderContent } from "../http/sliderContent";
import { useNavigate } from "react-router-dom";

const ShopSlider = () => {
  const [sliderContents, setSliderContents] = useState<SliderContent[]>([]);
  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchSliderContent().then((data) => setSliderContents(data));
    };
    fetchData();
  },[]);

  return (
    <div className="SliderContainer">
      <Carousel className="ShopSlider" data-bs-theme="light">
        {sliderContents.map((sliderContent) => (
          <Carousel.Item key={sliderContent.id} className="Slide">
            <img
              src={sliderContent.image}
              className="d-block w-100 fit slideImg"
            />
            <Carousel.Caption className="Caption">
              <a href={sliderContent.buttonLink}  target="_blank">
                <h5 id="CaptionText">{sliderContent.buttonTitle}</h5>
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ShopSlider;
