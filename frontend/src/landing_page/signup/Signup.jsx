import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL, getDashboardRedirectUrl } from "../../config";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignupForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");
    try {
      const response = await axios.post(`${BACKEND_URL}/signup`, {
        username: name.trim(),
        email: email.trim(),
        password: password,
      });

      setIsError(false);
      setStatusMsg("Account created successfully! Preparing your TradePulse dashboard...");

      // Automatically store JWT token and user info
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
      setStatusMsg(err.response?.data?.error || "Signup failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="pill-badge mb-2" style={{ fontSize: "0.72rem" }}>
            <span>⚡</span> DIGITAL DEMAT KYC
          </div>
          <h2 className="auth-title">Open Demat Account</h2>
          <p className="auth-subtitle">Zero brokerage on equity investments. 100% digital KYC in 5 mins.</p>
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

        <form id="signupForm" onSubmit={handleSignupForm}>
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="signupName">Full Legal Name</label>
            <input
              type="text"
              id="signupName"
              className="auth-input"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
              autoFocus
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="signupEmail">Email Address</label>
            <input
              type="email"
              id="signupEmail"
              className="auth-input"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="signupPhone">Mobile Number (Aadhaar linked)</label>
            <input
              type="tel"
              id="signupPhone"
              className="auth-input"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="signupPassword">Password</label>
            <input
              type="password"
              id="signupPassword"
              className="auth-input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
            />
          </div>

          <button type="submit" className="btn-primary-glow w-100 py-3 mt-3" style={{ fontSize: "1rem" }} disabled={loading}>
            {loading ? "Creating Account..." : "Create Free Account 🚀"}
          </button>
        </form>

        <div className="text-center mt-4 text-muted" style={{ fontSize: "0.82rem", lineHeight: "1.5" }}>
          By signing up, you agree to TradePulse's Terms of Service and Privacy Policy.
        </div>

        <div className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--bright-blue)", fontWeight: "700", textDecoration: "none" }}>
            Log in here →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;