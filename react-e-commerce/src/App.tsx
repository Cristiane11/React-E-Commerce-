import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import ShoppingCart from "./components/ShoppingCart";
import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/RegisterForm";
import ProtectedRoute from "../src/routes/ProtectedRoute";
import "./App.css";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <ShoppingCart />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
