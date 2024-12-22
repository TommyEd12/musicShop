import { Product } from "../types/product";
import {  $host } from "./index";

// export const createProduct = async (product: Product) => {
//   const { data } = await $authHost.post<Product>("api/device", product);
//   return data;
// };

export const fetchCategories = async () => {
  const { data } = await $host.get("api/category");
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const search = async (text: string)=>{
  const {data} = await $host.get("api/product/search", {params:{search: text}})
  return data
}

export const fetchProducts = async () => {
  const { data } = await $host.get("api/product");
  return data;
};

export const fetchOneProduct = async (id: number) => {
  const { data } = await $host.get("api/product/" + id);
  return data;
};

export const addProduct = async (product: Product) =>{
 const {data} = await $host.post("api/product/", product)
 return data
}
