import React from "react";
import "./BrandBar.css";
import { Container } from "react-bootstrap";
import espLogo from "../../assets/esp.jpg";
import shureLogo from "../../assets/shure.png";

export default function BrandBar() {
  return (
    <div className="BrandBarContainer">
      <div className="BrandBarSlide">
          <img className="BrandLogo" src={espLogo}></img>
          <img className="BrandLogo" src={shureLogo}></img>
          <img className="BrandLogo" src={espLogo}></img>
          <img className="BrandLogo" src={shureLogo}></img>
          <img className="BrandLogo" src={espLogo}></img>
          <img className="BrandLogo" src={shureLogo}></img>
      </div>
      <div className="BrandBarSlide">
          <img className="BrandLogo" src={espLogo}></img>
          <img className="BrandLogo" src={shureLogo}></img>
          <img className="BrandLogo" src={espLogo}></img>
          <img className="BrandLogo" src={shureLogo}></img>
          <img className="BrandLogo" src={espLogo}></img>
          <img className="BrandLogo" src={shureLogo}></img>
      </div>
    </div>
  );
}
