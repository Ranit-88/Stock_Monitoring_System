import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  const platforms = [
    {
      name: "Pulse Capital",
      img: "/images/zerodhaFundhouse.png",
      desc: "Our asset management venture creating transparent, ultra-low expense index funds for disciplined wealth generation.",
    },
    {
      name: "Sensibull Options",
      img: "/images/sensibullLogo.svg",
      desc: "Comprehensive options trading suite for strategy building, Greek analytics, and Open Interest heatmaps.",
    },
    {
      name: "Tijori Market Research",
      img: "/images/tijori.svg",
      desc: "In-depth fundamental research platform covering sectoral supply chains, revenue drivers, and financial metrics.",
    },
    {
      name: "Streak Systematic Algo",
      img: "/images/streakLogo.png",
      desc: "No-code algorithmic trading engine enabling traders to backtest, optimize, and deploy live technical strategies.",
    },
    {
      name: "smallcase Thematic Baskets",
      img: "/images/smallcaseLogo.png",
      desc: "Diversified thematic portfolios of stocks and ETFs managed by leading SEBI-registered research analysts.",
    },
    {
      name: "Ditto Insurance",
      img: "/images/dittoLogo.png",
      desc: "Unbiased, spam-free health and term life insurance advisory tailored to protect your family's future.",
    },
  ];

  return (
    <div className="container text-center my-5 py-4">
      <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
        CONNECTED PLATFORMS
      </span>
      <h2 className="fw-bold" style={{ fontSize: "2.4rem", color: "#0f172a" }}>
        The TradePulse Ecosystem
      </h2>
      <p className="text-muted mb-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
        Extend your market edge with specialized partner integrations designed for serious traders.
      </p>

      <div className="row g-4">
        {platforms.map((platform, idx) => (
          <div key={idx} className="col-md-4">
            <div className="feature-card text-center p-4">
              <img src={platform.img} alt={platform.name} className="mb-3" style={{ height: "45px", objectFit: "contain" }} />
              <p className="text-muted small mt-2" style={{ lineHeight: "1.6" }}>{platform.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-3">
        <Link to="/signup" className="btn btn-tp-primary btn-lg px-5 py-3">
          Join TradePulse Free 🚀
        </Link>
      </div>
    </div>
  );
}

export default Universe;
