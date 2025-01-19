import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Order } from "../../types/order";
import { products } from "../../store/productStore";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/consts";
import "./orderCreatingPage.css";
import {
  createOrder,
  createOrderProduct,
  fetchOrders,
  fetchOrdersByUserId,
} from "../../http/orderAPI";
import { jwtDecode } from "jwt-decode";
import { fetchUserByEmail, profile } from "../../http/userAPI";

const OrderCreationPage: React.FC = () => {
  const [address, setAddress] = useState("");
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [postIndex, setPostIndex] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const cartItems = products._selectedProducts;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await profile();
        if (!response || !response.data) {
          const errorData = await response;
          const errorMessage =
            errorData?.message || response?.statusText || "Unknown error";
          console.error(
            `Ошибка при загрузке данных профиля: ${errorMessage}`,
            errorData
          );
          navigation(Routes.LOGIN_ROUTE);
          return;
        }
        setEmail(response.data[0]);
      } catch (error) {
        console.error(
          "Произошла непредвиденная ошибка при загрузке профиля:",
          error
        );
        navigation(Routes.LOGIN_ROUTE);
        return;
      }
    };

    const fetchUserData = async () => {
      if (!email) {
        console.warn("Email не получен");
        return;
      }
      try {
        const data = await fetchUserByEmail(email);
        setUserId(data.data[0].id);
      } catch (error) {
        console.error(
          "Произошла непредвиденная ошибка при загрузке данных пользователя:",
          error
        );
      }
    };
    const fetchOrderId = async () => {
      const orderIdData = await fetchOrders();
      console.log(orderIdData);
      setOrderId(orderIdData.length + 1);
    };

    const combinedFetch = async () => {
      await fetchData();
      await fetchUserData();
      await fetchOrderId();
    };
    combinedFetch();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    if (!userId) {
      setError("Пользователь не авторизован");
      return;
    }

    try {
      // Create order
      const orderData = await createOrder(
        userId,
        "Created",
        address,
        parseInt(postIndex)
      );

      console.log(orderId);

      for (const item of cartItems) {
        await createOrderProduct({
          id: "",
          orderId: orderId,
          productId: item.id,
          quantity: item.count,
        });
      }

      setSuccess(true);
      setAddress("");
      setPostIndex("");
      products.setSelectedGoods([]);
    } catch (error) {
      setError(
        "Произошла ошибка при создании заказа. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  const totalSum = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <Container className="mt-5 ordCont">
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
              <ListGroup.Item className="productRow" key={item.id}>
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

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={cartItems.length === 0}
        >
          Создать заказ
        </Button>
      </Form>
    </Container>
  );
};

export default OrderCreationPage;
