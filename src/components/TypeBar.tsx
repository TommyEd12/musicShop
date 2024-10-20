import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import "../styles/TypeBar.css";

const TypeBar = () => {
  return (
    <ListGroup horizontal className= "TypeBar">
      <ListGroup.Item className="ProductType" action href="#link1">This</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">ListGroup</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">renders</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">horizontally!</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">This</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">ListGroup</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">renders</ListGroup.Item>
      <ListGroup.Item className="ProductType" action href="#link1">horizontally!</ListGroup.Item>
    </ListGroup>
  );
};

export default TypeBar;
