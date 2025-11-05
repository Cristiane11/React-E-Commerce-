import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/profile">Profile</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;