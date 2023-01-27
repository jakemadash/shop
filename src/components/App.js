/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import ProductsMenu from "./ProductsMenu";

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const ref = useRef(false);

  const fetchProductData = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    data = data.filter((product) => product.category !== "jewelery");
    setAllProducts(data);
    setSelectedProducts(data);
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
        selectedProducts.map((product, index) => {
          return (
            <div key={index}>
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
    if (!productInCart)
      // add new product to cart
      updatedProducts = (updatedProducts) => [
        ...updatedProducts,
        { title, price, image, quantity },
      ];
    setCartProducts(updatedProducts);
    setCartCount(cartCount + quantity);
    setOrderTotal(orderTotal + price * quantity);
  };

  const deleteFromCart = (title, price) => {
    const updatedProducts = cartProducts.filter(
      (product) => product.title !== title
    );
    console.log(updatedProducts)
    setCartProducts(updatedProducts);
    setCartCount(cartCount - 1);
    setOrderTotal(orderTotal - price);
  };

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <Cart
        items={cartProducts}
        total={orderTotal}
        addToCart={addToCart}
        deleteFromCart={deleteFromCart}
      />
      <div className="products">
        <ProductsMenu
          productData={allProducts}
          setSelectedProducts={setSelectedProducts}
        />
        <div className="product-gallery">{products}</div>
      </div>
    </div>
  );
};

export default App;
