import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewDashboard() {
  const navigate = useNavigate();

  const startInterview = async () => {
  try {
    await axios.post("http://localhost:5000/start-interview", {}, { withCredentials: true });
    navigate("/interview"); // open questions page immediately
  } catch (err) {
    console.error("Error starting interview:", err.response?.data || err.message);
  }
};

  const viewResults = () => navigate("/interview-results");
  const viewReport = () => navigate("/interview-report");

  return (
    <div className="upload-form">
      <div className="header">
        <h1>Hi, Welcome to Interview</h1>
      </div>

      <div className="dashboard-container">
        <button onClick={startInterview}>Take Interview</button>
        <button onClick={viewResults}>View Results</button>
        <button onClick={viewReport}>View Soft Skill Report</button>
      </div>

      <button className="btn" onClick={() => navigate("/home")}>
        Back to Home
      </button>
    </div>
  );
}

export default InterviewDashboard;
