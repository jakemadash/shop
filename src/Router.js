import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
