import React from "react";
import CartIcon from "./CartIcon";

const Header = ({ cartCount }) => {
  const hideCart = () => {
    document.querySelector(".cart").classList.toggle("slide-in");
    document.querySelector(".overlay").classList.toggle("visible");
  };

  return (
    <div className="header-container">
      <header className="header nav">
        <a href="/" className="logo no-transition">
          Pop Shop
        </a>
        <nav className="main-menu">
          <a href="#/" className="menu-item">Home</a>
          <a href="#/products" className="menu-item">Products</a>
          <CartIcon count={cartCount} />
        </nav>
      </header>
      <div className="overlay" onClick={hideCart}></div>
    </div>
  );
};

export default Header;
