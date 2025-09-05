import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InterviewResults() {
  const [emotions, setEmotions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/results-data");
        setEmotions(res.data.emotions || []);
        setAnswers(res.data.answers || []);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };
    fetchResults();
  }, []);

  const generateReport = async () => {
    try {
      // POST request to trigger report generation on the backend
      const response = await axios.post("http://localhost:5000/generate-report");
      console.log(response.data.status); // Log success message
      
      // Navigate to the report page only after successful generation
      navigate("/interview-report");
    } catch (err) {
      console.error("Error generating report:", err);
      alert("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Emotion Logs and Interview Answers</h2>
      </div>

      <h2>Emotion Logs</h2>
      <table>
        <thead>
          <tr><th>Timestamp</th><th>Emotion</th></tr>
        </thead>
        <tbody>
          {(showAll ? emotions : emotions.slice(0, 10)).map((e, i) => (
            <tr key={i}>
              <td>{e.timestamp}</td>
              <td>{e.emotion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {emotions.length > 10 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Read Less" : "Read More"}
        </button>
      )}

      <h2>Interview Answers</h2>
      <table>
        <thead>
          <tr><th>Question</th><th>Answer</th></tr>
        </thead>
        <tbody>
          {answers.map((a, i) => (
            <tr key={i}>
              <td>{a.question}</td>
              <td>{a.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generateReport}>Generate Soft Skill Report</button>
      <button onClick={() => navigate("/interview-dashboard")} className="btn">
        Back to Interview Dashboard
      </button>
    </div>
  );
}

export default InterviewResults;