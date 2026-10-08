import React from 'react';

function Hero() {
  return (
    <section className="container-fluid pt-5 mt-5" style={{ background: "linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)", color: "#fff" }}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom border-secondary">
          <h4 style={{ fontWeight: "700", margin: 0, letterSpacing: "-0.5px" }}>TradePulse Help Center</h4>
          <span style={{ color: "#38bdf8", fontWeight: "600", cursor: "pointer", fontSize: "0.9rem" }}>
            Track Support Tickets ↗
          </span>
        </div>

        <div className="row g-5 py-3">
          <div className="col-lg-7">
            <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "20px", lineHeight: "1.3" }}>
              Search for instant answers or create a support ticket
            </h2>
            <div className="position-relative mb-3">
              <input 
                type="text" 
                className="form-control form-control-lg border-0 shadow-sm px-4 py-3" 
                placeholder="Search eg: How to add funds with UPI, activate F&O, intraday margins..." 
                style={{ borderRadius: "12px", fontSize: "1rem" }}
              />
            </div>
            <div className="d-flex gap-3 flex-wrap mt-3 text-muted" style={{ fontSize: "0.88rem" }}>
              <span style={{ color: "#94a3b8" }}>Popular:</span>
              <span style={{ color: "#38bdf8", cursor: "pointer" }}>Account Opening</span>
              <span style={{ color: "#38bdf8", cursor: "pointer" }}>F&O Activation</span>
              <span style={{ color: "#38bdf8", cursor: "pointer" }}>Pulse Terminal Hotkeys</span>
              <span style={{ color: "#38bdf8", cursor: "pointer" }}>e-DIS Authorization</span>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="p-4 rounded-3" style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <h5 style={{ fontWeight: "700", marginBottom: "14px", color: "#fbbf24" }}>📌 Market Updates & Circulars</h5>
              <ol className="ps-3 mb-0" style={{ lineHeight: "1.8", fontSize: "0.9rem" }}>
                <li className="mb-2">
                  <span style={{ color: "#e2e8f0", cursor: "pointer" }}>Revised NSE F&O Expiry & Lot Size Rules</span>
                </li>
                <li>
                  <span style={{ color: "#e2e8f0", cursor: "pointer" }}>Instant UPI Fund Transfer Status & Timelines</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;