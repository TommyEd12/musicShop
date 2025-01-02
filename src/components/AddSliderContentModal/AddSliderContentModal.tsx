import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { SliderContent } from "../../types/sliderContent";
import { addSliderContent } from "../../http/sliderContent";

interface SliderContentModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (content: SliderContent) => void;
  initialContent?: SliderContent;
}

const SliderContentModal: React.FC<SliderContentModalProps> = ({
  show,
  onHide,
  onSave,
  initialContent,
}) => {
  const [content, setContent] = useState<SliderContent>({
    id: "",
    buttonTitle: "",
    buttonLink: "",
    image: "",
  });

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    } else {
      setContent({
        id: "",
        buttonTitle: "",
        buttonLink: "",
        image: "",
      });
    }
  }, [initialContent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(content);
    await addSliderContent(content);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialContent ? "Редактировать слайд" : "Добавить новый слайд"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Заголовок кнопки</Form.Label>
            <Form.Control
              type="text"
              name="buttonTitle"
              value={content.buttonTitle}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ссылка кнопки</Form.Label>
            <Form.Control
              type="url"
              name="buttonLink"
              value={content.buttonLink}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL изображения</Form.Label>
            <Form.Control
              type="url"
              name="image"
              value={content.image}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {initialContent ? "Сохранить изменения" : "Добавить слайд"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SliderContentModal;
