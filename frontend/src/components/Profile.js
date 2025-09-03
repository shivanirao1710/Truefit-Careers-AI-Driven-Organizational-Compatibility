import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './style.css';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile", {
          withCredentials: true, // important for session cookies
        });
        setProfileData(res.data.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in.");
          navigate("/login");
        } else {
          setError(
            err.response?.data?.error || "Failed to fetch profile data."
          );
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  if (error) {
    return (
      <div className="p-6 text-red-600 text-center font-semibold">
        {error}
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="p-6 text-gray-600 text-center">Loading profile...</div>
    );
  }

  return (
    <div className="container">
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>
      <div className="space-y-4">
        <p>
          <span className="font-semibold">Name:</span> {profileData.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {profileData.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {profileData.phone}
        </p>
        <p>
          <span className="font-semibold">Skills:</span> {profileData.skills}
        </p>
        <p>
          <span className="font-semibold">Experience:</span>{" "}
          {profileData.experience || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Education:</span>{" "}
          {profileData.education || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Projects:</span>{" "}
          {profileData.projects || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Behavioral Tag:</span>{" "}
          {profileData.behavioral_tag || "Not assigned yet"}
        </p>
        <p>
          <span className="font-semibold">Insights:</span>{" "}
          {profileData.insights}
        </p>
        <button onClick={() => navigate('/home')}>Back to Home</button>
      </div>
    </div>
    </div>
  );
}

export default Profile;
