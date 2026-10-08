import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { BACKEND_URL, getDashboardRedirectUrl } from "../../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("logged_out") === "true") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsError(false);
      setStatusMsg("You have been logged out successfully.");
    }
  }, [location]);

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");
    try {
      const response = await axios.post(`${BACKEND_URL}/login`, {
        email: email.trim(),
        password: password,
      });

      setIsError(false);
      setStatusMsg("Login successful! Redirecting to TradePulse Dashboard...");

      // Save auth details
      const token = response.data.token;
      const user = response.data.user;
      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Redirect to the Trading Dashboard with authentication details
      setTimeout(() => {
        window.location.href = getDashboardRedirectUrl(token, user);
      }, 700);
    } catch (err) {
      setIsError(true);
      setStatusMsg(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="pill-badge mb-2" style={{ fontSize: "0.72rem" }}>
            <span>⚡</span> TRADEPULSE TERMINAL
          </div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to access your trading portfolio & charts</p>
        </div>

        {statusMsg && (
          <div
            className={`alert ${isError ? "alert-danger" : "alert-success"}`}
            role="alert"
            style={{ fontSize: "0.88rem", padding: "0.6rem 1rem", borderRadius: "10px", marginBottom: "1.2rem" }}
          >
            {statusMsg}
          </div>
        )}

        <form id="loginForm" onSubmit={handleLoginForm}>
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="loginEmail">Email Address / User ID</label>
            <input
              type="text"
              id="loginEmail"
              className="auth-input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              required
              autoFocus
            />
          </div>

          <div className="auth-input-group">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="auth-label mb-0" htmlFor="loginPassword">Password</label>
              <span style={{ fontSize: "0.8rem", color: "var(--bright-blue)", cursor: "pointer", fontWeight: "600" }}>Forgot?</span>
            </div>
            <input
              type="password"
              id="loginPassword"
              className="auth-input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary-glow w-100 py-3 mt-3" style={{ fontSize: "1rem" }} disabled={loading}>
            {loading ? "Authenticating..." : "Login to Terminal 🚀"}
          </button>
        </form>

        <div className="text-center mt-4 text-muted" style={{ fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--bright-blue)", fontWeight: "700", textDecoration: "none" }}>
            Open free account →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
