import React, { useState } from "react";
import "../style.css";

const ProductCard = ({ item, updateCart }) => {
  const [quantity, setQuantity] = useState(1);

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const handleChange = (e) => {
    if (e.target.value === "") setQuantity(null);
    else setQuantity(parseInt(e.target.value));
  };

  const handleClick = () => {
    updateCart(item.title, item.price, item.image, quantity);
  };

  return (
    <div className="product-card" aria-label={item.title}>
      <img src={item.image} alt={item.title}></img>
      <div className="title">{item.title}</div>
      <div className="price">{usd.format(item.price)}</div>
      <label for="">
        <input
          type="number"
          id={item.title}
          defaultValue={1}
          min={1}
          onChange={handleChange}
        ></input>
      </label>
      <button onClick={handleClick}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
