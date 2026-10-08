import React from "react";

function CreateTicket() {
  const topics = [
    {
      title: "Account Opening & KYC",
      icon: "👤",
      links: [
        "Online Paperless Demat Account Opening",
        "Aadhaar e-Sign & DigiLocker Verification",
        "NRI / Corporate Account Setup",
        "Charges & Account Maintenance",
        "Trading Segment Activation (F&O / MCX)",
      ],
    },
    {
      title: "Pulse Trading Terminal",
      icon: "💻",
      links: [
        "Interactive Charting & Timeframe Guide",
        "Order Types (Limit, Market, Stop-Loss)",
        "Hotkeys & 1-Click Order Execution",
        "Level 2 Market Depth Analysis",
        "Mobile App Download (iOS & Android)",
      ],
    },
    {
      title: "Funds, Deposits & Withdrawals",
      icon: "💳",
      links: [
        "Instant UPI Payin Status",
        "Same-Day Bank Withdrawal Timelines",
        "Adding/Linking Secondary Bank Accounts",
        "Pledge & Margin Collateral",
        "Failed Payment Troubleshooting",
      ],
    },
    {
      title: "Margins, Leverage & Risk (RMS)",
      icon: "⚡",
      links: [
        "Intraday Leverage (MIS vs CNC)",
        "Span & Exposure Margin Requirement",
        "Auto-Square Off Rules & Timings",
        "Option Buying & Selling Margins",
        "Peak Margin Circulars & Guidelines",
      ],
    },
    {
      title: "Portfolio, P&L & Tax Reports",
      icon: "📊",
      links: [
        "Understanding Holding P&L vs Day P&L",
        "Tax P&L Statement for ITR Filing",
        "Corporate Actions (Dividends, Splits, Bonus)",
        "e-DIS & T-PIN Demat Authorizations",
        "Mutual Fund SIP Tracking",
      ],
    },
    {
      title: "Pulse Algo API & Webhooks",
      icon: "⚙️",
      links: [
        "API Key Generation & Security",
        "Python & Node.js SDK Documentation",
        "WebSocket Streaming Price Feeds",
        "Order Execution Rate Limits",
        "Postback Webhooks Setup",
      ],
    },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5 pb-3">
        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
          HELP TOPICS
        </span>
        <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#0f172a" }}>
          Select a category to raise a support ticket
        </h2>
        <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Our dedicated 24/7 market support team typically resolves priority tickets within 30 minutes.
        </p>
      </div>

      <div className="row g-4">
        {topics.map((topic, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="feature-card p-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span style={{ fontSize: "1.4rem" }}>{topic.icon}</span>
                <h5 style={{ margin: 0, fontWeight: "700", color: "#0f172a", fontSize: "1.1rem" }}>
                  {topic.title}
                </h5>
              </div>
              <ul className="list-unstyled mb-0" style={{ lineHeight: "2.2", fontSize: "0.9rem" }}>
                {topic.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <span style={{ color: "#2563eb", cursor: "pointer", textDecoration: "none" }}>
                      • {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;