import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoggedInUserProvider } from "./context/LoggedInUserContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NavBar from "./components/NavBar.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoggedInUserProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />} errorElement={<div>Error</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<ProfileDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </LoggedInUserProvider>
  </React.StrictMode>
);
