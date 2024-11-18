import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import storeLogo from "../assets/logo3.png";
import CatalogImage from "../assets/CatalogImage.svg";
import ShoppingCart from "../assets/shopping-cart.svg";
import SearchImage from "../assets/search.svg";
import UserImage from "../assets/user.svg";
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
        <Navbar.Brand href="/#" className="NavBarTitle">
          <h1>MUS&CO</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="d-flex flex-row NavBarContent"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <a href="/#bottom"><h5>Контакты</h5></a>
            <a href= "/#AboutUs"><h5>О нас</h5></a>
            <a href="/Catalog"><img className="CatalogImage" src={CatalogImage}></img></a>

            <img className="UserImage" src={UserImage}></img>

            <img className="ShoppingCartImage " src={ShoppingCart}></img>
          </Nav>

          <Form className="Search">
            <Form.Control
              type="search"
              placeholder="Поиск"
              className="SearchLine"
              aria-label="Search"
              src={SearchImage}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
