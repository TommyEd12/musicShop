import React from "react";
import Card from "../../components/Card";
import { Container, Pagination } from "react-bootstrap";
import TypeBar from "../../components/TypeBar";
import "./Catalog.css";
import FilterList from "../../components/FilterList/FilterList";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Catalog() {
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
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
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
}
