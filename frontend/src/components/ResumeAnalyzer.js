import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ResumeAnalyzer.css';

function ResumeAnalyzer() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setLoading(true);
            setMessage("Uploading your resume...");

            setTimeout(() => setMessage("Parsing your resume..."), 1000);

            const response = await axios.post(
                "http://localhost:5000/api/upload_resume",
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            setMessage(response.data.message || "Resume uploaded successfully!");

            setTimeout(() => {
                setLoading(false);
                navigate("/resume-display");
            }, 1200);

        } catch (err) {
            setLoading(false);
            setMessage(err.response?.data?.error || "Error uploading resume.");
        }
    };

    return (
        <section className="resume-section">
            <div className="resume-card">
                <h1>Upload Your Resume</h1>
                <form onSubmit={handleUpload}>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept=".pdf,.doc,.docx" 
                        required 
                    />
                    <button className="primary-btn" type="submit" disabled={loading}>
                        {loading ? "Please wait..." : "Upload"}
                    </button>
                </form>

                {/* ✅ show spinner + progress messages */}
                {loading && (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p className="resume-message">{message}</p>
                    </div>
                )}

                {!loading && message && <p className="resume-message">{message}</p>}

                {!loading && (
                  <>
                    <button className="secondary-btn" onClick={() => navigate('/resume-display')}>
                      View My Resume
                    </button><br />
                    <button className="secondary-btn" onClick={() => navigate('/home')}>
                      Back to Home
                    </button>
                  </>
                )}
            </div>
        </section>
    );
}

export default ResumeAnalyzer;
