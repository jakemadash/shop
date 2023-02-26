import React from "react";
import Trash from "../images/trash.svg";

const Cart = ({ items, total, updateCart, deleteFromCart }) => {
  const closeCart = () => {
    document.querySelector(".cart").classList.toggle("slide-in");
    document.querySelector(".overlay").classList.toggle("visible");
    document.querySelector("ul").classList.toggle("disabled");
  };

  const handleChange = (e, item) => {
    if (parseInt(e.target.value) === 0 || e.target.className === "trash")
      deleteFromCart(item.title, item.price, item.quantity);
    else {
      const quantityChange = parseInt(e.target.value) - item.quantity;
      updateCart(item.title, item.price, item.image, quantityChange);
    }
  };

  const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let orderTotal = "$0.00";
  if (total > 0) orderTotal = usd.format(total);

  return (
    <div className="cart">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items-container" aria-label="cart">
        {items.map((item, index) => {
          return (
            <div key={index} className="cart-item" aria-label="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-image"
              ></img>
              <div
                className="cart-item-details"
                aria-label={usd.format(item.price)}
              >
                <div className="title">{item.title}</div>
                <div className="price">{usd.format(item.price)}</div>
                <div className="cart-item-controls">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, item)}
                    onKeyDown={(e) => e.preventDefault()}
                  ></input>
                  <img
                    src={Trash}
                    alt="trash"
                    className="trash"
                    onClick={(e) => handleChange(e, item)}
                  ></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total" aria-label="total">
        Total: {orderTotal}
      </div>
      <button>Checkout</button>
      <button className="close-button" onClick={closeCart} aria-label="close">
        Close
      </button>
    </div>
  );
};

export default Cart;
