import React from "react";
import Bag from "../images/bag.svg";

const CartIcon = ({ count }) => {
  const cartView = () => {
    document.querySelector(".cart").classList.toggle("slide-in");
    document.querySelector(".overlay").classList.toggle("visible");
  };

  let quantity = "  ";
  if (count > 0) quantity = count;
  return (
    <div className="menu-cart menu-item" onClick={cartView}>
      <span className="quantity" aria-label="quantity">
        {quantity}
      </span>
      <img src={Bag} alt="shopping bag" className="cart-icon"></img>
    </div>
  );
};

export default CartIcon;
