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
import SearchResults from "./SearchResults/SearchResults";
import { search } from "../http/productAPI";

const NavBar = observer(() => {
  const navigation = useNavigate();
  const [count, setCount] = useState<number>(products._selectedProducts.length);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  const searchHandler = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchText = e.target.value;
      if (searchText.length >= 3) {
        try {
          const results = await search(searchText);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error("Error searching products:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    },
    300
  );

  useEffect(() => {
    setCount(products._selectedProducts.length);
  }, [products._selectedProducts]);

  const handleSearchBlur = () => {
    setTimeout(() => setShowResults(false), 200);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary navBarContainer"
    >
      <Container className="NavContent">
        <img className="navBarLogo" src={storeLogo} alt="Store Logo" />
        <Navbar.Brand className="NavBarTitle">
          <h1 onClick={() => navigation(Routes.SHOP_ROUTE)}>MUS&CO</h1>
          <a href="/Catalog">
            <img className="CatalogImage" src={CatalogImage} alt="Catalog" />
          </a>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="Search position-relative">
            <Form.Control
              onChange={searchHandler}
              onBlur={handleSearchBlur}
              type="search"
              placeholder="Поиск"
              className="SearchLine"
              aria-label="Search"
            />
            {showResults && searchResults.length > 0 && (
              <SearchResults
                results={searchResults}
                onSelect={() => setShowResults(false)}
              />
            )}
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
              <img className="UserImage" src={UserImage} alt="User" />
            </a>
            <div className="IconCart">
              <img
                className="ShoppingCartImage"
                onClick={() => navigation(Routes.BASKET_ROUTE)}
                src={ShoppingCart}
                alt="Shopping Cart"
              />
              {count > 0 ? <span>{count}</span> : ""}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
