import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './JobDetails.css'; // Correctly import the CSS file

const JobDetails = () => {
  const { job_role, company_name } = useParams();
  const decodedJobRole = decodeURIComponent(job_role);
  const decodedCompanyName = decodeURIComponent(company_name);

  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/job_details`,
          {
            params: { job_role: decodedJobRole, company_name: decodedCompanyName },
            withCredentials: true,
          }
        );

        if (!res.data.error) {
          setJob(res.data.job);
        } else {
          setError(res.data.error);
        }
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch job details");
      }
    };

    fetchJobDetails();
  }, [decodedJobRole, decodedCompanyName]);

  if (error) {
    return (
      <div className="container">
        <p className="error-text">{error}</p>
        <button onClick={() => navigate("/search")} className="back-button">
          Back to Search
        </button>
      </div>
    );
  }

  if (!job) {
    return <p className="loading-text">Loading job details...</p>;
  }

  return (
    <>
  

      {/* Main Content Container */}
      <div className="details-container">
        <h1 className="job-title">{job.job_role}</h1>
        <h3 className="company-name">{job.company_name}</h3>

        <div className="details-section">
          <strong>Company Type:</strong>
          <p>{job.company_type}</p>
        </div>
        
        <div className="details-section">
          <strong>Required Knowledge:</strong>
          <p>{job.knowledge_cleaned}</p>
        </div>

        <div className="details-section">
          <strong>Skills:</strong>
          <p>{job.skills_cleaned}</p>
        </div>

        <div className="details-section">
          <strong>Combined Features:</strong>
          <p>{job.combined_features}</p>
        </div>

        <button onClick={() => navigate("/search")} className="back-button">
          Back to Search
        </button>
      </div>
    </>
  );
};

export default JobDetails;
