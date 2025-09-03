import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import ResumeDisplay from "./components/ResumeDisplay";
import Profile from "./components/Profile";
import BehaviourTest from "./components/BehaviourTest"; // New
import PersonalityResult from "./components/PersonalityResult"; // New
import JobSearch from "./components/JobSearch";             // Job search page
import JobDetails from "./components/JobDetails";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/resume-display" element={<ResumeDisplay />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/behaviour" element={<BehaviourTest />} /> {/* Behaviour Test Page */}
        <Route path="/result" element={<PersonalityResult />} /> {/* Result Page */}
        <Route path="/search" element={<JobSearch />} />
         <Route path="/job/:job_role/:company_name" element={<JobDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
