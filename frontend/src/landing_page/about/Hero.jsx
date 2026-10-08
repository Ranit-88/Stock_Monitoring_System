import React from 'react';

function Hero() {
  return (
    <div className="container pt-5 mt-5">
      <div className="text-center pt-5 pb-4">
        <span className="badge bg-primary-subtle text-primary fw-bold px-3 py-2 rounded-pill mb-3">
          OUR MISSION
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", maxWidth: "800px", margin: "0 auto" }}>
          We are engineering the future of high-speed retail trading & intelligent investing.
        </h1>
      </div>

      <div className="row p-4 mt-4 border-top border-light-subtle text-muted" style={{ lineHeight: "1.8", fontSize: "1.05rem" }}>
        <div className="col-lg-6 p-4">
          <p>
            TradePulse was founded with a relentless mission: to eliminate the friction, latency, and exorbitant fees 
            that traditional brokers impose on active traders and retail investors.
          </p> 
          <p>
            By leveraging modern web technologies, real-time WebSocket pipelines, and automated risk engines, 
            TradePulse delivers an institutional-grade trading terminal directly to your web browser and mobile phone.
          </p> 
          <p>
            Today, over 1.5 million traders rely on TradePulse to execute billions of rupees in daily turnover across 
            Equities, Futures, Options, and Mutual Funds with zero downtime.
          </p> 
        </div>

        <div className="col-lg-6 p-4">
          <p>
            Beyond our trading engine, TradePulse is committed to transparent financial education. 
            Through <strong>Pulse Academy</strong>, we provide free, comprehensive market education to empower 
            every individual with financial literacy.
          </p> 
          <p>
            Our open API architecture enables developers and fintech entrepreneurs to build custom trading 
            algorithms and innovative financial products on top of our high-throughput infrastructure.
          </p> 
          <p>
            We operate with zero proprietary trading desks — our only objective is to provide the best tools 
            for our clients to succeed in the financial markets.
          </p> 
        </div>
      </div>
    </div>
  );
}

export default Hero;