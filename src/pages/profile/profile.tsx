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

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: number;
  totalRubles: number;
  items: OrderItem[];
  status: "Pending" | "Shipped" | "Delivered";
}

const ProfilePage: React.FC = observer(() => {
  const navigation = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await profile();
        if (!response) {
          const errorData = await response;
          const errorMessage = errorData?.message || response.statusText;
          console.error(
            `Ошибка при загрузке данных: ${errorMessage}`,
            errorData
          );
          navigation(Routes.LOGIN_ROUTE);
        } else {
          const data = response.data;
          setEmail(data);
        }
      } catch (error) {
        console.error("Произошла непредвиденная ошибка:", error);
        navigation(Routes.LOGIN_ROUTE);
      }
    };
    fetchData();
  }, [navigation]);
  useEffect(() => {
    const checkRole = async () => {
      if (email) {
        const response = await fetchUserByEmail(email);
        const curUser = response.data[0];
        if (curUser.role === "admin") {
          setIsRedirecting(true);
          user.setUser(curUser);
          navigation(Routes.ADMIN_ROUTE);
        }
      }
    };
    checkRole();
  }, [email]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      totalRubles: 3750,
      items: [
        { name: "Smartphone", quantity: 1 },
        { name: "Phone Case", quantity: 2 },
      ],
      status: "Delivered",
    },
    {
      id: 2,
      totalRubles: 5600,
      items: [
        { name: "Laptop", quantity: 1 },
        { name: "Mouse", quantity: 1 },
      ],
      status: "Shipped",
    },
    {
      id: 3,
      totalRubles: 8900,
      items: [
        { name: "Headphones", quantity: 1 },
        { name: "Keyboard", quantity: 1 },
        { name: "Monitor", quantity: 1 },
      ],
      status: "Pending",
    },
  ]);

  return (
    <div className="profileWrapper">
      <Container className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Header
                style={{ backgroundColor: "rgb(65, 211, 65)", color: "white" }}
              >
                <h2>Мой профиль</h2>
                <h2>Почта: {email}</h2>
              </Card.Header>
              <Card.Body>
                <h3>Заказы</h3>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Номер заказа</th>
                      <th>Сумма (₽)</th>
                      <th>Товары</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.totalRubles.toLocaleString()} ₽</td>
                        <td>
                          <ul className="list-unstyled mb-0">
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.name} (x{item.quantity})
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "Delivered"
                                ? "bg-success"
                                : order.status === "Shipped"
                                ? "bg-info"
                                : "bg-warning"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button
                  variant="danger"
                  onClick={(e: any) => {
                    logout();
                    navigation(Routes.LOGIN_ROUTE);
                  }}
                  className="mt-3"
                >
                  Выйти
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default ProfilePage;
