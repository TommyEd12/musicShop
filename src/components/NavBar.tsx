import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Routes } from "../utils/consts";
import { debounce } from "../utils/debounce";
import ProductStore, { products } from "../store/productStore";
import { Product } from "../types/product";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const navigation = useNavigate();
  const [count, setCount] = useState<number>(products._selectedProducts.length);
  const searchHandler = debounce((e) => {
    console.log(e.target.value);
  }, 2000);
  useEffect(() => {
    setCount(products._selectedProducts.length);
  }, [products._selectedProducts]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary navBarContainer"
    >
      <Container className="NavContent">
        <img className="navBarLogo" src={storeLogo}></img>
        <Navbar.Brand className="NavBarTitle">
          <h1 onClick={() => navigation(Routes.SHOP_ROUTE)}>MUS&CO</h1>
          <a href="/Catalog">
            <img className="CatalogImage" src={CatalogImage}></img>
          </a>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="Search">
            <Form.Control
              onChange={(e) => {
                searchHandler(e);
              }}
              type="search"
              placeholder="Поиск"
              className="SearchLine"
              aria-label="Search"
              src={SearchImage}
            />
          </Form>

          <Nav
            className="d-flex flex-row NavBarContent"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <a href="/#bottom">
              <h5>Контакты</h5>
            </a>
            <a href="/#AboutUs">
              <h5>О нас</h5>
            </a>
            <a onClick={() => navigation(Routes.PERSONAL_ROUTE)}>
              <img className="UserImage" src={UserImage}></img>
            </a>
            <div className="IconCart">
              <img
                className="ShoppingCartImage "
                onClick={() => navigation(Routes.BASKET_ROUTE)}
                src={ShoppingCart}
              ></img>
              <span>{count > 0 ?count: ""}</span>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
