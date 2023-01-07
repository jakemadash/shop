import React, { useState, useEffect } from "react";
import "../style.css";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title}></img>
    </div>
  );
};

export default ProductCard;
