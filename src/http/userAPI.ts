import {  $host } from "./index";
import {jwtDecode} from "jwt-decode";


export const registration = async(email:string, password:string) => {
     const {data} = await $host.post('api/user/signUp', {email, password, role:'admin'})
     // localStorage.setItem('token', data.data.jar.auth.value)
}

export const login = async(email:string, password:string) => {
     let data = await $host.post('api/user/login', {email, password})
}

export const logout = async() => {
    let data = await $host.post("api/user/logout")
    return data
}
export const fetchUserByEmail = async (email: string) => {
  const { data } = await $host.get("api/user/getUserByEmail");
  return data;
};

export const profile = async () => {
     try {
       const response = await $host.get('api/user/profile', {
         withCredentials: true, 
       });
       return response.data; 
     } catch (error) {
       console.error("Ошибка при получении профиля:", error);
       throw error; 
     }
   };

// export const check = async() => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }