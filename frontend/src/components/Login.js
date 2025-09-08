import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LogReg.css";
import logo from "./logotc.jpg"; // ✅ import your logo

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", { username, password });
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      {/* ✅ Replaced text heading with logo */}
      <div className="logo-container">
        <img src={logo} alt="Truefit Careers Logo" className="logo" />
      </div>

      <div className="lr-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
