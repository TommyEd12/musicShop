import React, { useState, useEffect, useCallback } from "react";
import Card, { CardItem } from "../../components/Card";
import { Button, Container, Pagination, Spinner } from "react-bootstrap";
import TypeBar from "../../components/TypeBar";
import "./Catalog.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { products } from "../../store/productStore";
import { fetchProducts } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { Product } from "../../types/product";
import FilterList from "../../components/FilterList/FilterList";

const Catalog = observer(() => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const pageSize = 6;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedProducts = await fetchProducts();
      setAllProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products, please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortProducts = (productsToSort: Product[]): Product[] => {
    if (!sortOrder) {
      return productsToSort;
    }
    const sortedProducts = [...productsToSort];

    if (sortOrder === "price_asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price_desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts;
  };

  const handleSort = (order: string) => {
    setSortOrder(order);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterProducts = (productsToFilter: Product[]): Product[] => {
    return productsToFilter.filter((product) => {
      const categoryMatch =
        !products._selectedCategory.id ||
        product.categoryId === products._selectedCategory.id;
      const brandMatch =
        !products._selectedBrand.id ||
        product.brandId === products._selectedBrand.id;
      const stockMatch = !showOnlyInStock || product.count > 0;
      return categoryMatch && brandMatch && stockMatch;
    });
  };

  const paginateProducts = (products: Product[]): Product[][] => {
    const chunkedProducts = [];
    for (let i = 0; i < products.length; i += pageSize) {
      chunkedProducts.push(products.slice(i, i + pageSize));
    }
    return chunkedProducts;
  };
  const handleReset = (): void => {
    products.resetFilters();
    setCurrentPage(1);
  };
  const handleStockChange = () => {
    setShowOnlyInStock(!showOnlyInStock);
  };

  const filteredProducts = filterProducts(allProducts);
  const sortedProducts = sortProducts(filteredProducts);
  const paginatedProducts = paginateProducts(sortedProducts);
  const currentPageProducts = paginatedProducts[currentPage - 1] || [];
  const pageCount = paginatedProducts.length;

  return (
    <Container className="CatalogContainer">
      <TypeBar />
      <div className="CategoryWrapper">
        <h3>
          {products.selectedType.name !== ""
            ? products.selectedType.name
            : "Все категории"}
        </h3>
      </div>
      <div className="DropDownWrapper">
        <div className="Group">
          <Button className="Reset" onClick={() => handleReset()}>
            Сбросить
          </Button>
          <FilterList />
        </div>
        <div className="filtColumn">
          <div className="StockFilter">
            <input
              type="checkbox"
              checked={showOnlyInStock}
              onChange={handleStockChange}
            />
            <label>Только в наличии</label>
          </div>
          <DropdownButton
            className="Dropdown"
            title={
              sortOrder === "price_asc"
                ? "По цене (возрастание)"
                : sortOrder === "price_desc"
                ? "По цене(убывание)"
                : "По умолчанию"
            }
            variant="secondary"
          >
            <Dropdown.Item onClick={() => handleSort("price_asc")}>
              По цене(возрастание)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort("price_desc")}>
              По цене(убывание)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSort(null)}>
              По умолчанию
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="Goods">
        <div className="CardsWrapper">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            currentPageProducts.map((product) => (
              <CardItem key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
      {pageCount > -1 && (
        <Pagination className="GoodsPagination">
          {[...Array(pageCount)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
              className="pagin"
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
});

export default Catalog;
