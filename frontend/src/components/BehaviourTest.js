// BehaviourTest.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './BehaviourTest.css';

const BehaviourTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch questions from backend
    axios
      .get("http://localhost:5000/api/behaviour", { withCredentials: true })
      .then((res) => {
        if (!res.data.error) {
          setQuestions(res.data.questions);
        } else {
          console.error(res.data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions answered
    if (questions.length !== Object.keys(answers).length) {
      alert("Please answer all questions");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/submit_behaviour",
        { answers },
        { withCredentials: true }
      )
      .then((res) => {
        if (!res.data.error) {
          navigate("/result"); // Go to result page
        } else {
          console.error(res.data.error);
        }
      })
      .catch((err) => {
        console.error("Error submitting answers:", err);
      });
  };

  if (loading) return <p className="status-message">Loading questions...</p>;
  if (!questions.length) return <p className="status-message">No questions found.</p>;

  return (
    <div className="container">
      <div className="behaviour-form">
        <h1>Big Five Personality Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          {questions.map((q) => (
            <div key={q.id} className="question-b">
              <p>{q.id}. {q.question_text}</p>
              <div className="question-options">
                {[1, 2, 3, 4, 5].map((val) => (
                  <label key={val}>
                    <input
                      type="radio"
                      name={`q${q.id}`}
                      value={val}
                      checked={answers[q.id] === val.toString()}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="button-group">
        <button onClick={() => navigate("/result")} className="btn btn-secondary">View Result</button>
        <button onClick={() => navigate("/home")} className="btn btn-secondary">Back to Home</button>
      </div>
    </div>
  );
};

export default BehaviourTest;
