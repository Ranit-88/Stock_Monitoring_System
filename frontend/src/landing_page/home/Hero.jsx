import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [niftyPrice, setNiftyPrice] = useState(24852.15);
  const [activeTab, setActiveTab] = useState("NIFTY 50");
  const [buyFeedback, setBuyFeedback] = useState(null);

  // Subtle real-time tick simulation for the mock terminal
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.48) * 1.8;
      setNiftyPrice((prev) => +(prev + delta).toFixed(2));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleQuickTrade = (type) => {
    setBuyFeedback(`${type} order placed!`);
    setTimeout(() => setBuyFeedback(null), 2500);
  };

  const tickerItems = [
    { name: "NIFTY 50", price: niftyPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 }), change: "+0.60%", isUp: true },
    { name: "SENSEX", price: "81,385.40", change: "+0.59%", isUp: true },
    { name: "BANK NIFTY", price: "51,240.80", change: "+0.61%", isUp: true },
    { name: "RELIANCE", price: "2,985.40", change: "+0.83%", isUp: true },
    { name: "HDFCBANK", price: "1,648.20", change: "-0.32%", isUp: false },
    { name: "TCS", price: "4,210.50", change: "+1.01%", isUp: true },
    { name: "INFY", price: "1,842.60", change: "+1.04%", isUp: true },
    { name: "ICICIBANK", price: "1,195.30", change: "-0.20%", isUp: false },
    { name: "BHARTIARTL", price: "1,460.10", change: "+0.72%", isUp: true },
    { name: "ITC", price: "492.30", change: "+0.45%", isUp: true },
  ];

  return (
    <>
      <section className="hero-container bg-grid-pattern">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Column: Hero Text & Value Proposition */}
            <div className="col-lg-6 text-center text-lg-start">
              <div className="pill-badge mb-3">
                <span>⚡</span> NEXT-GEN TRADING INFRASTRUCTURE
              </div>

              <h1 className="hero-heading">
                Trade Smarter. <br />
                Invest Faster. <br />
                <span className="hero-gradient-text">Built for Speed.</span>
              </h1>

              <p className="section-subtitle mx-auto mx-lg-0 mb-4" style={{ fontSize: "1.1rem" }}>
                Experience ultra-low latency execution, real-time market data across all 50 Nifty constituents, 
                advanced multi-timeframe analytics, and <strong>₹0 brokerage on equity delivery</strong>.
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-3 flex-wrap mb-4">
                <Link to="/signup" className="btn-primary-glow" style={{ padding: "14px 32px", fontSize: "1rem" }}>
                  Open Free Account →
                </Link>
                <Link to="/login" className="btn-secondary-outline" style={{ padding: "14px 28px", fontSize: "1rem" }}>
                  Explore Trading Terminal ↗
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-3 flex-wrap text-muted" style={{ fontSize: "0.85rem" }}>
                <span className="d-flex align-items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  256-bit encryption
                </span>
                <span>•</span>
                <span className="d-flex align-items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  0.05ms execution
                </span>
                <span>•</span>
                <span>₹0 equity delivery</span>
                <span>•</span>
                <span>SEBI / NSE regulated</span>
              </div>
            </div>

            {/* Right Column: High-End Mock Trading Terminal */}
            <div className="col-lg-6">
              <div className="hero-terminal-card">
                {/* Terminal Header */}
                <div className="terminal-header">
                  <div className="terminal-window-dots">
                    <span className="dot-circle dot-red"></span>
                    <span className="dot-circle dot-yellow"></span>
                    <span className="dot-circle dot-green"></span>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981" }}></span>
                    <span style={{ fontSize: "0.78rem", fontWeight: "700", letterSpacing: "0.06em", color: "var(--text-muted)" }}>
                      NSE / BSE LIVE FEED
                    </span>
                  </div>

                  <div className="pill-badge-teal" style={{ padding: "3px 10px", fontSize: "0.72rem" }}>
                    PRO 2.0
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="terminal-body">
                  {/* Top Bar: Index selector & Live Price */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <div className="d-flex gap-2 mb-1">
                        {["NIFTY 50", "BANK NIFTY", "SENSEX"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                              background: activeTab === tab ? "rgba(59, 111, 245, 0.15)" : "transparent",
                              border: `1px solid ${activeTab === tab ? "var(--bright-blue)" : "transparent"}`,
                              color: activeTab === tab ? "var(--bright-blue)" : "var(--text-muted)",
                              padding: "2px 8px",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: "700",
                              cursor: "pointer",
                            }}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="d-flex align-items-baseline gap-2">
                        <span style={{ fontSize: "1.4rem", fontWeight: "800", fontFamily: "JetBrains Mono, monospace" }}>
                          ₹{niftyPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                        <span className="badge-up" style={{ fontSize: "0.78rem", padding: "2px 6px", borderRadius: "4px" }}>
                          ▲ +148.20 (+0.60%)
                        </span>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleQuickTrade("BUY")}
                        className="btn-primary-glow"
                        style={{ padding: "6px 14px", fontSize: "0.8rem", borderRadius: "6px" }}
                      >
                        BUY (B)
                      </button>
                      <button
                        onClick={() => handleQuickTrade("SELL")}
                        style={{
                          background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                          color: "#fff",
                          border: "none",
                          padding: "6px 14px",
                          fontSize: "0.8rem",
                          borderRadius: "6px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        SELL (S)
                      </button>
                    </div>
                  </div>

                  {buyFeedback && (
                    <div className="p-2 mb-2 rounded text-center" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10B981", fontSize: "0.8rem", fontWeight: "600" }}>
                      ✓ {buyFeedback}
                    </div>
                  )}

                  {/* Mini Interactive SVG Candlestick & Area Waveform */}
                  <div style={{ height: "130px", width: "100%", position: "relative", marginBottom: "16px" }}>
                    <svg viewBox="0 0 500 130" style={{ width: "100%", height: "100%" }}>
                      <defs>
                        <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B6FF5" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#42C7B5" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="0" y1="35" x2="500" y2="35" stroke="var(--border-subtle)" strokeDasharray="3" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="var(--border-subtle)" strokeDasharray="3" />
                      <line x1="0" y1="110" x2="500" y2="110" stroke="var(--border-subtle)" strokeDasharray="3" />

                      {/* Area & Line */}
                      <path
                        d="M 0 90 Q 60 70, 120 85 T 240 45 T 360 60 T 500 25 L 500 130 L 0 130 Z"
                        fill="url(#heroChartGrad)"
                      />
                      <path
                        d="M 0 90 Q 60 70, 120 85 T 240 45 T 360 60 T 500 25"
                        fill="none"
                        stroke="#3B6FF5"
                        strokeWidth="2.5"
                      />

                      {/* Current Price Dot */}
                      <circle cx="500" cy="25" r="4.5" fill="#42C7B5" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Portfolio & Watchlist Quick Overview */}
                  <div className="row g-2 pt-2 border-top border-subtle">
                    <div className="col-6">
                      <div className="p-2 rounded-3" style={{ background: "var(--bg-subtle)" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Total Investment</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: "700" }}>₹3,84,210.00</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-2 rounded-3" style={{ background: "var(--bg-subtle)" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Total P&L</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: "700", color: "#10B981" }}>+₹18,420.50 (+4.8%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Ticker Strip */}
      <div className="ticker-strip">
        <div className="ticker-motion-track">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div className="ticker-chip" key={idx}>
              <span className="ticker-chip-symbol">{item.name}</span>
              <span className="ticker-chip-price">₹{item.price}</span>
              <span className={`ticker-chip-badge ${item.isUp ? "badge-up" : "badge-down"}`}>
                {item.isUp ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;