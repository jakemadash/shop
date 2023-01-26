import React, { useState } from "react";
import "../style.css";

const Cart = ({ items, total, updateCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleChange = (e, item) => {
    setQuantity(parseInt(e.target.value));
    updateCart(item.title, item.price, item.image, quantity);
  };

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let orderTotal = "";
  if (total > 0) orderTotal = usd.format(total);

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      {items.map((item, index) => {
        return (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-image"></img>
            <div>
              <div className="title">{item.title}</div>
              <div className="price">{usd.format(item.price)}</div>
              <input
                type="number"
                defaultValue={1}
                min={1}
                onChange={(e) => handleChange(e, item)}
              ></input>
            </div>
          </div>
        );
      })}
      <div>{orderTotal}</div>
      <button>Checkout</button>
    </div>
  );
};

export default Cart;
