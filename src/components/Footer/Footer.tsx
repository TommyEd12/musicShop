import React from "react";
import { Container } from "react-bootstrap";
import "./Footer.css";
import visaLogo from "../../assets/visa.svg";
import mastercardLogo from "../../assets/mastercard.svg";
import mirLogo from "../../assets/mir.svg";
import vkLogo from "../../assets/vk-logo.svg";
import youtubeLogo from "../../assets/youtube.svg";

export default function Footer() {
  return (
    <footer id="bottom" className="FooterWrapper">
      <Container className="FooterContainer">
        <ul className="PaymentMethods">
          <li>
            <img src={visaLogo}></img>
          </li>
          <li>
            <img src={mastercardLogo}></img>
          </li>
          <li>
            <img src={mirLogo}></img>
          </li>
        </ul>
        <div className="Contacts">
          <h6>Контакты</h6>
          <p>+7 (922) 330-20-04</p>
          <p>ул. Революции, 22, Пермь</p>
          <p>
            <a>musco.store@gmail.com</a>
          </p>
        </div>
        <ul className="MediaLinks">
          <li>
            <a href="https://vk.com/musnco_ru" target="_blank">
              <img src={vkLogo}></img>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@mus_co" target="_blank">
              <img src={youtubeLogo}></img>
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
