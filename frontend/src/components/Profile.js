import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });
        setProfileData(res.data.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in.");
          navigate("/login");
        } else {
          setError(err.response?.data?.error || "Failed to fetch profile data.");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return <div className="error-box">{error}</div>;
  }

  if (!profileData) {
    return <div className="loading-box">Loading profile...</div>;
  }

  return (
    <section className="profile-section">
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>
        <div className="profile-details">
          <p><span>Name:</span> {profileData.name}</p>
          <p><span>Email:</span> {profileData.email}</p>
          <p><span>Phone:</span> {profileData.phone}</p>
          <p><span>Skills:</span> {profileData.skills}</p>
          <p><span>Experience:</span> {profileData.experience || "N/A"}</p>
          <p><span>Education:</span> {profileData.education || "N/A"}</p>
          <p><span>Projects:</span> {profileData.projects || "N/A"}</p>
          <p><span>Behavioral Tag:</span> {profileData.behavioral_tag || "Not assigned yet"}</p>
          <p><span>Insights:</span> {profileData.insights}</p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/home")}>
          Back to Home
        </button>
      </div>
    </section>
  );
}

export default Profile;
