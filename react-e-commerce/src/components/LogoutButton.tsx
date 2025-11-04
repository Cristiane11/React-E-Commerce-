import React from "react";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { clearUser } from "../features/userSlice";
import { clearCart } from "../features/cartSlice"; // optional, if you have a cart slice

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //  Sign out from Firebase
      await signOut(auth);

      //  Clear Redux states
      dispatch(clearUser());
      dispatch(clearCart()); // optional

      //  Redirect to login page
      navigate("/login");

      console.log("User successfully logged out.");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
