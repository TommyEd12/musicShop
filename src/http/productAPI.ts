import { Product } from "../types/product";
import { $authHost, $host } from "./index";


export const createProduct = async(product: Product) => {
    const {data} = await $authHost.post<Product>('api/device', product)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data 
}

export const fetchProducts = async () => {
    const {data} = await $host.get('api/device', )
    return data
}

export const fetchOneDevice = async(id : number) => {
    const {data} = await $host.get('api/device/' + id)
    return data

}
