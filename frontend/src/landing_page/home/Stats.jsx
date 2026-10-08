import React from 'react';
import { Link } from 'react-router-dom';

function Stats() {
  const stats = [
    { value: "1.5M+", title: "Active Traders", desc: "Retail & institutional accounts" },
    { value: "₹45,000+ Cr", title: "Daily Traded Turnover", desc: "Executed seamlessly on NSE & BSE" },
    { value: "99.99%", title: "Platform Availability", desc: "Zero downtime architecture" },
    { value: "₹0", title: "Equity Delivery Brokerage", desc: "Lifetime zero commission" },
  ];

  return (
    <section className="py-5" style={{ background: "var(--bg-page)", position: "relative" }}>
      <div className="container py-4">
        {/* Top Stats Cards Row */}
        <div className="row g-4 mb-5">
          {stats.map((st, idx) => (
            <div className="col-6 col-lg-3" key={idx}>
              <div className="stat-card-clean">
                <div className="stat-value">{st.value}</div>
                <div className="stat-title">{st.title}</div>
                <div className="text-muted small mt-1" style={{ fontSize: "0.78rem" }}>{st.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Split Trading Infrastructure Section */}
        <div className="row align-items-center g-5 pt-3">
          {/* Left Column: Feature Highlights */}
          <div className="col-lg-6">
            <div className="pill-badge mb-3">
              <span>⚡</span> ENTERPRISE INFRASTRUCTURE
            </div>

            <h2 className="section-heading mb-3">
              Built for speed, accuracy, and ruthless efficiency.
            </h2>

            <p className="section-subtitle mb-4">
              TradePulse combines co-located exchange fiber gateways, hardware-accelerated risk calculations, 
              and WebSocket data pipelines into a clean, distraction-free execution engine.
            </p>

            <div className="d-flex flex-column gap-4">
              {/* Feature 1 */}
              <div className="d-flex align-items-start gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(59, 111, 245, 0.1)",
                    color: "var(--bright-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  <h5 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "4px" }}>
                    Direct Market Access (DMA)
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    Direct routing to NSE & BSE order books with ultra-low latency matching and instant trade confirmations.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="d-flex align-items-start gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(66, 199, 181, 0.1)",
                    color: "var(--teal-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                </div>
                <div>
                  <h5 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "4px" }}>
                    Live Multi-Timeframe Analytics
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    Level 2 market depth with Top 5 bid/ask ladders, volume delta profiles, and multi-resolution OHLC charts.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="d-flex align-items-start gap-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(59, 111, 245, 0.1)",
                    color: "var(--bright-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h5 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "4px" }}>
                    Zero Hidden Charges
                  </h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                    Transparent fee structure with zero markup on exchange fees, zero software maintenance fees, and free account opening.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Trade Engine Status Dashboard */}
          <div className="col-lg-6">
            <div
              className="p-4 rounded-4 shadow-lg"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                boxShadow: "var(--card-shadow-hover)",
              }}
            >
              {/* Status Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-subtle">
                <div className="d-flex align-items-center gap-2">
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#10B981",
                      boxShadow: "0 0 10px #10B981",
                    }}
                  ></span>
                  <span style={{ fontWeight: "800", letterSpacing: "0.06em", fontSize: "0.82rem", color: "var(--bright-blue)" }}>
                    TRADE ENGINE STATUS
                  </span>
                </div>
                <span className="badge-up" style={{ fontSize: "0.75rem", padding: "4px 10px", borderRadius: "999px" }}>
                  ● ALL SYSTEMS OPERATIONAL
                </span>
              </div>

              {/* Engine Metrics Grid */}
              <div className="row g-3 text-center mb-4">
                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: "var(--bg-subtle)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Order Latency</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#10B981", fontFamily: "JetBrains Mono, monospace" }}>
                      0.05 ms
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: "var(--bg-subtle)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Nifty 50 Coverage</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--bright-blue)", fontFamily: "JetBrains Mono, monospace" }}>
                      100% Real-time
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: "var(--bg-subtle)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>API Response</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--teal-accent)", fontFamily: "JetBrains Mono, monospace" }}>
                      12 ms
                    </div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 rounded-3" style={{ background: "var(--bg-subtle)" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Security Standard</div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#F59E0B", fontFamily: "JetBrains Mono, monospace" }}>
                      SOC-2 / 256-bit
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Animated Waveform SVG */}
              <div style={{ height: "60px", width: "100%", position: "relative", marginBottom: "16px" }}>
                <svg viewBox="0 0 400 60" style={{ width: "100%", height: "100%" }}>
                  <path
                    d="M 0 30 Q 50 10, 100 35 T 200 20 T 300 40 T 400 15"
                    fill="none"
                    stroke="var(--bright-blue)"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                  <path
                    d="M 0 30 Q 50 10, 100 35 T 200 20 T 300 40 T 400 15 L 400 60 L 0 60 Z"
                    fill="rgba(59, 111, 245, 0.08)"
                  />
                </svg>
              </div>

              {/* Action Button inside Engine Card */}
              <Link to="/signup" className="btn-primary-glow w-100 py-3" style={{ fontSize: "0.95rem" }}>
                Start Trading on TradePulse →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;