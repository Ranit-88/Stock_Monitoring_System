import React from 'react';

function Hero() {
  return (
    <div className="container pt-5 mt-5">
      <div className="text-center pt-5 pb-3">
        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
          TRANSPARENT FEES
        </span>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#0f172a" }}>
          Simple, Competitive Pricing
        </h1>
        <p className="text-muted fs-5 mt-2" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Free equity delivery and flat ₹20 for active intraday and F&O derivatives
        </p>
      </div>

      <div className="row g-4 my-4 text-center">
        <div className="col-md-4">
          <div className="feature-card p-4">
            <img src="/images/pricingEquity.svg" alt="Free Equity" style={{ height: "140px" }} />
            <h3 className="fs-4 mt-3 fw-bold">Free Equity Delivery</h3>
            <p className="text-muted small mt-2">
              All long-term equity investments on NSE and BSE are 100% free with ₹0 brokerage.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card p-4">
            <img src="/images/intradayTrades.svg" alt="Intraday" style={{ height: "140px" }} />
            <h3 className="fs-4 mt-3 fw-bold">Intraday & F&O Trades</h3>
            <p className="text-muted small mt-2">
              Flat ₹20 or 0.03% (whichever is lower) per executed order across Equity Intraday, Futures, and Options.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="feature-card p-4">
            <img src="/images/pricingEquity.svg" alt="Direct MF" style={{ height: "140px" }} />
            <h3 className="fs-4 mt-3 fw-bold">Free Direct Mutual Funds</h3>
            <p className="text-muted small mt-2">
              Zero distributor commissions and zero DP charges on direct mutual fund investments and SIPs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;