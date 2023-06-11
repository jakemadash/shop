import { Routes, Route, HashRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Home from "./views/Home";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
