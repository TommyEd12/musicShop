import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Product } from "../../types/product";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import { addProduct } from "../../http/productAPI";
import { observer } from "mobx-react-lite";

interface AddProductModalProps {
  show: boolean;
  onHide: () => void;
  onAddProduct: (product: Product) => void;
  brands: Brand[];
  categories: Category[];
}

const AddProductModal: React.FC<AddProductModalProps> = observer(
  ({ show, onHide, onAddProduct, brands, categories }) => {
    const [newProduct, setNewProduct] = useState<Product>({
      id: "",
      name: "",
      price: 0,
      discountPrice: 0,
      count: 0,
      description: "",
      categoryId: 0,
      brandId: 0,
      images: [],
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setNewProduct((prev) => ({
        ...prev,
        [name]: Number.isNaN(Number(value)) ? value : Number(value),
      }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedFiles([...e.target.files]); // Сохраняем выбранные файлы в состоянии
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Convert files to data URLs
      const filePromises = selectedFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises).then((images) => {
        const productToSubmit = {
          ...newProduct,
          images, // Добавляем массив base64 encoded images
        };
        onAddProduct(productToSubmit);
        addProduct(productToSubmit); // Add to backend
        setNewProduct({
          id: "",
          name: "",
          price: 0,
          discountPrice: 0,
          count: 0,
          description: "",
          categoryId: 0,
          brandId: 0,
          images: [],
        });
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file selection
      });
    };

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить новый товар</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Цена</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Цена со скидкой</Form.Label>
              <Form.Control
                type="number"
                name="discountPrice"
                value={newProduct.discountPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Количество</Form.Label>
              <Form.Control
                type="number"
                name="count"
                value={newProduct.count}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Изображения</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Категория</Form.Label>
              <Form.Select
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Выберите категорию</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Бренд</Form.Label>
              <Form.Select
                name="brandId"
                value={newProduct.brandId}
                onChange={handleChange}
                required
              >
                <option value="">Выберите бренд</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Добавить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
);

export default AddProductModal;
