import React, { useContext, useState } from "react";
import { Context } from "../../main";
import {
  login,
  registration,
  sendOtp,
  resetPassword,
} from "../../http/userAPI";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { user } from "../../store/userStore";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const AuthForm: React.FC = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetPass, setResetPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    try {
      if (isLoginMode) {
        await login(email, password);
        user.setUser({ email: email, password: password, role: "user" });
        user.setIsAuth(true);
        console.log(JSON.stringify(user._user));
        console.log("Успешный вход");
        navigate(Routes.SHOP_ROUTE);
      } else {
        await registration(email, password);
        user.setUser({ email: email, password: password, role: "user" });
        user.setIsAuth(true);
        console.log("Успешная регистрация");
        console.log(JSON.stringify(user._user));
        navigate(Routes.SHOP_ROUTE);
      }
    } catch (err) {
      setError("Введен неверный email или пароль");
      console.error(err);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const  res  = await resetPassword(resetEmail, resetPass, resetOtp);
      console.log(res);
      if (res.error) {
        throw new Error("Введен неверный код");
      }
      alert("Пароль изменен успешно")
    } catch (err) {
      setError("Введен неверный код");
    }
  };

  return (
    <div className="AuthWrapper">
      <h2 className="AuthTitle">{isLoginMode ? "Вход" : "Регистрация"}</h2>
      <form className="emailInput" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="AuthLine">
          <button type="submit">
            {isLoginMode ? "Войти" : "Зарегистрироваться"}
          </button>
          <h3 onClick={() => setShowResetForm(true)}>
            {isLoginMode ? "Забыли пароль?" : ""}
          </h3>
        </div>
      </form>
      <button
        className="SwitchButton"
        onClick={() => setIsLoginMode(!isLoginMode)}
      >
        Переключиться на {isLoginMode ? "регистрацию" : "вход"}
      </button>
      <Modal show={showResetForm} onHide={() => setShowResetForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Сброс пароля</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleResetSubmit}>
            <Form.Group className="mb-3 FormAndButton" controlId="resetEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <Button
                onClick={async () => {
                  sendOtp(resetEmail);
                }}
              >
                Отправить одноразовый код
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="resetOtp">
              <Form.Label>Одноразовый код</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите одноразовый код"
                value={resetOtp}
                onChange={(e) => setResetOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="resetPassword">
              <Form.Label>Новый пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите новый пароль (минимум 8 символов)"
                value={resetPass}
                onChange={(e) => setResetPassword(e.target.value)}
                required
              />
            </Form.Group>
            {resetError && <Alert variant="danger">{resetError}</Alert>}
            {resetSuccess && (
              <Alert variant="success">Пароль успешно сброшен!</Alert>
            )}
            <Button  variant="primary" type="submit" className="w-100 ResetBtn">
              Сбросить пароль
            </Button>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
});

export default AuthForm;
