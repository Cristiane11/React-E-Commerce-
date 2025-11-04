import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { createUserProfile } from "../../firebase/userService";
import { setUser } from "../../features/userSlice";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //  Create Firestore document for new user
      await createUserProfile(user.uid, {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      //  Save user info in Redux
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
        })
      );

      // Redirect to profile after registration
      navigate("/profile");
    } catch (err) {
      console.error("Register error:", err);
      alert("Failed to register user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
