import React, { useState, useEffect } from "react";
import "../style.css";

const ProductCard = ({ item, setCount, count }) => {

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div className="product-card">
      <img src={item.image} alt={item.title}></img>
      <div>{item.title}</div>
      <div>{usd.format(item.price)}</div>
      <input type='number'></input>
      <button>Add to cart</button>
    </div>
  );
};

export default ProductCard;
