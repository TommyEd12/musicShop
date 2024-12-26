import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Carousel,
  Badge,
  Button,
  Image,
} from "react-bootstrap";
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
import MessageImage from "../../assets/message.jpg";
import DeliveryImage from "../../assets/Ym1oM9fN6Qg.jpg";

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
        <img className="BrandImage" src={brand.image}></img>
        <Row className="FirstRow">
          <Col md={6} className="FirstColumn">
            <img
              src={currentImage}
              alt={product.name}
              className="img-fluid CurrentImage"
            />
            <Row className="mt-2 PreviewImages">
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
            <Row className="Contact">
              <Col className="Col" md={6}>
                <img src={MessageImage}></img>
                <p>Напишите нам! Проведем онлайн консультацию по товару</p>
              </Col>
              <Col className="Col" md={6}>
                <img src={DeliveryImage}></img>
                <p>
                  После заказа с вами свяжется наш менеджер для уточнения
                  информации по доставке
                </p>
              </Col>
              <Button className="Consultation" href="https://vk.com/im?media=&sel=-199111409" target="_blank">Онлайн консультация</Button>
            </Row>
            
          </Col>
          <Col className="ProductInfo" md={6}>
            <h1>{product.name}</h1>
            <div>
              <h2>{product.discountPrice} ₽</h2>
              {product.price && <h3>{product.price}₽</h3>}
              <h2 className="Discount">{discount}%</h2>
              <Button className="AddToCart" onClick={handleAddToCart}>
                В корзину
              </Button>
            </div>
            <p className="Delivery">Бесплатаная доставка по г.Пермь</p>
            <p className="details">
              <strong>Бренд</strong>: {brand.name}
            </p>
            <p className="details">
              <strong>Категория</strong>: {category.name}
            </p>
            <p className="details">
              <strong>В наличии: </strong> {product.count} шт
            </p>
            <p className="Description">{product.description}</p>
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
