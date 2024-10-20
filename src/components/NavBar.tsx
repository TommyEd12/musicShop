import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import storeLogo from "../assets/storeLogo.jpg";
import CatalogImage from "../assets/CatalogImage.svg";
import ShoppingCart from "../assets/shopping-cart.svg";
import SearchImage from "../assets/search.svg";
import UserImage from "../assets/user.svg";
import HomeImage from "../assets/home.svg";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary navBarContainer"
    >
      <Container className="NavContent">
        <img className="navBarLogo" src={storeLogo}></img>
        <Navbar.Brand href="#" className="NavBarTitle">
          <h1>MUS&CO</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="d-flex flex-row NavBarContent"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link eventKey="1" href="#action1">
              Главная страница
            </Nav.Link>
            <img className="HomeImage" src={HomeImage}></img>
            <Nav.Link eventKey="2" href="#action2">
              Каталог
            </Nav.Link>
            <img className="CatalogImage" src={CatalogImage}></img>
            <Nav.Link eventKey="3" href="#action3">
              Личный кабинет
            </Nav.Link>
            <img className="UserImage" src={UserImage}></img>
            <Nav.Link eventKey="4" href="#">
              Корзина
            </Nav.Link>
            <img className="ShoppingCartImage " src={ShoppingCart}></img>
          </Nav>
          <Form className="Search">
            <Form.Control
              type="search"
              placeholder="Поиск"
              className="me-2 SearchLine"
              aria-label="Search"
              src={SearchImage}
            />

            <Button className="SearchButton">
              <img src={SearchImage} className="SearchImage"></img>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
