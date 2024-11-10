import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/Card.css";
import clevanImage from "../assets/clv.jpg";

export default function CardItem() {
  return (
    <Card className="ProductCard">
      <Card.Img variant="top" src={clevanImage} />
      <Card.Body>
        <div className="Price">24990 Р</div>
        <Card.Title>Clevan 52</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className="CardFooter">
          <Button className="AddToCart">В корзину</Button>  
          <h6>В наличии: 1шт</h6>
        </div>
      </Card.Body>
    </Card>
  );
}
