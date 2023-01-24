import React from "react";
import Bag from '../images/bag.svg'

const CartIcon = ({count}) => {
  let quantity = ''
  if (count > 0) quantity = count
  return (
    <div className="cart-icon">
      <img src={Bag} alt="shopping bag"></img>
      {quantity}
    </div>
  );
}

export default CartIcon;
