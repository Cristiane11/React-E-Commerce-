// src/components/LoginForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // adjust path if needed
import { setUser } from "../../features/userSlice";   // adjust path if needed

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Redux user state
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
        })
      );

      alert("Login successful!");
    } catch (err) {
      alert("Login failed: " + (err as Error).message);
      console.error("Firebase login error:", err);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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

        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
