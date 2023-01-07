import React, { useState, useEffect } from "react";

const ProductCard = ({image, title}) => {
  return (
    <div>
      <img src={image} alt={title}></img>
    </div>
  );
};

export default ProductCard;
