import React, { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import AddBrandModal from "../../components/AddBrandModal/AddBrandModal";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import ProductStore, { products } from "../../store/productStore";
import { observer } from "mobx-react-lite";
import {
  fetchBrands,
  fetchCategories,
  fetchProducts,
} from "../../http/productAPI";
import { Product } from "../../types/product";
import { Category } from "../../types/category";
import { Brand } from "../../types/brand";

const AdminPage: React.FC = observer(() => {
  const product = products;
  const allProducts = product._products;
  const allBrands = product._brands;
  const allCategories = product._categories;
  try {
    useEffect(() => {
      const fetchData = async () => {
        await fetchProducts().then((data) => product.setProducts((data)));
        await fetchBrands().then((data) => product.setBrands(data));
        await fetchCategories().then((data) => product.setTypes(data));
      };
      fetchData();
    }, [product]);
  } catch (error) {
    console.log("Something went wrong");
  }
  console.log(allBrands)
  const [newProducts, setNewProducts] = useState<Product[]>(allProducts);
  const [brands, setBrands] = useState<Brand[]>(allBrands);
  const [categories, setCategories] = useState<Category[]>(allCategories);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  
  const handleAddProduct = (newProduct: Product) => {
    setNewProducts([...newProducts, newProduct]);
    setShowAddProductModal(false);
  };

  const handleAddBrand = (newBrand: Brand) => {
    setBrands([...brands, newBrand]);
    setShowAddBrandModal(false);
  };

  const handleAddCategory = (newCategory: Category) => {
    setCategories([...categories, newCategory]);
    setShowAddCategoryModal(false);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Панель администратора</h1>
      <Row className="mb-3">
        <Col>
          <Button
            variant="primary"
            onClick={() => setShowAddProductModal(true)}
          >
            Добавить товар
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            onClick={() => setShowAddBrandModal(true)}
          >
            Добавить бренд
          </Button>
        </Col>
        <Col>
          <Button variant="info" onClick={() => setShowAddCategoryModal(true)}>
            Добавить категорию
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Цена со скидкой</th>
            <th>Количество</th>
            <th>Категория</th>
            <th>Бренд</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price} ₽</td>
              <td>{product.discountPrice} ₽</td>
              <td>{product.count}</td>
              <td>
                {categories.find((c) => c.id === product.categoryId)?.name ||
                  "Неизвестно"}
              </td>
              <td>
                {brands.find((b) => b.id === product.brandId)?.name ||
                  "Неизвестно"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddProductModal
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
        onAddProduct={handleAddProduct}
        brands={brands}
        categories={categories}
      />
      <AddBrandModal
        show={showAddBrandModal}
        onHide={() => setShowAddBrandModal(false)}
        onAddBrand={handleAddBrand}
      />
      <AddCategoryModal
        show={showAddCategoryModal}
        onHide={() => setShowAddCategoryModal(false)}
        onAddCategory={handleAddCategory}
      />
    </Container>
  );
});

export default AdminPage;
