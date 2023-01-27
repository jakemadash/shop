import React from "react";
import CartIcon from "./CartIcon";

const Header = ({ cartCount }) => {
  return (
    <div className="header">
      <a href="" className="logo">
        Pop Shop
      </a>
      <nav className="main-menu">
        <a href="">Home</a>
        <a href="">Products</a>
        <CartIcon count={cartCount} />
      </nav>
    </div>
  );
};

export default Header;
