import React from "react";
import Bag from "../images/bag.svg";

const CartIcon = ({ count }) => {
  let quantity = "  ";
  if (count > 0) quantity = count;
  return (
    <div className="menu-cart">
      <span className="quantity">{quantity}</span>
      <img src={Bag} alt="shopping bag" className="cart-icon"></img>
    </div>
  );
};

export default CartIcon;
