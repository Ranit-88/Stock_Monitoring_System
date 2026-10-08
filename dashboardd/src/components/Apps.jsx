import React, { useState } from "react";

const APPS_LIST = [
  {
    id: "streak",
    title: "Streak",
    category: "Algo & Tech",
    tag: "Algorithmic Trading",
    description: "Create, backtest, and deploy algorithmic trading strategies without coding.",
    color: "#ff5722",
    iconText: "⚡",
    status: "Connected",
  },
  {
    id: "sensibull",
    title: "Sensibull",
    category: "Options",
    tag: "Options Trading",
    description: "India's largest options trading platform. Real-time Greeks, Strategy Builder & P&L simulations.",
    color: "#1976d2",
    iconText: "📊",
    status: "Connect",
  },
  {
    id: "smallcase",
    title: "smallcase",
    category: "Thematic",
    tag: "Thematic Investing",
    description: "Modern investment products. Invest in diversified, professionally managed stock baskets.",
    color: "#2e7d32",
    iconText: "💼",
    status: "Connected",
  },
  {
    id: "tijori",
    title: "Tijori Finance",
    category: "Research",
    tag: "Fundamental Analysis",
    description: "Comprehensive operational metrics, product revenue breakdowns, and sector market share insights.",
    color: "#9c27b0",
    iconText: "🔍",
    status: "Connect",
  },
  {
    id: "goldenpi",
    title: "GoldenPi",
    category: "Fixed Income",
    tag: "Bonds & Debentures",
    description: "Discover and invest in high-yield corporate bonds, sovereign gold bonds, and fixed income assets.",
    color: "#d97706",
    iconText: "🪙",
    status: "Connect",
  },
  {
    id: "quicko",
    title: "Quicko",
    category: "Taxes",
    tag: "Tax Filing & P&L",
    description: "Seamless tax planning and ITR filing platform tailored for active traders and long-term investors.",
    color: "#0284c7",
    iconText: "🧾",
    status: "Connect",
  },
  {
    id: "varsity",
    title: "Pulse Academy",
    category: "Education",
    tag: "Trading Academy",
    description: "Free, open financial education portal with in-depth modules on technical analysis, risk, and derivatives.",
    color: "#059669",
    iconText: "🎓",
    status: "Explore",
  },
];

const Apps = () => {
  const [apps, setApps] = useState(APPS_LIST);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState("");

  const handleToggleConnect = (id) => {
    setApps((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          const isNowConnected = app.status !== "Connected";
          const newStatus = isNowConnected ? "Connected" : "Connect";
          setNotification(
            isNowConnected
              ? `Successfully connected ${app.title} to your trading account!`
              : `Disconnected ${app.title}.`
          );
          setTimeout(() => setNotification(""), 3500);
          return { ...app, status: newStatus };
        }
        return app;
      })
    );
  };

  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.description.toLowerCase().includes(search.toLowerCase()) ||
      app.tag.toLowerCase().includes(search.toLowerCase());

    if (activeCategory === "ALL") return matchesSearch;
    if (activeCategory === "ALGO_OPTIONS") return matchesSearch && (app.category === "Algo & Tech" || app.category === "Options");
    if (activeCategory === "RESEARCH_INVESTING") return matchesSearch && (app.category === "Thematic" || app.category === "Research" || app.category === "Fixed Income");
    if (activeCategory === "TAX_EDU") return matchesSearch && (app.category === "Taxes" || app.category === "Education");
    return matchesSearch;
  });

  return (
    <div className="apps-container" style={{ padding: "10px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h3 className="title" style={{ margin: 0 }}>
            TradePulse Ecosystem Apps
          </h3>
          <p style={{ margin: "2px 0 0", color: "#666", fontSize: "0.88rem" }}>
            Explore seamless integrations and third-party tools powered by Pulse Connect APIs
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search ecosystem apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "6px 12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "0.85rem",
              outline: "none",
            }}
          />
        </div>
      </div>

      {notification && (
        <div
          style={{
            background: "#e8f5e9",
            color: "#2e7d32",
            padding: "10px 16px",
            borderRadius: "6px",
            marginBottom: "18px",
            fontSize: "0.88rem",
            border: "1px solid #c8e6c9",
          }}
        >
          {notification}
        </div>
      )}

      {/* Category Pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px", flexWrap: "wrap" }}>
        {[
          { id: "ALL", label: "All Apps" },
          { id: "ALGO_OPTIONS", label: "Algo & Derivatives" },
          { id: "RESEARCH_INVESTING", label: "Research & Investing" },
          { id: "TAX_EDU", label: "Taxes & Learning" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: "4px 12px",
              borderRadius: "16px",
              border: "1px solid #ddd",
              background: activeCategory === cat.id ? "#1976d2" : "#f8f9fa",
              color: activeCategory === cat.id ? "#fff" : "#555",
              fontSize: "0.82rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Apps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredApps.map((app) => {
          const isConnected = app.status === "Connected";
          return (
            <div
              key={app.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "20px",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "8px",
                      background: `${app.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                    }}
                  >
                    {app.iconText}
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      background: "#f1f5f9",
                      color: "#475569",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {app.tag}
                  </span>
                </div>

                <h4 style={{ margin: "0 0 6px", fontSize: "1.1rem", color: "#1e293b" }}>{app.title}</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", lineHeight: "1.4" }}>
                  {app.description}
                </p>
              </div>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: isConnected ? "#16a34a" : "#64748b",
                  }}
                >
                  {isConnected ? "● Active" : "○ Not Connected"}
                </span>

                <button
                  onClick={() => handleToggleConnect(app.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "4px",
                    border: isConnected ? "1px solid #cbd5e1" : "none",
                    background: isConnected ? "#f8fafc" : "#1976d2",
                    color: isConnected ? "#475569" : "#fff",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {app.status}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Apps;
