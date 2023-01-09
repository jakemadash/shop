import React from "react";

const CartIcon = ({count}) => {
  let quantity = ''
  if (count > 0) quantity = count
  return (
    <div className="App">
      <h1>Cart {quantity}</h1>
    </div>
  );
}

export default CartIcon;
