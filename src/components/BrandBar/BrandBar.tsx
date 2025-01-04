import React, { useEffect, useState } from "react";
import "./BrandBar.css";
import { Container } from "react-bootstrap";
import espLogo from "../../assets/esp.jpg";
import shureLogo from "../../assets/shure.png";
import { fetchBrands } from "../../http/productAPI";
import { Brand } from "../../types/brand";

export default function BrandBar() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchBrands().then((data) => setBrands(data));
    };
    fetchData();
  }, []);
  return (
    <div className="BrandBarContainer">
      <div className="BrandBarSlide">
        {brands.map((brand) => (
          <img className="BrandLogo" src={brand.image}></img>
        ))}
      </div>
    </div>
  );
}
