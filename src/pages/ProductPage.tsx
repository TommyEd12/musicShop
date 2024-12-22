import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productAPI";
import { Product } from "../types/product";



const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {id} = useParams();
  if (!id){
    throw new Error
  }
  const Id = parseInt(id)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchOneProduct(Id);
        setProduct(data[0]);
        setLoading(false);
      } catch (err) {
        setError("Ошибка при загрузке товара");
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
      </Container>
);
  }

  if (error || !product) {
    return (
      <Container className="mt-5">
        <div className="alert alert-danger" role="alert">
          {error || "Товар не найден"}
        </div>
      </Container>
    );
  }

  const discount = (
    ((product.price - product.discountPrice) / product.price) *
    100
  ).toFixed(0);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Carousel className="product-carousel mb-4">
            {product?.images?.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${product.name} - изображение ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <div className="product-details">
            <h1 className="mb-3">{product.name}</h1>

            <div className="mb-3">
              <Badge bg="primary" className="me-2">
                ID: {product.id}
              </Badge>
              <Badge bg="secondary" className="me-2">
                Бренд ID: {product.brandId}
              </Badge>
              <Badge bg="info">Категория ID: {product.categoryId}</Badge>
            </div>

            <div className="pricing mb-4">
              <h2 className="text-danger mb-2">
                {product.discountPrice + " "} ₽
                {product.discountPrice < product.price && (
                  <span className="ms-2 badge bg-danger">-{discount}%</span>
                )}
              </h2>
              {product.discountPrice < product.price && (
                <del className="text-muted">
                  {product.price.toLocaleString()} ₽
                </del>
              )}
            </div>

            <div className="stock-info mb-4">
              <Badge bg={product.count > 0 ? "success" : "danger"}>
                {product.count > 0
                  ? `В наличии: ${product.count} шт.`
                  : "Нет в наличии"}
              </Badge>
            </div>

            <div className="description mb-4">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductPage;
