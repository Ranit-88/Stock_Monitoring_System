import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="tp-footer-redesign">
      <div className="container">
        {/* Main Columns Grid */}
        <div className="row g-4 mb-5">
          {/* Brand Col */}
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-inline-block mb-3">
              <img src="/images/logo.svg" alt="TradePulse" style={{ height: "36px" }} />
            </Link>
            <p style={{ fontSize: "0.92rem", lineHeight: "1.7", color: "#94A3B8", maxWidth: "340px" }}>
              TradePulse is India's next-generation trading and investment technology platform, 
              delivering ultra-low latency execution, real-time Nifty 50 market feeds, 
              and institutional-grade trading tools for retail investors.
            </p>
            <p style={{ fontSize: "0.82rem", color: "#64748B", marginTop: "16px" }}>
              &copy; 2024 - 2026 TradePulse Technologies Pvt. Ltd. All rights reserved.
            </p>
          </div>

          {/* Products Col */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#F8FAFC", fontWeight: "700", marginBottom: "16px", fontSize: "0.95rem" }}>
              Products
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.88rem" }}>
              <li><Link to="/products">Pulse Terminal</Link></li>
              <li><Link to="/products">Pulse Mobile</Link></li>
              <li><Link to="/products">Pulse Algo Connect</Link></li>
              <li><Link to="/products">Pulse Wealth</Link></li>
              <li><Link to="/pricing">Pricing & Charges</Link></li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#F8FAFC", fontWeight: "700", marginBottom: "16px", fontSize: "0.95rem" }}>
              Company
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.88rem" }}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about">Leadership & Team</Link></li>
              <li><Link to="/about">Careers</Link></li>
              <li><Link to="/support">Contact Support</Link></li>
              <li><Link to="/about">Pulse CSR</Link></li>
            </ul>
          </div>

          {/* Education Col */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#F8FAFC", fontWeight: "700", marginBottom: "16px", fontSize: "0.95rem" }}>
              Education
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.88rem" }}>
              <li><Link to="/about">Pulse Academy</Link></li>
              <li><Link to="/pricing">Brokerage Calculator</Link></li>
              <li><Link to="/pricing">Margin Calculator</Link></li>
              <li><Link to="/support">Market Holiday Calendar</Link></li>
              <li><Link to="/support">Knowledge Base</Link></li>
            </ul>
          </div>

          {/* Legal & Trust Col */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ color: "#F8FAFC", fontWeight: "700", marginBottom: "16px", fontSize: "0.95rem" }}>
              Legal & Trust
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: "0.88rem" }}>
              <li><Link to="/support">Terms & Conditions</Link></li>
              <li><Link to="/support">Privacy Policy</Link></li>
              <li><Link to="/support">Risk Disclosure</Link></li>
              <li><Link to="/support">Cybersecurity</Link></li>
              <li><Link to="/support">Investor Charter</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Risk Disclosures */}
        <div className="pt-4 border-top" style={{ borderColor: "rgba(255, 255, 255, 0.08)", fontSize: "0.78rem", lineHeight: "1.7", color: "#64748B" }}>
          <p className="mb-2">
            TradePulse Broking Technologies Ltd.: Member of NSE & BSE – SEBI Registration no.: INZ000088921. 
            Depository Participant with CDSL – SEBI Reg no.: IN-DP-188-2024. 
            Registered Office: TradePulse Financial Tower, Cyber City, Bangalore - 560103, Karnataka, India.
          </p>
          <p className="mb-2">
            <strong style={{ color: "#94A3B8" }}>Risk Disclosure on Derivatives:</strong> 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. 
            On an average, loss makers registered net trading loss close to ₹50,000. Over and above the net trading losses, loss makers expended an additional 28% of net trading losses as transaction costs. 
            Investments in securities market are subject to market risks; read all scheme related documents carefully before investing.
          </p>
          <p className="mb-0">
            Prevent Unauthorized Transactions in your account: Update your mobile numbers/email IDs with your stock brokers. 
            Receive information of your transactions directly from Exchange on your mobile/email at the end of the day.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;