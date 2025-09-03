import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css';
function ResumeDisplay() {
    const [resumeData, setResumeData] = useState(null);
    const [jobRecommendations, setJobRecommendations] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/get_resume");
                setResumeData(response.data);
            } catch (err) {
                setMessage(err.response?.data?.error || "Error fetching resume data.");
            }
        };
        fetchResume();
    }, []);

    const handleGetJobs = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/get_jobs");
            setJobRecommendations(response.data.jobs);
        } catch (err) {
            setMessage(err.response?.data?.error || "Error fetching job recommendations.");
        }
    };

    return (
        <div className="container">
            <h1>Resume Details</h1>
            {message && <p>{message}</p>}
            {resumeData && (
                <>
                    <div className="resume-table">
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr><th>Name</th><td>{resumeData.name}</td></tr>
                                <tr><th>Email</th><td>{resumeData.email}</td></tr>
                                <tr><th>Phone</th><td>{resumeData.phone}</td></tr>
                                <tr><th>Skills</th><td>{resumeData.skills}</td></tr>
                                <tr><th>Experience</th><td>{resumeData.experience}</td></tr>
                                <tr><th>Education</th><td>{resumeData.education}</td></tr>
                                <tr><th>Projects</th><td>{resumeData.projects}</td></tr>
                                <tr><th>Insights</th><td>{resumeData.insights}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleGetJobs}>Get Jobs</button>
                    </div>
                </>
            )}
            
            <br />
            <br />
            <button onClick={() => navigate('/home')}>Back to Home</button>

            {jobRecommendations.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Recommended Jobs</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {jobRecommendations.map((job, index) => (
                            <li key={index} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                                <strong>Job Role:</strong> {job.job_role}<br />
                                <strong>Company:</strong> {job.company_name} ({job.company_type})<br />
                                <strong>Skills:</strong> {job.skills}<br />
                                <strong>Relevance Score:</strong> {job.relevance_score}%<br />
                                <strong style={{ color: 'green' }}>Matched Skills:</strong> {job.matched_skills}<br />
                                <strong style={{ color: 'red' }}>Missing Skills:</strong> {job.missing_skills}<br />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ResumeDisplay;