import React, { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import "./FilterList.css";
import { observer } from "mobx-react-lite";
import { fetchBrands } from "../../http/productAPI";
import { products } from "../../store/productStore";
import { Brand } from "../../types/brand";

export const FilterList = observer(() => {
    const product = products;

    try {
        useEffect(() => {
            const fetchData = async () => {
                await fetchBrands().then((data) => product.setBrands(data));
            };
            fetchData();
        }, [product]);
    } catch (error) {
        console.log("Something went wrong");
    }
   const handleSettingBrand = (brand: Brand): void => {
        product.setSelectedBrand(brand);
        console.log(brand)
    };

    const brands = product._brands;
    return (
         <Dropdown className="FilterList">
             <Dropdown.Toggle  variant="outline-secondary" id="dropdown-basic">
                 {product._selectedBrand?.name || "Выберите бренд"}
             </Dropdown.Toggle>

             <Dropdown.Menu>
               {brands.map((brand) => (
                    <Dropdown.Item  key={brand.id}
                        onClick={() => handleSettingBrand(brand)}
                   >
                       {brand.name}
                   </Dropdown.Item>
                ))}
           </Dropdown.Menu>
        </Dropdown>
    );
});

export default FilterList;

