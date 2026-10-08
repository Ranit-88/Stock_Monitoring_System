import React from 'react';

function Team() {
  return ( 
    <div className="container py-5">
      <div className="text-center mb-5 pb-3 border-top border-light-subtle pt-5">
        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-2">
          LEADERSHIP
        </span>
        <h2 style={{ fontSize: "2.4rem", fontWeight: "800", color: "#0f172a" }}>
          The Minds Behind TradePulse
        </h2>
      </div>

      <div className="row align-items-center g-5 py-3">
        <div className="col-lg-5 text-center">
          <img 
            src="/images/nithinKamath.jpg" 
            alt="Founder & CEO" 
            style={{ borderRadius: "20px", width: "75%", maxWidth: "300px", boxShadow: "0 15px 30px rgba(0,0,0,0.12)" }} 
          /> 
          <h4 className="mt-4 mb-1" style={{ fontWeight: "800", color: "#0f172a" }}>Nithin Kamath</h4>
          <h6 className="text-primary fw-bold">Founder, Chief Executive Officer</h6>
        </div>

        <div className="col-lg-7 text-muted" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
          <p>
            Nithin founded TradePulse to overcome the technological hurdles and latency he faced during his 
            decade-long career as a professional trader.
          </p> 
          <p>
            Today, TradePulse has redefined electronic broking and algorithmic trading in India, 
            championing zero brokerage on long-term capital allocation and flat fees on active trading.
          </p> 
          <p>
            He is an active advisor to regulatory market data committees and a dedicated supporter of open-source financial technology.
          </p>
          <div className="d-flex gap-3 mt-4">
            <span style={{ color: "#2563eb", fontWeight: "600", cursor: "pointer" }}>LinkedIn</span>
            <span>•</span>
            <span style={{ color: "#2563eb", fontWeight: "600", cursor: "pointer" }}>Twitter (X)</span>
            <span>•</span>
            <span style={{ color: "#2563eb", fontWeight: "600", cursor: "pointer" }}>Founder's Letter</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;