import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './ResumeDisplay.css';

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
        <>
            <section className="resume-dispsection">
                <div className="resume-disp">
                    <h1>Resume Details</h1>
                    {message && <p>{message}</p>}

                    {resumeData && (
                        <>
                            <div className="resume-table">
                                <table>
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

                            <div>
                                <button className="secondary-btn" onClick={handleGetJobs}>Get Jobs</button><br />
                                <button className="secondary-btn" onClick={() => navigate('/home')}>Back to Home</button>
                            </div>
                        </>
                    )}

                    {jobRecommendations.length > 0 && (
                        <div className="jobs-section">
                            <h3>Recommended Jobs</h3>
                            {jobRecommendations.map((job, index) => (
                                <div key={index} className="job-card">
                                    <p><strong>Job Role:</strong> {job.job_role}</p>
                                    <p><strong>Company:</strong> {job.company_name} ({job.company_type})</p>
                                    <p><strong>Skills:</strong> {job.skills}</p>
                                    <p><strong>Relevance Score:</strong> {job.relevance_score}%</p>
                                    <p className="matched"><strong>Matched Skills:</strong> {job.matched_skills}</p>
                                    <p className="missing"><strong>Missing Skills:</strong> {job.missing_skills}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default ResumeDisplay;
