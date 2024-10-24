import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/TypeBar.css";


const types = [
  "Струны",
  "Электрогитары",
  "Барабанные",
  "Акустики",
  "Классики",
  "Укулеле",
  "Калимбы",
  "Ударные",
  "Клавишные",
  "Варганы",
  "Усилители",
  "Наушники",
  "Микрофоны",
  "Бас",
  "Усилители",
  "Медиаторы",
];

const TypeBar = () => {
  return (
    <ListGroup horizontal className="TypeBar">
      {types.map(type => {
        return(
          <ListGroup.Item className="ProductType" action href="#link1">{type}</ListGroup.Item>
        )
      })}
      {/* <ListGroup.Item className="ProductType" action href="#link1">
        Струны
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Электрогитары
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Барабанные палочки
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Акустики
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Классики
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Укулеле
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Калимбы
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Ударные
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Клавишные
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Варганы
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Усилители
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Наушники
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Микрофоны
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Бас гитары
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Усилители для баса
      </ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">
        Медиаторы
      </ListGroup.Item> */}
    </ListGroup>
  );
};

export default TypeBar;
