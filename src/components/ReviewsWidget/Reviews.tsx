import React from "react";
import "./Reviews.css";

export default function Reviews() {
  return (
    <div className="WidgetContainer">
      <iframe
        className="WidgetFrame"
        src="https://yandex.ru/maps-reviews-widget/16582718810?comments"
      ></iframe>
      <a
        className="WidgetLink"
        href="https://yandex.ru/maps/org/muz_ko/16582718810/"
        target="_blank"
      >
        Муз&Ко на карте Перми — Яндекс Карты
      </a>
    </div>
  );
}
