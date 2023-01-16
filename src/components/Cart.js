import React, { useState, useEffect } from "react";
import "../style.css";

const Cart = ({ items }) => {
  console.log(items);
  return [
    items.map((item, index) => {
      return (
        <div key={index}>
          {item.title} {item.quantity}
        </div>
      );
    }),
  ];
};

export default Cart;
