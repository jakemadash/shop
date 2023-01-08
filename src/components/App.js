import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Cart from './Cart'

const App = () => {
  const [products, setProducts] = useState()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      let data = await response.json();
      console.log(data)
      data = data.filter((product => product.category !== 'jewelery'))
      setProducts([data.map((product, index) => {
        return (
          <div key={index}>
            <ProductCard item={product}/>
          </div>
        );
      })])
    };

    fetchProductData();
  }, []);

  const addToCart =(e) => {
    console.log(e)
    if (e.target.localName === 'button') setCartCount(cartCount + 1)
  }

  return (
    <div className="App">
      <h1>Home</h1>
      <div><Cart count={cartCount}/></div>
      <div className='product-gallery' onClick={addToCart}>
        {products}
      </div>
    </div>
  );
}

export default App;
