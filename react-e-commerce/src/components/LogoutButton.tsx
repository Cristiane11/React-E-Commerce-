import React from "react";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { clearUser } from "../features/userSlice";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      alert("You have been logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to logout.");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;