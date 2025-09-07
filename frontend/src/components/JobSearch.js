import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./JobSearch.css"; // Correctly import the CSS file


const JobSearch = () => {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("skills");
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError("Please enter skills, job role, or company name.");
            return;
        }

        setLoading(true);
        setError("");
        setRecommendations([]);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/search",
                {
                    search_type: searchType,
                    query: query,
                },
                { withCredentials: true }
            );

            if (res.data.recommendations) {
                setRecommendations(res.data.recommendations);
            } else {
                setError("No results found.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
           
            
            {/* Main Content Container */}
            <div className="container">
                <h1>Job Search</h1>
                <form onSubmit={handleSearch} className="job-search-form">
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="skills"
                                checked={searchType === "skills"}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            Skills
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="job_role"
                                checked={searchType === "job_role"}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            Job Role
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="company_name"
                                checked={searchType === "company_name"}
                                onChange={(e) => setSearchType(e.target.value)}
                            />
                            Company Name
                        </label>
                    </div>

                    <div className="search-input-group">
                        <input
                            type="text"
                            placeholder="Enter query..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>

                {loading && <p className="info-text">Searching...</p>}
                {error && <p className="error-text">{error}</p>}

                <div className="recommendations">
                    {recommendations.map((job, idx) => (
                        <div
                            key={idx}
                            className="job-card"
                            onClick={() =>
                                navigate(`/job/${encodeURIComponent(job.job_role)}/${encodeURIComponent(job.company_name)}`)
                            }
                        >
                            <h3>{job.job_role}</h3>
                            <p><strong>Company:</strong> {job.company_name}</p>
                            <p><strong>Type:</strong> {job.company_type}</p>
                        </div>
                    ))}
                </div>

                <button onClick={() => navigate("/home")} className="back-home-button">
                    Back to Home
                </button>
            </div>
        </>
    );
};

export default JobSearch;