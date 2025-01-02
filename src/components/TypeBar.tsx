import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/TypeBar.css";
import { observer } from "mobx-react-lite";
import { products } from "../store/productStore";
import { fetchCategories } from "../http/productAPI";
import { Category } from "../types/category";
import { useNavigate, useLocation } from "react-router-dom";
import { Routes } from "../utils/consts";

const TypeBar = observer(() => {
  const product = products;
  const navigate = useNavigate();
  const location = useLocation();

  try {
    useEffect(() => {
      const fetchData = async () => {
        await fetchCategories().then((data) => product.setTypes(data));
      };
      fetchData();
    }, [product]);
  } catch (error) {
    console.log("Something went wrong");
  }
  const handleSettingCategory = (category: Category): void => {
    product.setSelectedCategory(category);
    if (location.pathname !== Routes.CATALOG_ROUTE) {
      navigate(Routes.CATALOG_ROUTE);
    }
  };

  const types = product._categories;

  return (
    <ListGroup horizontal className="TypeBar">
      {types.map((type) => (
        <ListGroup.Item
          key={type.id}
          className="ProductType"
          onClick={() => handleSettingCategory(type)}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
