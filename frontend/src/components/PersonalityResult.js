// PersonalityResult.js
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';
const PersonalityResult = () => {
  const [scores, setScores] = useState(null);
  const [behavioralTag, setBehavioralTag] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/result_behaviour", { withCredentials: true })
      .then((res) => {
        if (!res.data.error) {
          setScores(res.data.scores);
          setBehavioralTag(res.data.behavioral_tag);
        } else {
          console.error(res.data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching result:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!scores) return <p>No results found. Please take the test first.</p>;

  const plotData = [
    {
      values: [
        scores.openness * 100,
        scores.conscientiousness * 100,
        scores.extraversion * 100,
        scores.agreeableness * 100,
        scores.neuroticism * 100,
      ],
      labels: ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"],
      type: "pie",
    },
  ];

  const layout = { title: "Big Five Personality Traits", showlegend: true };

  return (
    <div className="b-container">
      <h1>Personality Test Results</h1>
      <p><strong>Behavioral Tag:</strong> {behavioralTag}</p>

      <ul>
        <li><strong>Openness:</strong> {(scores.openness * 100).toFixed(2)}%</li>
        <li><strong>Conscientiousness:</strong> {(scores.conscientiousness * 100).toFixed(2)}%</li>
        <li><strong>Extraversion:</strong> {(scores.extraversion * 100).toFixed(2)}%</li>
        <li><strong>Agreeableness:</strong> {(scores.agreeableness * 100).toFixed(2)}%</li>
        <li><strong>Neuroticism:</strong> {(scores.neuroticism * 100).toFixed(2)}%</li>
      </ul>

      <Plot data={plotData} layout={layout} style={{ width: "100%", height: "400px" }} />

      <button onClick={() => navigate("/behaviour")} className="btn">Take the Test Again</button>
      <button onClick={() => navigate("/home")} className="btn">Back to Home</button>
    </div>
  );
};

export default PersonalityResult;
