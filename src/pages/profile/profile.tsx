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
    const fetchDataAndUser = async () => {
      try {
        // 1. Получаем данные профиля и устанавливаем email
        const profileResponse = await profile();
        if (
          !profileResponse ||
          !profileResponse.data ||
          profileResponse.data.length === 0
        ) {
          const errorMessage =
            profileResponse?.message ||
            profileResponse?.statusText ||
            "Unknown error";
          console.error(
            `Ошибка при загрузке данных профиля: ${errorMessage}`,
            profileResponse
          );
          navigation(Routes.LOGIN_ROUTE);
          return;
        }
        const fetchedEmail = profileResponse.data[0];
        setEmail(fetchedEmail);

        // 2. Получаем данные пользователя и заказы, если email получен успешно
        if (fetchedEmail) {
          const userResponse = await fetchUserByEmail(fetchedEmail);
          if (
            userResponse &&
            userResponse.data &&
            userResponse.data.length > 0
          ) {
            const curUser = userResponse.data[0];
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
          } else {
            console.error(
              "Не удалось получить данные пользователя по email.",
              userResponse
            );
          }
        } else {
          console.warn("Email не получен из профиля.");
        }
      } catch (error) {
        console.error(
          "Произошла непредвиденная ошибка при загрузке профиля или пользователя:",
          error
        );
        navigation(Routes.LOGIN_ROUTE);
      }
    };

    fetchDataAndUser();
  }, [navigation, user]);

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
