import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Card.css";
import clevanImage from "../assets/clv.jpg";
import { Product } from "../types/product";

interface Props {
  product: Product
}

export default function CardItem({product}: Props) {
  return (
    <Card className="ProductCard">
      <Card.Img variant="top" src={product.images[1]} />
      <Card.Body>
        <div className="Price">{product.price}</div>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
           {product.description}
        </Card.Text>
        <div className="CardFooter">
          <Button className="AddToCart">В корзину</Button>  
          <h6>В наличии: {product.count}</h6>
        </div>
      </Card.Body>
    </Card>
  );
}
