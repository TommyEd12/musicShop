import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Order } from "../../types/order";
import { products } from "../../store/productStore"; // Импортируем productStore
import { useNavigate } from "react-router-dom";
import { publicRoutes } from "../../routes";
import { Routes } from "../../utils/consts";

const OrderCreationPage: React.FC = () => {
  const [address, setAddress] = useState("");
  const navigation = useNavigate();
  const [postIndex, setPostIndex] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const cartItems = products._selectedProducts; // Получаем товары из productStore

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!address || !postIndex) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    if (!/^\d{6}$/.test(postIndex)) {
      setError("Почтовый индекс должен состоять из 6 цифр");
      return;
    }

    const newOrder: Omit<Order, "id" | "userId"> = {
      status: "Created",
      address,
      postIndex: parseInt(postIndex, 10),
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.count,
        name: item.name,
        price: item.price,
      })), // Добавляем массив товаров в заказ
    };

    console.log("Создан новый заказ:", newOrder);
    setSuccess(true);

    setAddress("");
    setPostIndex("");
  };

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Создание заказа</h1>
      {success && <Alert variant="success">Заказ успешно создан!</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Адрес доставки</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Введите адрес доставки"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPostIndex">
          <Form.Label>Почтовый индекс</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите 6-значный почтовый индекс"
            value={postIndex}
            onChange={(e) => setPostIndex(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <h2>Товары в заказе:</h2>
        {cartItems.length > 0 ? (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                {item.name} x {item.count} ={" "}
                {(item.price * item.count).toLocaleString()} ₽
              </ListGroup.Item>
            ))}
            <ListGroup.Item>
              Итого: {totalSum.toLocaleString()} ₽
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <p>В корзине нет товаров.</p>
        )}

        <Button variant="primary" type="submit">
          Создать заказ
        </Button>
      </Form>
    </Container>
  );
};

export default OrderCreationPage;
