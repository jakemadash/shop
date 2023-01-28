import React from "react";

const ProductsMenu = ({ productData, setSelectedProducts }) => {
  const handleClick = (e) => {
    if (e.target.textContent === "All") setSelectedProducts(productData);
    // make sure list item is clicked, not just parent ul element
    else if (e.target.nodeName === "LI") {
      const filteredData = productData.filter(
        (product) => product.category === e.target.textContent.toLowerCase()
      );
      setSelectedProducts(filteredData);
    }
  };

  return (
    <nav>
      <ul onClick={(e) => handleClick(e)}>
        <li>All</li>
        <li>Electronics</li>
        <li>Men's Clothing</li>
        <li>Women's Clothing</li>
      </ul>
    </nav>
  );
};

export default ProductsMenu;
