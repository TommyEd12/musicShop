import { Brand } from "../types/brand";
import { Category } from "../types/category";
import { Product } from "../types/product";
import { $host } from "./index";

// export const createProduct = async (product: Product) => {
//   const { data } = await $authHost.post<Product>("api/device", product);
//   return data;
// };

export const fetchCategories = async () => {
  const { data } = await $host.get("api/category");
  return data;
};
export const addCategory = async (category: Category) => {
  const { data } = await $host.post("api/category", category);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};
export const fetchOneBrand = async (id: number) => {
  const { data } = await $host.get("api/brand/" + id);
  return data;
};
export const fetchOneCategory = async (id: number) => {
  const { data } = await $host.get("api/category/" + id);
  return data;
};
export const addBrand = async (brand: Brand) => {
  const { data } = await $host.post("api/brand", brand);
  return data;
};

export const search = async (text: string) => {
  const { data } = await $host.get("api/product/search", {
    params: { search: text },
  });
  return data;
};

export const fetchProducts = async () => {
  const { data } = await $host.get("api/product");
  return data;
};

export const fetchOneProduct = async (id: number) => {
  const { data } = await $host.get("api/product/" + id);
  return data;
};

export const addProduct = async (product: Product) => {
  const { data } = await $host.post("api/product/", product);
  return data;
};
export const changeProduct = async (id: number, product: Product) => {
  const { data } = await $host.patch("api/product/" + id, product);
  return data;
};
