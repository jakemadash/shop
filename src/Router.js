import { Routes, Route, HashRouter } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/products" element={<App />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
