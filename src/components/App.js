/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CartIcon from './CartIcon'
import Cart from './Cart'

const App = () => {
  const [products, setProducts] = useState()
  const [cartCount, setCartCount] = useState(0)
  const [cartProducts, setCartProducts] = useState([])

  const addToCart = (product, quantity) => {
    console.log(quantity)
    setCartProducts(cartProducts => [...cartProducts, {product, quantity}])
    console.log(cartProducts)
  }

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      let data = await response.json();
      console.log(data)
      data = data.filter((product => product.category !== 'jewelery'))
      setProducts([data.map((product, index) => {
        return (
          <div key={index}>
            <ProductCard item={product} updateCart={addToCart}/>
          </div>
        );
      })])
    };

    fetchProductData();
  }, []);


  return (
    <div className="App">
      <h1>Home</h1>
      <CartIcon count={cartCount} />
      <Cart items={cartProducts}/>
      <div className='product-gallery' >
        {products}
      </div>
    </div>
  );
}

export default App;
