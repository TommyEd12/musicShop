import { makeAutoObservable } from "mobx";
import { Product } from "../types/product";
import { Category } from "../types/category";
import { Brand } from "../types/brand";

export default class ProductStore {
  _categories: Category[];
  _brands: Brand[];
  _products: Product[];
  _selectedCategory: Category;
  _selectedBrand: Brand;
  _page: number;
  _totalCount: number;
  _limit: number;
  constructor() {
    this._categories = [];
    this._brands = [];
    this._products = [];
    this._selectedCategory = { id: 0, name: "" };
    this._selectedBrand = { id: 0, name: "", image: "" };
    this._page = 1;
    this._totalCount = 0;
    this._limit = 2;
    makeAutoObservable(this);
  }

  setTypes(categories : Category[]) {
    this._categories = categories;
  }

  setBrands(brands: Brand[]) {
    this._brands = brands;
  }
  setProducts(products: Product[]) {
    this._products = products;
    console.log(this._products)
  }

  setSelectedCategory(category: Category) {
    this.setPage(1);
    this._selectedCategory = category;
  }
  setSelectedBrand(brand: Brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page: number) {
    this._page = page;
  }
  setTotalCount(count: number) {
    this._totalCount = count;
  }

  get types() {
    return this._categories;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._categories;
  }
  get selectedType() {
    return this._selectedCategory;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}

export const products = new ProductStore()