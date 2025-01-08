import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Product } from "../../types/product";
import ProductStore, { products } from "../../store/productStore";
import "./Basket.css";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/consts";

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const navigation = useNavigate();

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };
  useEffect(() => {
    const initialCartItems = products._selectedProducts.map((product) => ({
      ...product,
      count: 1,
    }));
    setCartItems(initialCartItems);
    products.setSelectedGoods(initialCartItems);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? { ...item, count: Math.max(1, item.count + change) }
        : item
    );
    setCartItems(updatedCartItems);
    products.setSelectedGoods(updatedCartItems);
  };

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <div className="basketWrapper">
      <Container className="basketCont mt-5">
        {showNotification && (
          <div className="notification">{showNotification}</div>
        )}{" "}
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            Здесь пока пусто, выберите товары из нашего каталога
          </div>
        ) : (
          <Row>
            <Col md={8}>
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="mb-3 itemCont">
                    <Row className="align-items-center">
                      <Col xs={2} md={2}>
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="img-fluid rounded"
                        />
                      </Col>
                      <Col xs={3} md={3}>
                        <h5 className="ItemTitle">
                          {item.name.slice(0, 12)}...
                        </h5>
                      </Col>
                      <Col lg={true} xs={3} md={2}>
                        <div className="d-flex align-items-center quantityDiv">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.count}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col xs={2} md={2} className="text-end">
                        <p className="mb-0 ItemPrice">
                          {item.price * item.count} ₽
                        </p>
                      </Col>
                      <Col xs={2} md={3} className="text-end">
                        <Button
                          variant="outline-danger"
                          className="removeButton"
                          size="sm"
                          onClick={() => {
                            removeFromCart(item.id),
                              products.deleteSelectedProduct(item.id);
                          }}
                        >
                          Удалить
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className="cardInfo">
                <Card.Body>
                  <Card.Title>Итого</Card.Title>
                  <Card.Text className="fs-4">
                    {totalSum.toLocaleString()} ₽
                  </Card.Text>
                  <Button
                    onClick={() => navigation(Routes.ORDER_CREATING)}
                    variant="primary"
                    className="w-100 btn"
                  >
                    Оформить заказ
                  </Button>
                  <Card.Text className="fs-5 cardText">
                    После офомления и оплаты заказа с вами свяжется наш
                    менеджер, для уточнения адреса доставки и расчета стоимости
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ShoppingCartPage;
