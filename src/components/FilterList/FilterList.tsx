import React from "react";
import { ListGroup } from "react-bootstrap";
import "./FilterList.css";

export default function FilterList() {
  const brands = ["schecter", "shure", "fender", "gibson", "ibanez", "sire"];
  return (
    <ListGroup className="FilterList">
      {brands.map((brand) => {
        return (
          <div className="BrandBox">
            <input type="checkbox" className="Checkbox"></input>
            <ListGroup.Item className="BrandItem" action href="#link1">
              {brand}
            </ListGroup.Item>
          </div>
        );
      })}
    </ListGroup>
  );
}
