import React from "react";
import { ListGroup } from "react-bootstrap";
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/consts";
import "./SearchResults.css"

interface SearchResultsProps {
  results: Product[];
  onSelect: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  const navigate = useNavigate();

  const handleSelect = (product: Product) => {
    navigate(Routes.PRODUCT_ROUTE + "/" + product.id);
    onSelect();
  };

  return (
    <ListGroup className="ResultList">
      {results.map((product) => (
        <ListGroup.Item
          key={product.id}
          action
          onClick={() => handleSelect(product)}
          className="d-flex prod justify-content-between align-items-center"
        >
          <div>
            <img
              src={product.images[0] || "/placeholder.svg?height=30&width=30"}
              alt={product.name}
              className="me-2"
              style={{ width: "30px", height: "30px", objectFit: "cover" }}
            />
            
            {product.name.length >22?product.name.slice(0,22)+"...":product.name}
          </div>
          <span>{product.price} ₽</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SearchResults;
