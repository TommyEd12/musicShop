import React, { useState, useRef, useCallback, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import { Product } from "../../types/product";
import { Brand } from "../../types/brand";
import { Category } from "../../types/category";
import { observer } from "mobx-react-lite";
import { addProduct, changeProduct } from "../../http/productAPI";

interface ChangeProductModalProps {
  show: boolean;
  onHide: () => void;
  onAddProduct: (product: Product) => void;
  brands: Brand[];
  categories: Category[];
  initialProduct?: Product;
}

const ChangeProductModal: React.FC<ChangeProductModalProps> = observer(
  ({ show, onHide, onAddProduct, brands, categories, initialProduct }) => {
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

    useEffect(() => {
      if (initialProduct) {
        setNewProduct(initialProduct);
      } else {
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
      }
    }, [initialProduct]);

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleChange = useCallback(
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
          ...prev,
          [name]: Number.isNaN(Number(value)) ? value : Number(value),
        }));
      },
      []
    );

    const handleFileChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const files = Array.from(e.target.files);
          setSelectedFiles(files);

          const previewUrls = files.map((file) => URL.createObjectURL(file));
          setPreviewImages(previewUrls);
        }
      },
      []
    );

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        const imagePromises = selectedFiles.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        });

        try {
          let images = await Promise.all(imagePromises);
          if (initialProduct) {
            images = initialProduct.images;
          }
          const productToSubmit = { ...newProduct, images };
          onAddProduct(productToSubmit);
          if (!initialProduct) {
            await addProduct(productToSubmit);
          } else {
            await changeProduct(initialProduct.id, productToSubmit);
          }
        } catch (error) {
          console.error("Error during image processing:", error);
          alert("Failed to process images.");
          return;
        } finally {
          setSelectedFiles([]);
          setPreviewImages([]);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
        onHide();
      },
      [newProduct, selectedFiles, onAddProduct, onHide]
    );

    return (
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {initialProduct ? "Изменить товар" : "Добавить новый товар"}
          </Modal.Title>
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
              />
            </Form.Group>
            {previewImages.length > 0 && (
              <div className="mb-3">
                {previewImages.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                ))}
              </div>
            )}
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
              {initialProduct ? "Изменить" : "Добавить"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
);

export default ChangeProductModal;
