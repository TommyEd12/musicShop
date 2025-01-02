import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import visaLogo from "../../assets/visa.svg";
import mastercardLogo from "../../assets/mastercard.svg";
import mirLogo from "../../assets/mir.svg";
import vkLogo from "../../assets/vk-logo.svg";
import youtubeLogo from "../../assets/youtube.svg";

export default function Footer() {
  return (
    <footer id="bottom" className="footer-wrapper">
      <Container>
        <Row className="py-4 FooterContainer">
          <Col xs={12} md={6} lg={3} className="mb-4">
            <h6 className="footer-heading">Способы оплаты</h6>
            <ul className="payment-methods">
              <li>
                <img src={visaLogo} alt="Visa" />
              </li>
              <li>
                <img src={mastercardLogo} alt="Mastercard" />
              </li>
              <li>
                <img src={mirLogo} alt="Mir" />
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <h6 className="footer-heading">Контакты</h6>
            <ul className="footer-list">
              <li>+7 (922) 330-20-04</li>
              <li>ул. Революции, 22, Пермь</li>
              <li>
                <a href="mailto:musco.store@gmail.com">musco.store@gmail.com</a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <h6 className="footer-heading">Доставка и оплата</h6>
            <ul className="footer-list">
              <li>Доставка по России</li>
              <li>Доставка по Перми</li>
              <li>Оплата</li>
            </ul>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 media">
            <h6 className="footer-heading">Мы в соцсетях</h6>
            <ul className="media-links">
              <li>
                <a href="https://vk.com/musnco_ru" target="_blank" rel="noopener noreferrer">
                  <img src={vkLogo} alt="VK" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@mus_co" target="_blank" rel="noopener noreferrer">
                  <img src={youtubeLogo} alt="YouTube" />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p className="mb-0">&copy; 2025 Mus&Co. Все права защищены.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

