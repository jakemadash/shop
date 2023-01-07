import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const App = () => {
  const [products, setProducts] = useState()

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

  // async function fetchProductData() {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   const data = await response.json();
  //   setProducts(data);
  // }

  return (
    <div className="App">
      <h1>Home</h1>
      <div className='product-gallery'>
        {products}
      </div>
    </div>
  );
}

export default App;
