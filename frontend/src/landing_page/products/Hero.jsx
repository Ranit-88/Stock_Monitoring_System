import React from 'react';

function Hero() {
  return ( 
    <div className="container text-center pt-5 mt-5 mb-5">
      <div className="pt-5">
        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-3">
          TECHNOLOGY ECOSYSTEM
        </span>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#0f172a" }}>
          TradePulse Suite
        </h1>
        <p className="text-muted fs-5 mt-2" style={{ maxWidth: "600px", margin: "0 auto" }}>
          Sleek, modern, and intuitive trading platforms engineered for maximum performance
        </p>
      </div>
      <hr className="mt-5 border-light-subtle" />
    </div>
  );
}

export default Hero;