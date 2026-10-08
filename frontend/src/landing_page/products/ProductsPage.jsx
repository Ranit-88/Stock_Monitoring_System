import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return ( 
    <div className="subpage-container">
      <Hero />
      <LeftSection  
        imageURL="/images/kite.png" 
        productName="Pulse Terminal" 
        productDesription="Our ultra-fast flagship trading platform with streaming market data, advanced multi-timeframe candlestick charts, instant Buy/Sell execution, and Level 2 depth. Experience the Pulse terminal seamlessly on Web, Android, and iOS." 
        tryDemo="Try demo"
        learnMore="Learn more" 
        googlePlay="" 
        appStore="" 
      />
      <RightSection 
        imageURL="/images/console.png" 
        productName="Pulse Insights" 
        productDesription="The central analytics and portfolio dashboard for your TradePulse account. Gain deep insights into your trades, sector distributions, and P&L analytics with institutional-grade visualizations." 
        learnMore="" 
      />
      <LeftSection  
        imageURL="/images/coin.png" 
        productName="Pulse Direct Wealth" 
        productDesription="Buy direct mutual funds online, 100% commission-free, delivered straight into your Demat account. Automate your investments with UPI SIP mandates." 
        tryDemo="" 
        learnMore="" 
        googlePlay="" 
        appStore="" 
      />
      <RightSection 
        imageURL="/images/kiteconnect.png" 
        productName="Pulse Algo Connect API" 
        productDesription="Build powerful algorithmic trading strategies and automated execution bots with our super simple HTTP and WebSocket APIs in Python, Node.js, and Java." 
        learnMore="" 
      />
      <LeftSection  
        imageURL="/images/varsity.png" 
        productName="Pulse Academy Mobile" 
        productDesription="A comprehensive collection of stock market lessons with rich visual illustrations and real-world trading case studies. Bite-sized modules designed for mobile learners." 
        tryDemo="" 
        learnMore="" 
        googlePlay="" 
        appStore="" 
      />
      <div className="container text-center my-5 py-3">
        <p className="text-muted fs-5">
          Interested in our high-throughput trading architecture? Explore our engineering docs at{" "}
          <span style={{ color: "var(--bright-blue)", fontWeight: "600", cursor: "pointer" }}>TradePulse.tech</span>
        </p>
      </div>
      <Universe />
    </div>
  );
}

export default ProductsPage;