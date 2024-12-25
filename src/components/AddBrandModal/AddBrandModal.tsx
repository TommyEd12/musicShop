import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Brand } from "../../types/brand";
import { addBrand } from "../../http/productAPI";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      //  console.log(e.target.files[0])
    } else{
     setSelectedFile(null)
    }
  };


 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (!selectedFile) {
          alert('Выберите изображение!');
           return;
         }
        try{
             const imagePromise = new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                   reader.onload = () => resolve(reader.result as string);
                   reader.onerror = reject;
                  reader.readAsDataURL(selectedFile);
            });
          const image = await imagePromise;
           const brandToSubmit = { ...newBrand, image };

          onAddBrand(brandToSubmit);
          await addBrand(brandToSubmit);
            setNewBrand({ id: "", name: "", image: "" });
           setSelectedFile(null); // Reset file
        }
        catch (error) {
          console.error("Error processing image", error);
          alert("Произошла ошибка при загрузке изображения.");
        }
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
            <Form.Label>изображение бренда</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
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
