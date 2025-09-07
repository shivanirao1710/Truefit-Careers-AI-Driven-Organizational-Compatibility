import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ResumeAnalyzer.css';

function ResumeAnalyzer() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
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
            const response = await axios.post(
                "http://localhost:5000/api/upload_resume",
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setMessage(response.data.message);
            navigate("/resume-display");
        } catch (err) {
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
                    <button className="primary-btn" type="submit">Upload</button>
                </form>

                {message && <p className="resume-message">{message}</p>}

                <button className="secondary-btn" onClick={() => navigate('/resume-display')}>View My Resume</button><br />
                <button className="secondary-btn" onClick={() => navigate('/home')}>Back to Home</button>
            </div>
        </section>
    );
}

export default ResumeAnalyzer;
