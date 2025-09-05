import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Interview() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Fetch questions when component loads
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/get-questions", {
          withCredentials: true,
        });
        setQuestions(res.data.questions || []);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Handle text changes
  const handleChange = (e, id) => {
    setAnswers((prev) => ({ ...prev, [id]: e.target.value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/submit-interview",
        { answers }, // 👈 FIX: wrap inside { answers }
        { withCredentials: true }
      );
      alert("Interview finished!");
      navigate("/interview-results");
    } catch (err) {
      console.error("Error submitting answers:", err.response?.data || err.message);
      alert("Failed to submit interview. Please try again.");
    }
  };

  return (
    <div className="interview-container">
      <div className="header">
        <h2>Answer the Questions Below</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {questions.map((q, i) => (
          <div key={q.id} className="question-block">
            <p>
              <b>Q{i + 1}: {q.question}</b>
            </p>
            <textarea
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(e, q.id)}
              required
            />
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button type="submit">Submit Answers</button>
        </div>
      </form>
    </div>
  );
}

export default Interview;
