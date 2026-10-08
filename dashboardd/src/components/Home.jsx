import React, { useEffect, useState } from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

import { FRONTEND_URL } from "../config";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    const tokenFromStorage = localStorage.getItem("token");

    if (tokenFromUrl || tokenFromStorage) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect to login page if user is logged out
      window.location.href = `${FRONTEND_URL}/login`;
    }
    setChecking(false);
  }, []);

  if (checking || !isAuthenticated) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column", gap: "12px", fontFamily: "sans-serif" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ color: "#666", fontSize: "1rem" }}>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
