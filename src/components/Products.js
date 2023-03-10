import React from "react";

const Products = ({ products }) => {
  return (
    <div className="product-gallery" aria-label="product-gallery">
      {products}
    </div>
  );
};

export default Products;
