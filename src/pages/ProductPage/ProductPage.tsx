import React, { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Badge, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import {
  fetchOneBrand,
  fetchOneCategory,
  fetchOneProduct,
} from "../../http/productAPI";
import { Product } from "../../types/product";
import "./ProductPage.css";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import { products } from "../../store/productStore";

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [brand, setBrand] = useState<Brand>({
    id: 100000,
    name: "неизвестен",
    image: "",
  });
  const [category, setCategory] = useState<Category>({
    id: 100000,
    name: "неизвестна",
  });
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState<string | null>(null); // Состояние для текущего изображения

  if (!id) {
    throw new Error();
  }

  const Id = parseInt(id);

  useEffect(() => {
    if (!id) {
      setError("Неверный ID товара!");
      setLoading(false);
      return;
    }
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchOneProduct(Id);
        if (!productData || productData.length === 0) {
          throw new Error("Товар не найден!");
        }
        const currentProduct = productData[0];
        setProduct(currentProduct);
        setCurrentImage(currentProduct.images[0]); // Устанавливаем первое изображение как текущее

        const brandData = await fetchOneBrand(currentProduct.brandId);
        if (!brandData || brandData.length === 0) {
          throw new Error("Бренд не найден!");
        }
        setBrand(brandData[0]);

        const categoryData = await fetchOneCategory(currentProduct.categoryId);
        if (!categoryData || categoryData.length === 0) {
          throw new Error("Категория не найдена!");
        }
        setCategory(categoryData[0]);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Произошла неизвестная ошибка при загрузке данных");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);
  const handleAddToCart = () => {
    products.setSelectedProducts(product!);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };
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
    <div className="ContainerWrapper">
      <Container className="mt-5 ItemCont">
        <Row>
          <Col md={6} className="FirstColumn">
            <img
              src={currentImage}
              alt={product.name}
              className="img-fluid CurrentImage"
            />
            <Row className="mt-2">
              {product.images.map((image) => (
                <Col key={image} md={3}>
                  <img
                    src={image}
                    alt={product.name}
                    className="img-thumbnail ItemImage"
                    onClick={() => setCurrentImage(image)}
                    style={{ cursor: "pointer" }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col className="ProductInfo" md={6}>
            <h1>{product.name}</h1>
            <div>
              <h2>{product.discountPrice} ₽</h2>
              {product.price && <h3>{product.price}₽</h3>}
              <Button className="AddToCart" onClick={handleAddToCart}>
                В корзину
              </Button>
            </div>

            <p>{product.description}</p>
            <p>Бренд: {brand.name}</p>
            <p>Категория: {category.name}</p>
          </Col>
        </Row>
      </Container>
      {showNotification && (
        <div className="notification">Товар добавлен в корзину!</div>
      )}
    </div>
  );
};

export default ProductPage;
