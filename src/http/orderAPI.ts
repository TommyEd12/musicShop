import { Order } from "../types/order";
import { orderProduct } from "../types/orderProduct";
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
    postIndex,
  });
};
export const fetchOrdersByUserId = async (id: number) => {
  const { data } = await $host.get("api/order/" + id);
  return data;
};
export const createOrderProduct = async (orderProduct: orderProduct) => {
  const { data } = await $host.post("api/orderProducts/", orderProduct);
  return data;
};
export const fetchOrders = async (): Promise<Order[]> => {
  const { data } = await $host.get("api/order");
  return data;
};
