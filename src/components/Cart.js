import React from "react";
import "../style.css";

const Cart = ({ items, total, addToCart, deleteFromCart }) => {
  const closeCart = () => {
    document.querySelector(".cart").classList.toggle("slide-in");
    document.querySelector(".overlay").classList.toggle("visible");
    document.querySelector("ul").classList.toggle("disabled");
  };

  const handleChange = (e, item) => {
    if (parseInt(e.target.value) === 0) deleteFromCart(item.title, item.price);
    else {
      const quantityChange = parseInt(e.target.value) - item.quantity;
      addToCart(item.title, item.price, item.image, quantityChange);
    }
  };

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let orderTotal = "";
  if (total > 0) orderTotal = usd.format(total);

  return (
    <div className="cart invisible">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items-container">
        {items.map((item, index) => {
          return (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-image"
              ></img>
              <div className="cart-item-details">
                <div className="title">{item.title}</div>
                <div className="price">{usd.format(item.price)}</div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, item)}
                ></input>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total">Total: {orderTotal}</div>
      <button>Checkout</button>
      <button className="close-button" onClick={closeCart}>
        Close
      </button>
    </div>
  );
};

export default Cart;
