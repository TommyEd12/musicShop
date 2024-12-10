import { $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createOrder = async (
  userId: number,
  status: "Created" | "InProgress" | "Finished",
  address: string,
  postIndex: number
) => {
  const { data } = await $host.post("api/order", {
    userId,
    status,
    address,
    postIndex
  });
};
export const fetchOrdersByUserId = async (id: number) => {
    const { data } = await $host.get("api/order/" + id);
    return data;
};