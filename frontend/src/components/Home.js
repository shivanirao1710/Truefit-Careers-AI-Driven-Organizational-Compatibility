import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import homeimg from "./homeimg.png";
import "./style.css";

function Home() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const aboutRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/home")
      .then((res) => setMessage(res.data.message))
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
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="TrueFit Careers Logo" className="nav-logo" />
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={scrollToAbout}>About</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => alert("Chatbot clicked")}>Chatbot</li>
          <li onClick={() => alert("Sections clicked")}>Sections</li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
<div className="welcome-message">{message}<p>Hi</p></div>
      {/* Hero Section */}
      <section className="hero">
        
        <div className="hero-text">
          <h1>Smarter Career Journeys Start Here</h1>
          <p>
            An AI-powered platform that brings together career guidance, job
            matching, skill insights, and behavioral analysis — designed for
            students and professionals.
          </p>
          <button className="primary-btn" onClick={() => navigate("/search")}>
            Find Jobs
          </button>
        </div>
        <div className="hero-img">
          <img src={homeimg} alt="Career AI" />
        </div>
      </section>


{/* Vision Section (after Hero) */}
<section className="vision-section">
  <h2 className="vision-heading">We See You</h2>
  <p className="vision-text">
    Navigating through challenges, unlocking hidden potential, 
    and striving for meaningful career opportunities — 
    yet slowed by fragmented paths and uncertainty.
  </p>
  <p className="vision-text">
    Powered by AI-driven insights, TrueFit Careers transforms 
    that potential into measurable growth and future success.
  </p>

  {/* Divider with dot */}
  <div className="vision-divider">
    <span className="line"></span>
    <span className="dot"></span>
  </div>

  <h3 className="vision-tagline">
    <strong>TrueFit Careers:</strong> <em>AI with Purpose</em>
  </h3>
</section>


{/* AI Agents Section */}
<section className="agents-section">
  <h2 className="agents-heading">
    Meet our AI agents: <em>Your Career Companions</em>
  </h2>
  <p className="agents-subtitle">
    “Each agent specializes in a unique role—together, they guide you towards career success.”
  </p>

  <div className="agents-container">
    {/* Left side agents */}
    <div className="agents-left">
      <div className="agent">
        <img src={homeimg} alt="Mock AI Interview" />
        <div>
          <h4>Mock AI Interview</h4>
          <p>Practice interviews with AI</p>
        </div>
      </div>
      <div className="agent">
        <img src={homeimg} alt="Big Five Personality Test" />
        <div>
          <h4>Big Five Test</h4>
          <p>Discover your personality traits</p>
        </div>
      </div>
    </div>

    {/* Center node */}
    <div className="agents-center">
      <div className="center-node">
        <img src={logo} alt="Career Hub" />
        <h3>TrueFit Careers</h3>
        <p>Your AI Career Guide</p>
      </div>
    </div>

    {/* Right side agents */}
    <div className="agents-right">
      <div className="agent">
        <img src={homeimg} alt="Resume Analyzer" />
        <div>
          <h4>Resume Analyzer</h4>
          <p>Highlight strengths & skills</p>
        </div>
      </div>
      <div className="agent">
        <img src={homeimg} alt="AI Chatbot" />
        <div>
          <h4>AI Chatbot</h4>
          <p>Ask career-related questions</p>
        </div>
      </div>
    </div>
  </div>
</section>


{/* Resume Analyzer Section (Image Right) */}
<section className="section">
  <div className="section-inner">
    <div className="section-text">
      <h2>Resume Analyzer</h2>
      <p>
        Upload your resume to receive AI-driven feedback on strengths, gaps,
        and tailored suggestions to optimize your job applications.
      </p>
      <ul className="messages">
        <li>Highlight your key skills effectively</li>
        <li>Identify missing keywords recruiters expect</li>
        <li>Improve chances of shortlisting</li>
      </ul>
      <button
        className="secondary-btn"
        onClick={() => navigate("/resume-analyzer")}
      >
        Try Now
      </button>
    </div>
    <div className="section-img">
      <img src={homeimg} alt="Resume Analyzer" />
    </div>
  </div>
</section>

{/* Chatbot Section (Image Left) */}
<section className="section alt">
  <div className="section-inner reverse">
    <div className="section-text">
      <h2>AI Chatbot</h2>
      <p>
        Interact with our AI-powered chatbot for instant career advice,
        personalized learning suggestions, and interview tips.
      </p>
      <p>
        You can ask career-related questions, get instant feedback and tips, 
        and learn smarter with the help of AI guidance.
      </p>
      <button
        className="secondary-btn"
        onClick={() => alert("Chatbot clicked")}
      >
        Chat Now
      </button>
    </div>
    <div className="section-img">
      <img src={homeimg} alt="AI Chatbot" />
    </div>
  </div>
</section>

{/* Personality Analyzer Section (Image Right) */}
<section className="section">
  <div className="section-inner">
    <div className="section-text">
      <h2>Big Five Personality Analyzer</h2>
      <p>
        Take our behavioral test and gain insights into your personality traits — 
        covering <strong>Openness, Conscientiousness, Extraversion, Agreeableness,</strong> 
        and <strong>Neuroticism</strong>. Understand how your behavior aligns with 
        workplace success and discover areas for personal growth.
      </p>
      <button
        className="secondary-btn"
        onClick={() => navigate("/behaviour")}
      >
        Start Test
      </button>
    </div>
    <div className="section-img">
      <img src={homeimg} alt="Personality Analyzer" />
    </div>
  </div>
</section>

{/* Mock AI Interview Section (Image Left) */}
<section className="section alt">
  <div className="section-inner reverse">
    <div className="section-text">
      <h2>Mock AI Interview</h2>
      <p>
        Experience real-time AI-driven mock interviews designed to prepare you for success:
      </p>
      <ul className="messages">
        <li>Answer structured interview questions in a form</li>
        <li>AI detects emotions and analyzes your expressions</li>
        <li>Generates personalized insights for improvement</li>
      </ul>
      <button
        className="secondary-btn"
        onClick={() => alert("Mock AI Interview clicked")}
      >
        Take Interview
      </button>
    </div>
    <div className="section-img">
      <img src={homeimg} alt="Mock AI Interview" />
    </div>
  </div>
</section>


{/* About Us Section */}
<section ref={aboutRef} className="about-section">
  <div className="about-inner">
    <h1 className="about-title">Our Purpose</h1>
    <p>
      At TrueFit Careers, we believe every student holds untapped potential. 
      Our mission is to transform that hidden spark into meaningful career 
      opportunities, empowering individuals to discover their strengths and 
      achieve success through AI-powered insights and guidance.
    </p>
    <p>
      By combining advanced technology, behavioral analysis, and personalized 
      recommendations, we redefine how career growth is achieved—helping 
      students and professionals thrive in their journey with confidence 
      and clarity.
    </p>
  </div>
</section>


      {/* Footer */}
      <footer className="footer">
        <p>© 2025 TrueFit Careers. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
