import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Cart from "./components/Cart";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
