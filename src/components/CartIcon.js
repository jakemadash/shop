import React from "react";
import Bag from "../images/bag.svg";

const CartIcon = ({ count }) => {
  const cartView = () => {
    document.querySelector(".cart").classList.toggle("slide-in");
    document.querySelector(".overlay").classList.toggle("visible");
    document.querySelector("ul").classList.toggle("disabled");
  };

  let quantity = "  ";
  if (count > 0) quantity = count;
  return (
    <div className="menu-cart" onClick={cartView}>
      <div className="overlay"></div>
      <span className="quantity">{quantity}</span>
      <img src={Bag} alt="shopping bag" className="cart-icon"></img>
    </div>
  );
};

export default CartIcon;
