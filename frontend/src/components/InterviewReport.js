import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InterviewReport.css";

function InterviewReport() {
  const [report, setReport] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch interview report
  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/interview-report", {
        withCredentials: true,
      });
      if (res.data && res.data.report) {
        setReport(res.data.report);
      } else {
        setMessage("No report found.");
      }
    } catch (error) {
      console.error("Error fetching report:", error);
      setMessage("Failed to fetch report.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="report-container">
      <h2 className="report-heading">Interview Report</h2>
      {loading && <p className="loading-text">Loading...</p>}
      {message && <p className="status-message">{message}</p>}

      <div className="report-box">
        {report.length > 0 ? (
          report.map((item, index) => (
            <div key={index} className="report-card">
              <p>
                <strong>Q:</strong> {item.question}
              </p>
              <p>
                <strong>A:</strong> {item.answer}
              </p>
              <p>
                <strong>Analysis:</strong> {item.analysis}
              </p>
            </div>
          ))
        ) : (
          !loading && <p className="no-report">No report available.</p>
        )}
      </div>

      <button onClick={() => navigate("/interview-dashboard")} className="btn">
        Back to Interview Dashboard
      </button>
    </div>
  );
}

export default InterviewReport;
