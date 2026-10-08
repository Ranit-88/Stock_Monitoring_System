import React from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
  return (
    <section className="py-5" style={{ background: "var(--bg-page)", position: "relative" }}>
      <div className="container py-4">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <div className="pill-badge mb-2">
            <span>⚡</span> TRANSPARENT PRICING
          </div>
          <h2 className="section-heading mb-3">
            Transparent. Simple. Zero Gimmicks.
          </h2>
          <p className="section-subtitle mx-auto">
            We revolutionized financial market pricing in India. Zero hidden charges, zero surprise account maintenance fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {/* Card 1: Equity Delivery */}
          <div className="pricing-card-pro">
            <div>
              <span className="pill-badge" style={{ fontSize: "0.72rem", marginBottom: "14px" }}>
                LONG-TERM INVESTING
              </span>
              <h4 style={{ fontWeight: "800", marginBottom: "4px" }}>Equity Delivery</h4>
              <p className="text-muted small" style={{ minHeight: "40px" }}>
                For investors looking to build long-term generational wealth across NSE & BSE equities.
              </p>

              <div className="pricing-hero-cost">
                ₹0 <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "500" }}>/ brokerage</span>
              </div>

              <hr style={{ borderColor: "var(--border-subtle)", margin: "20px 0" }} />

              <ul className="list-unstyled text-muted small d-flex flex-column gap-3 mb-4">
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> ₹0 brokerage on all delivery trades
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Free IPO applications via UPI
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Direct credit to your Demat account
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Free digital contract notes & tax reports
                </li>
              </ul>
            </div>

            <Link to="/signup" className="btn-secondary-outline w-100 text-center py-3">
              Get Started Free →
            </Link>
          </div>

          {/* Card 2: Intraday & F&O (Featured Most Popular) */}
          <div className="pricing-card-pro featured-card">
            <span className="pricing-badge-popular">MOST POPULAR</span>

            <div>
              <span className="pill-badge-teal" style={{ fontSize: "0.72rem", marginBottom: "14px" }}>
                ACTIVE TRADERS
              </span>
              <h4 style={{ fontWeight: "800", marginBottom: "4px", color: "var(--bright-blue)" }}>
                Intraday & F&O
              </h4>
              <p className="text-muted small" style={{ minHeight: "40px" }}>
                Flat fees for active derivative scalpers, equity intraday, and options traders.
              </p>

              <div className="pricing-hero-cost">
                ₹20 <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "500" }}>/ executed order</span>
              </div>

              <hr style={{ borderColor: "var(--border-subtle)", margin: "20px 0" }} />

              <ul className="list-unstyled text-muted small d-flex flex-column gap-3 mb-4">
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Flat ₹20 or 0.03% (whichever lower)
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Ultra-low latency order routing (0.05ms)
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Level 2 market depth & live Greeks
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Multi-leg options basket orders
                </li>
              </ul>
            </div>

            <Link to="/signup" className="btn-primary-glow w-100 text-center py-3">
              Open Trading Account →
            </Link>
          </div>

          {/* Card 3: Direct Mutual Funds */}
          <div className="pricing-card-pro">
            <div>
              <span className="pill-badge" style={{ fontSize: "0.72rem", marginBottom: "14px" }}>
                PASSIVE WEALTH
              </span>
              <h4 style={{ fontWeight: "800", marginBottom: "4px" }}>Direct Mutual Funds</h4>
              <p className="text-muted small" style={{ minHeight: "40px" }}>
                Invest directly in index funds, ELSS tax savers, and debt instruments with zero commission.
              </p>

              <div className="pricing-hero-cost">
                ₹0 <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: "500" }}>commission</span>
              </div>

              <hr style={{ borderColor: "var(--border-subtle)", margin: "20px 0" }} />

              <ul className="list-unstyled text-muted small d-flex flex-column gap-3 mb-4">
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> 0% distributor commissions
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Zero transaction & DP charges
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Instant UPI SIP mandate setup
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span style={{ color: "#10B981", fontWeight: "700" }}>✓</span> Unified portfolio dashboard
                </li>
              </ul>
            </div>

            <Link to="/signup" className="btn-secondary-outline w-100 text-center py-3">
              Explore Direct Funds →
            </Link>
          </div>
        </div>

        {/* Footer Link to Full Calculator */}
        <div className="text-center mt-5">
          <Link
            to="/pricing"
            className="d-inline-flex align-items-center gap-2"
            style={{ color: "var(--bright-blue)", fontWeight: "700", textDecoration: "none", fontSize: "0.95rem" }}
          >
            View Complete Brokerage & Regulatory Charges Calculator <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Pricing;