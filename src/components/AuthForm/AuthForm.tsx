import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { login, registration } from "../../http/userAPI";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import {Routes} from "../../utils/consts"
import { observer } from "mobx-react-lite";
import { user } from "../../store/userStore";


const AuthForm: React.FC = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate()




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
        navigate(Routes.SHOP_ROUTE)
      } else {
        await registration(email, password);
        user.setUser({ email: email, password: password, role: "user" });
        user.setIsAuth(true);
        console.log("Успешная регистрация");
        console.log(JSON.stringify(user._user));
        navigate(Routes.SHOP_ROUTE)
      }
    } catch (err) {
      setError("Введен неверный email или пароль");
      console.error(err);
    }
  };

  return (
    <div className="AuthWrapper">
      <h2>{isLoginMode ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">
          {isLoginMode ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
      <button onClick={() => setIsLoginMode(!isLoginMode)}>
        Переключиться на {isLoginMode ? "регистрацию" : "вход"}
      </button>
    </div>
  );
});

export default AuthForm;
