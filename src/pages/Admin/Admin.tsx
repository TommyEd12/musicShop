import React, { useEffect, useState } from "react";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import AddBrandModal from "../../components/AddBrandModal/AddBrandModal";
import AddCategoryModal from "../../components/AddCategoryModal/AddCategoryModal";
import AddSliderContent from "../../components/AddSliderContentModal/AddSliderContentModal";
import ProductStore, { products } from "../../store/productStore";
import { observer } from "mobx-react-lite";
import {
  deleteProduct,
  fetchBrands,
  fetchCategories,
  fetchProducts,
} from "../../http/productAPI";
import { Product } from "../../types/product";
import { Category } from "../../types/category";
import { Brand } from "../../types/brand";
import { SliderContent } from "../../types/sliderContent";
import {
  deleteSliderContent,
  fetchSliderContent,
} from "../../http/sliderContent";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import { profile } from "../../http/userAPI";
import { Routes } from "../../utils/consts";

const AdminPage: React.FC = observer(() => {
  const product = products;
  const allProducts = product._products;
  const allBrands = product._brands;
  const allCategories = product._categories;
  const navigation = useNavigate();
  const [email, setEmail] = useState("");

  try {
    useEffect(() => {
      const fetchData = async () => {
        await fetchProducts().then((data) => product.setProducts(data));
        await fetchBrands().then((data) => product.setBrands(data));
        await fetchCategories().then((data) => product.setTypes(data));
        await fetchSliderContent().then((data) => setSliderContents(data));
      };
      fetchData();
    }, [product]);
  } catch (error) {
    console.log("Something went wrong");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await profile();
        if (!response) {
          const errorData = await response;
          const errorMessage = errorData?.message || response.statusText;
          console.error(
            `Ошибка при загрузке данных: ${errorMessage}`,
            errorData
          );
          navigation(Routes.LOGIN_ROUTE);
        } else {
          if (response[1] != "admin"){
            navigation(Routes.LOGIN_ROUTE);
          }
          const data = response.data;
          setEmail(data[0]);
        }
      } catch (error) {
        console.error("Произошла непредвиденная ошибка:", error);
        navigation(Routes.LOGIN_ROUTE);
      }
    };
    fetchData();
  }, [navigation]);
  const [newProducts, setNewProducts] = useState<Product[]>(allProducts);
  const [brands, setBrands] = useState<Brand[]>(allBrands);
  const [categories, setCategories] = useState<Category[]>(allCategories);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showChangeProductModal, setShowChangeProductModal] = useState(false);
  const [showSliderContentModal, setShowSliderContentModal] = useState(false);
  const [editingSliderContent, setEditingSliderContent] =
    useState<SliderContent | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sliderContents, setSliderContents] = useState<SliderContent[]>([]);

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
  const handleChangeProduct = (updatedProduct: Product) => {
    const updatedProducts = newProducts.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );

    setNewProducts(updatedProducts);
    setShowChangeProductModal(false);
    setSelectedProduct(null);
  };
  const handleOpenChangeProductModal = (productToChange: Product) => {
    setSelectedProduct(productToChange);
    setShowAddProductModal(true);
  };
  const handleSaveSliderContent = (content: SliderContent) => {
    if (content.id === "") {
      // Add new slider content
      const newContent = { ...content, id: sliderContents.length + 1 };
      setSliderContents([...sliderContents, newContent]);
    } else {
      // Update existing slider content
      setSliderContents(
        sliderContents.map((item) => (item.id === content.id ? content : item))
      );
    }
    setEditingSliderContent(null);
  };

  const handleEditSliderContent = (content: SliderContent) => {
    setEditingSliderContent(content);
    setShowSliderContentModal(true);
  };

  const handleDeleteSliderContent = async (id: number) => {
    setSliderContents(sliderContents.filter((item) => item.id !== id));
    await deleteSliderContent(id);
  };
  const handleDeleteProduct = async (id: number) => {
    setNewProducts(newProducts.filter((item) => item.id !== id));
    await deleteProduct(id);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Панель администратора</h1>
      <Row className="mb-3 buttonRow">
        <Col className="buttonCol">
          <Button
            variant="primary"
            onClick={() => setShowAddProductModal(true)}
          >
            Добавить товар
          </Button>
        </Col>
        <Col className="buttonCol">
          <Button
            variant="secondary"
            onClick={() => setShowAddBrandModal(true)}
          >
            Добавить бренд
          </Button>
        </Col>
        <Col className="buttonCol">
          <Button variant="info" onClick={() => setShowAddCategoryModal(true)}>
            Добавить категорию
          </Button>
        </Col>
        <Col className="buttonCol">
          <Button
            variant="success"
            onClick={() => {
              setEditingSliderContent(null);
              setShowSliderContentModal(true);
            }}
          >
            Добавить слайд
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Цена до скидки</th>
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
              <td className="btns">
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleOpenChangeProductModal(product)}
                >
                  Изменить
                </Button>
                <Button
                  className="deleteButton"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id as number)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2 className="mt-5 mb-3">Слайдер</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок кнопки</th>
            <th>Ссылка кнопки</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sliderContents.map((content) => (
            <tr key={content.id}>
              <td>{content.id}</td>
              <td>{content.buttonTitle}</td>
              <td>{content.buttonLink}</td>
              <td>{content.image}</td>
              <td>
                <Button
                  className="deleteButton"
                  size="sm"
                  onClick={() =>
                    handleDeleteSliderContent(content.id as number)
                  }
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddProductModal
        show={showAddProductModal}
        onHide={() => {
          setShowAddProductModal(false);
          if (selectedProduct) setSelectedProduct(null);
        }}
        onAddProduct={handleAddProduct}
        initialProduct={selectedProduct ?? undefined}
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
      <AddSliderContent
        show={showSliderContentModal}
        onHide={() => {
          setShowSliderContentModal(false);
          setEditingSliderContent(null);
        }}
        onSave={handleSaveSliderContent}
        initialContent={editingSliderContent || undefined}
      />
    </Container>
  );
});

export default AdminPage;
