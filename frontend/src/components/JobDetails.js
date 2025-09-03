import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './style.css';
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

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="container">
      <h1>{job.job_role}</h1>
      <h3>{job.company_name}</h3>
      <p><strong>Company Type:</strong> {job.company_type}</p>
      <p><strong>Required Knowledge:</strong> {job.knowledge_cleaned}</p>
      <p><strong>Skills:</strong> {job.skills_cleaned}</p>
      <p><strong>Combined Features:</strong> {job.combined_features}</p>
      <button onClick={() => navigate("/search")} className="btn">
        Back to Search
      </button>
    </div>
  );
};

export default JobDetails;
