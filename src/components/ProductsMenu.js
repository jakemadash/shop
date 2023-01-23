import React, { useState, useEffect, useRef } from "react";

const ProductsMenu = ({productData, setProductData}) => {
  return (
    <nav>
      <ul>
        <li>
          All
        </li>
        <li>
          Electronics
        </li>
        <li>
          Men's Clothing
        </li>
        <li>
          Women's Clothing
        </li>
      </ul>
    </nav>
  );
};

export default ProductsMenu;
