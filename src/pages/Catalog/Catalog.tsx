import React, { useEffect } from "react";
import Card, { CardItem } from "../../components/Card";
import { Container, Pagination } from "react-bootstrap";
import TypeBar from "../../components/TypeBar";
import "./Catalog.css";
import FilterList from "../../components/FilterList/FilterList";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ProductStore, { products } from "../../store/productStore";
import { fetchProducts } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

const Catalog = observer(() => {
  const product = products;

  try {
    useEffect(() => {
      const fetchData = async () => {
        await fetchProducts().then((data) => product.setProducts(data));
      };
      fetchData();
    }, [product]);
  } catch (error) {
    console.log("Something went wrong");
  }
  const stringifiedObj = JSON.parse(JSON.stringify(product)) as ProductStore;
  console.log(stringifiedObj);
  return (
    <Container className="CatalogContainer">
      <TypeBar></TypeBar>
      <div className="CategoryWrapper">
        <h3>Все категории</h3>
      </div>
      <div className="DropDownWrapper">
        <DropdownButton
          className="Dropdown"
          title="По новизне"
          variant="secondary"
        >
          <Dropdown.Item>По цене(возрастание)</Dropdown.Item>
          <Dropdown.Item>По цене(убывание)</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="Goods">
        <FilterList></FilterList>
        <div className="CardsWrapper">
          {stringifiedObj._products ? (
            stringifiedObj._products.map((product, key) => (
              <CardItem key={product.id} product={product}></CardItem>
            ))
          ) : (
            <div>Загрузка</div>
          )}
        </div>
      </div>
      <Pagination className="GoodsPagination">
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Item>{4}</Pagination.Item>
        <Pagination.Item>{"Вперед>"}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
      </Pagination>
    </Container>
  );
});
export default Catalog;
