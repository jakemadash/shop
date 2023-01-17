import React, { useState, useEffect } from "react";
import "../style.css";

const ProductCard = ({ item, updateCart }) => {
  const [quantity, setQuantity] = useState(1);

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

 const handleChange = (e) => {
  setQuantity(parseInt(e.target.value))
 }

 const handleClick = () => {
  updateCart(item.title, item.price, item.image, quantity)
 }

  return (
    <div className="product-card">
      <img src={item.image} alt={item.title}></img>
      <div className="details">
        <div>{item.title}</div>
        <div>{usd.format(item.price)}</div>
        <input
          type="number"
          defaultValue={1}
          min={1}
          onChange={handleChange}
        ></input>
      </div>
      <button onClick={handleClick}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
