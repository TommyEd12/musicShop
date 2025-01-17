import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import { Context } from "../../main";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../../hooks/UseAppContext";
import { fetchUserByEmail, logout, profile } from "../../http/userAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes } from "../../utils/consts";
import { User } from "../../types/user";
import { user } from "../../store/userStore";
import { fetchOrdersByUserId, fetchOrderProducts } from "../../http/orderAPI";
import { Order } from "../../types/order";
import { orderProduct } from "../../types/orderProduct";
import { Product } from "../../types/product";
import { fetchProducts } from "../../http/productAPI";

interface OrderWithTotal extends Order {
  totalPrice: number;
  products: (orderProduct & { productDetails?: Product })[];
}
const ProfilePage: React.FC = observer(() => {
  const navigation = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderWithTotal[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);

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
    fetchData();
  }, [navigation]);

  useEffect(() => {
    const checkRole = async () => {
      if (email) {
        try {
          const response = await fetchUserByEmail(email);

          const curUser = response.data[0];
          const usersOrders = await fetchOrdersByUserId(curUser.id);
          const fetchedProducts = await fetchProducts();
          setProductsList(fetchedProducts);

          const ordersWithTotals = await Promise.all(
            usersOrders.map(async (order) => {
              const orderProducts = await fetchOrderProducts(order.orderId);
              const productsWithDetails = orderProducts.map((item) => ({
                ...item,
                productDetails: fetchedProducts.find(
                  (p) => p.id === item.productId
                ),
              }));
              const totalPrice = productsWithDetails.reduce((sum, item) => {
                const price = item?.productDetails?.price || 0;
                return sum + price * item.quantity;
              }, 0);

              return { ...order, totalPrice, products: productsWithDetails };
            })
          );

          setOrders(ordersWithTotals);

          if (curUser.role === "admin") {
            setIsRedirecting(true);
            user.setUser(curUser);
            navigation(Routes.ADMIN_ROUTE);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          navigation(Routes.LOGIN_ROUTE);
        }
      }
    };
    checkRole();
  }, [email, navigation]);

  return (
    <Container className="profile">
      <h2 className="my-4">Мои заказы</h2>
      {orders.length === 0 ? (
        <p className="noOrders">У вас пока нет заказов.</p>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="orderCard mb-3">
            <Card.Body>
              <Card.Title className="title">Заказ № {order.orderId}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Статус: {order.status}
              </Card.Subtitle>
              <Card.Text>Итоговая сумма: {order.totalPrice}</Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((item) => (
                    <tr key={item.id}>
                      <td>{item?.productDetails?.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item?.productDetails?.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ))
      )}
      <Button
        variant="danger"
        onClick={(e: any) => {
          logout();
          navigation(Routes.LOGIN_ROUTE);
        }}
        className="mt-3 logoutButton"
      >
        Выйти
      </Button>
    </Container>
  );
});

export default ProfilePage;
