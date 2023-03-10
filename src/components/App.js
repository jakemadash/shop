/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import ProductsMenu from "./ProductsMenu";
import Products from "./Products";
import WithLoading from "./WithLoading";
const ProductsWithLoading = WithLoading(Products);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const ref = useRef(false);

  const fetchProductData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      setIsLoading(false);
      const app = document.querySelector(".App");
      app.textContent =
        "An error occurred. Please refresh the page or try again later.";
      return null;
    }
    let data = await response.json();
    setIsLoading(false);
    data = data.filter((product) => product.category !== "jewelery");
    setAllProducts(data);
    setSelectedProducts(data);
    setProducts([
      data.map((product, index) => {
        return (
          <div key={index} aria-label="product">
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
        selectedProducts.map((product, index) => {
          return (
            <div key={index} aria-label="product">
              <ProductCard item={product} updateCart={addToCart} />
            </div>
          );
        }),
      ]);
    }
  }, [cartProducts, selectedProducts]);

  const addToCart = (title, price, image, quantity) => {
    let productInCart = "";
    let updatedProducts = cartProducts.map((product) => {
      if (product.title === title) {
        // product in cart, just change quantity
        productInCart = true;
        return { ...product, quantity: product.quantity + quantity };
      } else return product;
    });
    if (!productInCart && quantity)
      // add new product to cart
      updatedProducts = (updatedProducts) => [
        ...updatedProducts,
        { title, price, image, quantity },
      ];
    setCartProducts(updatedProducts);
    setCartCount(cartCount + quantity);
    setOrderTotal(orderTotal + price * quantity);
  };

  const deleteFromCart = (title, price, quantity) => {
    const updatedProducts = cartProducts.filter(
      (product) => product.title !== title
    );
    setCartProducts(updatedProducts);
    setCartCount(cartCount - quantity);
    setOrderTotal(orderTotal - price * quantity);
  };

  return (
    <div className="App" aria-label="App">
      <Header cartCount={cartCount} />
      <Cart
        items={cartProducts}
        total={orderTotal}
        updateCart={addToCart}
        deleteFromCart={deleteFromCart}
      />
      <div className="products">
        <ProductsMenu
          productData={allProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <ProductsWithLoading isLoading={isLoading} products={products} />
      </div>
    </div>
  );
};

export default App;
