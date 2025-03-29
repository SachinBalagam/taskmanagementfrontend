import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://taskmanagementbackend-4ohq.onrender.com/api/auth/login",
        { email, password }
      );
      console.log("API Response:", response.data);

      if (!response.data || !response.data.token) {
        console.error("Invalid user data received:", response.data);
        return;
      }

      login(response.data);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>
      <button onClick={() => navigate("/signup")}>Go to Signup</button>
    </div>
  );
};

export default Login;
