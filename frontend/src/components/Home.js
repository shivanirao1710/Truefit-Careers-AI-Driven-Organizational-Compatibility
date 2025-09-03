import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';
import homeimg from './homeimg.png'; // Your TrueFit Careers logo
import './style.css';

function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const aboutRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/home")
      .then(res => setMessage(res.data.message))
      .catch(() => navigate("/")); // Redirect to login if unauthorized
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="TrueFit Careers Logo" />
        </div>
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={scrollToAbout}>About Us</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => alert("Chatbot clicked")}>Chatbot</li>
          <li onClick={() => alert("Sections clicked")}>Sections</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
        <div className="welcome-message">{message}</div>
      {/* Hero Section */}
      <div className="hero-container">
        <div className="hero-left">
          <h1>Building smarter career journeys together</h1>
          <p>
            An AI-powered platform orchestrating career guidance, skill development,
            job matching, and personalized behavioral insights for students and professionals.
          </p>
          <button onClick={() => navigate('/search')}>Find Jobs</button>
        </div>
        <div className="hero-right">
          <img src={homeimg} alt="TrueFit Careers Logo" />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards">
        <div className="card" onClick={() => navigate('/resume-analyzer')}>Resume Analyzer</div>
        <div className="card" onClick={() => navigate('/search')}>Find Jobs</div>
        <div className="card" onClick={() => navigate('/behaviour')}>Big Five Personality Analyzer</div>
        <div className="card" onClick={() => alert('Chatbot clicked')}>Chatbot</div>
        <div className="card" onClick={() => alert('Live Interview clicked')}>Live Interview</div>
      </div>

      {/* About Us */}
      <div ref={aboutRef} className="about-us">
        <h3>About Us</h3>
        <p>
          TrueFit Careers is an innovative AI-powered platform dedicated to helping students and professionals navigate the complex world of career planning.
          By leveraging advanced artificial intelligence and machine learning algorithms, TrueFit Careers provides personalized career guidance tailored to each individual’s unique skills, personality traits, and experiences.
          <br />
          The platform offers comprehensive resume analysis, identifying strengths, gaps, and relevant skills to optimize job applications. It also performs job matching, recommending roles and opportunities that align with a user’s qualifications and behavioral profile. Through behavioral insights, TrueFit Careers helps users understand their professional tendencies, work style, and interpersonal skills, enabling them to make informed career choices.
          <br />
          Additionally, the platform features interactive tools and assessments that enhance career readiness, from personality evaluations to skill development recommendations. By integrating data-driven insights with actionable guidance, TrueFit Careers empowers users to confidently explore career paths, improve employability, and achieve long-term professional success.
        </p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TrueFit Careers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
