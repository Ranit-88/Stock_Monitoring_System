import React from 'react';
import { Link } from 'react-router-dom';

function Education() {
  const modules = [
    {
      title: "Introduction to Stock Markets",
      lessons: "12 Lessons",
      level: "Beginner",
      badgeColor: "#10B981",
      progress: "100%",
    },
    {
      title: "Technical Analysis & Chart Patterns",
      lessons: "20 Lessons",
      level: "Intermediate",
      badgeColor: "var(--bright-blue)",
      progress: "75%",
    },
    {
      title: "Options Theory & Volatility Greeks",
      lessons: "18 Lessons",
      level: "Advanced",
      badgeColor: "#F59E0B",
      progress: "50%",
    },
    {
      title: "Algorithmic Trading with Python",
      lessons: "15 Lessons",
      level: "Advanced",
      badgeColor: "var(--teal-accent)",
      progress: "30%",
    },
  ];

  return (
    <section className="py-5" style={{ background: "var(--bg-subtle)", position: "relative" }}>
      <div className="container py-4">
        <div className="row align-items-center g-5">
          {/* Left Column: Academy Narrative */}
          <div className="col-lg-6">
            <div className="pill-badge mb-3">
              <span>🎓</span> PULSE ACADEMY
            </div>

            <h2 className="section-heading mb-3">
              Master the Markets. <br />
              Build Better Decisions.
            </h2>

            <p className="section-subtitle mb-4">
              Trading without financial literacy is costly. Pulse Academy is a completely free, 
              open-access education hub designed to take you from market fundamentals to quantitative derivative mastery.
            </p>

            {/* Quick Stats */}
            <div className="row g-3 mb-4">
              <div className="col-4">
                <div className="p-3 rounded-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--bright-blue)" }}>14+</div>
                  <div className="text-muted small" style={{ fontSize: "0.78rem" }}>Core Modules</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--teal-accent)" }}>100+</div>
                  <div className="text-muted small" style={{ fontSize: "0.78rem" }}>Video Lessons</div>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 rounded-3" style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)" }}>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#10B981" }}>100%</div>
                  <div className="text-muted small" style={{ fontSize: "0.78rem" }}>Free Access</div>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-primary-glow" style={{ padding: "12px 28px" }}>
              Start Learning Free →
            </Link>
          </div>

          {/* Right Column: Interactive Lesson Cards */}
          <div className="col-lg-6">
            <div
              className="p-4 rounded-4 shadow-sm"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-subtle">
                <span style={{ fontWeight: "800", fontSize: "0.88rem", letterSpacing: "0.04em", color: "var(--text-primary)" }}>
                  FEATURED LEARNING PATHWAYS
                </span>
                <span className="pill-badge-teal" style={{ fontSize: "0.72rem", padding: "2px 8px" }}>
                  UPDATED 2026
                </span>
              </div>

              <div className="d-flex flex-column gap-2">
                {modules.map((mod, idx) => (
                  <Link to="/about" key={idx} className="lesson-card">
                    <div style={{ flex: 1 }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <span
                          style={{
                            fontSize: "0.7rem",
                            fontWeight: "800",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: "rgba(59, 111, 245, 0.1)",
                            color: mod.badgeColor,
                            border: `1px solid ${mod.badgeColor}33`,
                          }}
                        >
                          {mod.level}
                        </span>
                        <span className="text-muted small">{mod.lessons}</span>
                      </div>
                      <h6 style={{ fontWeight: "700", margin: 0, fontSize: "0.98rem" }}>
                        {mod.title}
                      </h6>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <span style={{ color: "var(--bright-blue)", fontWeight: "700", fontSize: "1.1rem" }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;