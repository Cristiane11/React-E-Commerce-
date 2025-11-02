import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../firebase/authService";
import { setUser } from "../../features/userSlice";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
      dispatch(setUser({ uid: user.uid, email: user.email, name: user.displayName || "" }));
      alert("Login successful!");
    } catch (err) {
      alert("Login failed: " + (err as Error).message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;