import React, { useState, useEffect, useRef } from "react";

const ProductsMenu = ({ productData, setSelectedProducts}) => {
  const handleClick = (e) => {
    if (e.target.textContent === "All") setSelectedProducts(productData);
    else {
      const filteredData = productData.filter(
        (product) => product.category === e.target.textContent.toLowerCase()
      );
      console.log(filteredData)
      setSelectedProducts(filteredData);
    }
  };

  return (
    <nav>
      <ul onClick={(e) => handleClick(e)}>
        <li>All</li>
        <li>Electronics</li>
        <li>Men's Clothing</li>
        <li>Women's Clothing</li>
      </ul>
    </nav>
  );
};

export default ProductsMenu;
