import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Card.css";
import clevanImage from "../assets/clv.jpg";
import { Product } from "../types/product";
import { observer } from "mobx-react-lite";
import { products } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import { Routes } from "../utils/consts";

interface Props {
  product: Product;
}

export const CardItem = observer(({ product }: Props) => {
  const [showNotification, setShowNotification] = useState(false);
  const navigation = useNavigate()

  const handleAddToCart = () => {
    products.setSelectedProducts(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); 
  };

  return (
    <>
      <Card className="ProductCard">
        <Card.Img onClick={() => {navigation(Routes.PRODUCT_ROUTE + "/" + product.id)}} variant="top" src={product.images[0]} />
        <Card.Body>
          <div className="Price">{product.price}</div>
          <Card.Title onClick={() => {navigation(Routes.PRODUCT_ROUTE + "/" + product.id)}}>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <div className="CardFooter">
            <Button className="AddToCart" onClick={handleAddToCart}>
              В корзину
            </Button>
            <h6>В наличии: {product.count}</h6>
          </div>
        </Card.Body>
      </Card>
      {showNotification && ( 
        <div className="notification">Товар добавлен в корзину!</div>
      )}
    </>
  );
});

export default CardItem;

