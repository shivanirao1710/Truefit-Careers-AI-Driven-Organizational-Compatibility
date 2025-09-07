import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        withCredentials: true, // ✅ send session cookie
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
    <div className="report-container" style={styles.container}>
      <h2 style={styles.heading}>Interview Report</h2>
      {loading && <p>Loading...</p>}
      {message && <p style={styles.message}>{message}</p>}

      <div style={styles.reportBox}>
        {report.length > 0 ? (
          report.map((item, index) => (
            <div key={index} style={styles.card}>
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
          !loading && <p>No report available.</p>
        )}
      </div>

      <button onClick={() => navigate("/interview-dashboard")} className="btn">
        Back to Interview Dashboard
      </button>
    </div>
  );
}

const styles = {
  container: { padding: "20px", maxWidth: "800px", margin: "0 auto" },
  heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  message: { margin: "10px 0", color: "green", fontWeight: "500" },
  reportBox: {
    marginTop: "20px",
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  card: {
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
};

export default InterviewReport;
