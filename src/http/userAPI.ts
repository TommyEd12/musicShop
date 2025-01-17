import { User } from "../types/user";
import { $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post("api/user/signUp", {
    email,
    password,
  });
  // localStorage.setItem('token', data.data.jar.auth.value)
};

export const login = async (email: string, password: string) => {
  let data = await $host.post("api/user/login", { email, password });
};

export const logout = async () => {
  let data = await $host.post("api/user/logout");
  return data;
};
export const fetchUserByEmail = async (email: string) => {
  const { data } = await $host.get("api/user/getUserByEmail", {
    params: { email },
  });
  console.log(data);
  return data;
};

export const profile = async () => {
  try {
    const response = await $host.get("api/user/profile", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    throw error;
  }
};

export const sendOtp = async (email: string) => {
  try {
    await $host.post("api/user/OTP", { email });
  } catch (error) {
    console.error("Ошибка при отправке письма", error);
  }
};

export const resetPassword = async (
  email: string,
  newPassword: string,
  otp: string
) => {
  try {
    const { data } = await $host.post("api/user/resetPassword", {
      email,
      newPassword,
      otp,
    });
    return data;
  } catch (error) {
    console.error("Ошибка при смене пароля : введен неверный код", error);
  }
};

// export const check = async() => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }
