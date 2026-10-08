import React from 'react';
import { Link } from 'react-router-dom';

function OpenAccount() {
  return (
    <section className="py-5" style={{ background: "var(--bg-page)", position: "relative" }}>
      <div className="container py-4">
        <div className="cta-banner text-center position-relative">
          <div className="row justify-content-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-9">
              <div className="pill-badge mb-3" style={{ background: "rgba(59, 111, 245, 0.2)", color: "#93C5FD", borderColor: "rgba(59, 111, 245, 0.4)" }}>
                <span>⚡</span> ZERO ACCOUNT OPENING FEE
              </div>

              <h2 className="section-heading mb-3" style={{ color: "#F8FAFC" }}>
                Ready to elevate your trading experience?
              </h2>

              <p className="mx-auto mb-4" style={{ color: "#CBD5E1", fontSize: "1.1rem", maxWidth: "680px", lineHeight: "1.6" }}>
                Join over 1.5 million smart traders on India's fastest growing trading platform. 
                Open your digital Demat & Trading account in under 5 minutes with zero paperwork.
              </p>

              <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
                <Link
                  to="/signup"
                  className="btn-primary-glow"
                  style={{ padding: "14px 34px", fontSize: "1.05rem" }}
                >
                  Open Demat Account for Free →
                </Link>
                <Link
                  to="/pricing"
                  className="btn-secondary-outline"
                  style={{
                    padding: "14px 28px",
                    fontSize: "1.05rem",
                    background: "rgba(255, 255, 255, 0.08)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "#F8FAFC",
                  }}
                >
                  Compare Brokerage ↗
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="d-flex justify-content-center gap-4 flex-wrap text-muted" style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
                <span>✓ Paperless KYC with Aadhaar</span>
                <span>•</span>
                <span>✓ Instant UPI Account Funding</span>
                <span>•</span>
                <span>✓ SEBI & NSE Regulated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenAccount;