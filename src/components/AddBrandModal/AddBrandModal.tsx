import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Brand } from "../../types/brand";

interface AddBrandModalProps {
  show: boolean;
  onHide: () => void;
  onAddBrand: (brand: Brand) => void;
}

const AddBrandModal: React.FC<AddBrandModalProps> = ({
  show,
  onHide,
  onAddBrand,
}) => {
  const [newBrand, setNewBrand] = useState<Brand>({
    id: "",
    name: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBrand(newBrand);
    setNewBrand({ id: "", name: "", image: "" });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новый бренд</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название бренда</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newBrand.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL изображения бренда</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={newBrand.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Добавить бренд
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBrandModal;
