import React from 'react';
import { Link } from 'react-router-dom';

function Awards() {
  return (
    <section className="py-5" style={{ background: "var(--bg-subtle)", position: "relative" }}>
      <div className="container py-4">
        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="pill-badge mb-2">
            <span>⚡</span> TRADEPULSE SUITE
          </div>
          <h2 className="section-heading mb-3">
            A Complete Suite for Every Kind of Trader
          </h2>
          <p className="section-subtitle mx-auto">
            From active intra-day scalpers to long-term wealth builders, TradePulse provides an integrated ecosystem engineered to win.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid">
          {/* 1. Large Card: Pulse Terminal (Span 8) */}
          <div className="bento-card bento-span-8">
            <div>
              <div className="d-flex justify-content-between align-items-start">
                <div className="bento-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <span className="pill-badge-teal" style={{ fontSize: "0.72rem" }}>FLAGSHIP PLATFORM</span>
              </div>

              <div className="bento-category">CORE TRADING ENGINE</div>
              <h3 className="bento-title">Pulse Terminal</h3>
              <p className="bento-desc" style={{ maxWidth: "580px" }}>
                Our ultra-fast web and mobile trading terminal featuring streaming market data, 
                multi-timeframe candlestick charting, instant Buy/Sell execution, and Level 2 market depth. 
                Built from the ground up for zero latency and maximum speed.
              </p>

              {/* Mini UI snapshot inside card */}
              <div
                className="p-3 rounded-3 mb-3 d-none d-md-block"
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div className="d-flex justify-content-between align-items-center text-muted small">
                  <span>⚡ 50 NIFTY EQUITIES LIVE</span>
                  <span>1-CLICK ORDER ROUTING</span>
                  <span>0.05ms EXECUTION</span>
                </div>
              </div>
            </div>

            <Link to="/products" className="bento-arrow">
              Explore Pulse Terminal <span>→</span>
            </Link>
          </div>

          {/* 2. Medium Card: Pulse Algo Connect (Span 4) */}
          <div className="bento-card bento-span-4">
            <div>
              <div className="bento-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="bento-category">ALGO & DEVELOPER API</div>
              <h3 className="bento-title">Pulse Algo Connect</h3>
              <p className="bento-desc">
                Super simple HTTP and WebSocket APIs in Python and Node.js to automate trading strategies and custom execution algorithms.
              </p>
            </div>

            <Link to="/products" className="bento-arrow">
              API Documentation <span>→</span>
            </Link>
          </div>

          {/* 3. Medium Card: Real-Time Nifty 50 Engine (Span 4) */}
          <div className="bento-card bento-span-4">
            <div>
              <div className="bento-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div className="bento-category">MARKET SURVEILLANCE</div>
              <h3 className="bento-title">Real-Time Nifty 50</h3>
              <p className="bento-desc">
                Continuous live tick feed for all 50 top Indian companies with sector categorizations, volume profiling, and day P&L calculations.
              </p>
            </div>

            <Link to="/products" className="bento-arrow">
              View Nifty Universe <span>→</span>
            </Link>
          </div>

          {/* 4. Compact Card: Smart Risk Guard (Span 4) */}
          <div className="bento-card bento-span-4">
            <div>
              <div className="bento-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="bento-category">RMS & PROTECTION</div>
              <h3 className="bento-title">Smart Risk Guard</h3>
              <p className="bento-desc">
                Automated stop-loss triggers, margin utilization tracking, and instant square-off safeguards to protect your hard-earned capital.
              </p>
            </div>

            <Link to="/products" className="bento-arrow">
              Risk Management <span>→</span>
            </Link>
          </div>

          {/* 5. Compact Card: Pulse Direct Wealth (Span 4) */}
          <div className="bento-card bento-span-4">
            <div>
              <div className="bento-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v12M8 10h8" />
                </svg>
              </div>
              <div className="bento-category">WEALTH & MUTUAL FUNDS</div>
              <h3 className="bento-title">Pulse Direct Wealth</h3>
              <p className="bento-desc">
                Invest in 2,500+ direct mutual funds, index funds, and sovereign gold bonds with zero distributor commission and direct Demat credit.
              </p>
            </div>

            <Link to="/products" className="bento-arrow">
              Explore Direct Funds <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;