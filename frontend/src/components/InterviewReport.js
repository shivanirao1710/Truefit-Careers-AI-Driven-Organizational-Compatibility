import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InterviewReport() {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Fetch the report data from the new endpoint
        const res = await axios.get("http://localhost:5000/report-data");
        setReport(res.data.report || []);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load report data.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return <div className="report-container"><p>Generating report, please wait...</p></div>;
  }

  if (error) {
    return <div className="report-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="report-container">
      <div className="header">
        <h2>🧠 Soft Skill Analysis Report</h2>
      </div>

      {report.length > 0 ? (
        report.map((item, i) => (
          <div key={i} className="report-card">
            <p><strong>🗨️ Question:</strong></p>
            <p className="question">{item.question}</p>

            <p><strong>🎤 Answer:</strong></p>
            <p className="answer">{item.answer}</p>

            <p><strong>📈 Analysis:</strong></p>
            <p className="analysis">{item.analysis}</p>
          </div>
        ))
      ) : (
        <p>No report data available. Please generate a report first.</p>
      )}

      <button onClick={() => navigate("/interview-dashboard")} className="btn">
        Back to Interview Dashboard
      </button>
    </div>
  );
}

export default InterviewReport;