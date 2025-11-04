import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import OrderHistory from "./components/OrderHistory";
import ShoppingCart from "./components/ShoppingCart";
import LoginForm from "./components/auth/LoginForm";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrderHistory />} />
    </Routes>
  );
}

export default App;
