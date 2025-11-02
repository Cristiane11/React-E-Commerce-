import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ShoppingCart from "./components/ShoppingCart";
import LoginForm from "./components/auth/LoginForm";
import Register from "./components/auth/RegisterForm"; // if you have it
import { auth } from "./firebase/firebaseConfig";
import from "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <nav>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/cart" style={{ marginRight: "10px" }}>Cart</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;