/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import CartIcon from "./CartIcon";
import Cart from "./Cart";

const App = () => {
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const ref = useRef(false);

  const fetchProductData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    data = data.filter((product) => product.category !== "jewelery");
    setProductData(data);
    setProducts([
      data.map((product, index) => {
        return (
          <div key={index}>
            <ProductCard item={product} updateCart={addToCart} />
          </div>
        );
      }),
    ]);
  };

  useEffect(() => {
    if (ref.current === false) {
      fetchProductData();
      ref.current = true;
    } else {
      setProducts([
        productData.map((product, index) => {
          return (
            <div key={index}>
              <ProductCard item={product} updateCart={addToCart} />
            </div>
          );
        }),
      ]);
    }
  }, [cartProducts]);

  const addToCart = (title, price, image, quantity) => {
    let productInCart = "";
    let updatedProducts = cartProducts.map((product) => {
      if (product.title === title) {
        // product is already in cart, just change quantity
        productInCart = true;
        return { ...product, quantity: product.quantity + quantity };
      } else return product;
    });
    if (!productInCart)
      // add new product to cart
      updatedProducts = (updatedProducts) => [
        ...updatedProducts,
        { title, price, image, quantity },
      ];
    setCartProducts(updatedProducts);
    setCartCount(cartCount + quantity);
    setOrderTotal(orderTotal + (price * quantity))
  };

  return (
    <div className="App">
      <h1>Home</h1>
      <CartIcon count={cartCount} />
      <Cart items={cartProducts} total={orderTotal} />
      <div className="product-gallery">{products}</div>
    </div>
  );
};

export default App;
