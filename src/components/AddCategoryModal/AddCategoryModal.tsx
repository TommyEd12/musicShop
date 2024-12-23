import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Category } from "../../types/category";
import { addCategory } from "../../http/productAPI";

interface AddCategoryModalProps {
  show: boolean;
  onHide: () => void;
  onAddCategory: (category: Category) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  show,
  onHide,
  onAddCategory,
}) => {
  const [newCategory, setNewCategory] = useState<Category>({
    id: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory(newCategory);
    await addCategory(newCategory);
    setNewCategory({ id: "", name: "" });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новую категорию</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название категории</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Добавить категорию
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryModal;
