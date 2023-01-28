import React from "react";

const Home = () => {
  return (
    <div>
      <div className="home">
        <div className="logo" id="big">Pop Shop</div>
        <div className="home-body">
            <div className="best">BEST ONLINE STORE OF 2023</div>
            <button className="shop"><a href="/products" className="no-transition">Shop now</a></button>
        </div>
        <div className="vibe"></div>
      </div>
    </div>
  );
};

export default Home;
