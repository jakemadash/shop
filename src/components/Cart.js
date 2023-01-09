import React, { useState, useEffect } from "react";
import "../style.css";

const Cart = ({items}) => {
return(
  [items.map((item, index) => {
    return(
      <div key={index}>
        {item.product} {item.quantity}
      </div>
    )
  })]
)
}

export default Cart;