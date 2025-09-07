import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png"; // adjust path if needed

function Navbar({ scrollToAbout, handleLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="TrueFit Careers Logo" className="nav-logo" />
      </div>

      <ul className="nav-links">
        <li onClick={() => navigate("/home")}>Home</li>
        <li onClick={() => navigate("/home#about")}>About us</li>
        <li onClick={() => navigate("/profile")}>Profile</li>
        <li onClick={() => navigate("/chatbot")}>Chatbot</li>
        <li onClick={() => alert("Sections clicked")}>Sections</li>
      </ul>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
