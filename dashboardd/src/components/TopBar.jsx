import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  const [nifty, setNifty] = useState({
    name: "NIFTY 50",
    points: 24852.15,
    change: 142.30,
    percent: 0.58,
    isUp: true,
  });

  const [sensex, setSensex] = useState({
    name: "SENSEX",
    points: 81385.40,
    change: 410.25,
    percent: 0.51,
    isUp: true,
  });

  // Dynamic live market tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      const niftyFluctuation = (Math.random() * 2 - 0.95);
      setNifty((prev) => {
        const newPoints = +(prev.points + niftyFluctuation).toFixed(2);
        const newChange = +(prev.change + niftyFluctuation).toFixed(2);
        const newPercent = +((newChange / (newPoints - newChange)) * 100).toFixed(2);
        return {
          ...prev,
          points: newPoints,
          change: newChange,
          percent: newPercent,
          isUp: newChange >= 0,
        };
      });

      const sensexFluctuation = (Math.random() * 5 - 2.4);
      setSensex((prev) => {
        const newPoints = +(prev.points + sensexFluctuation).toFixed(2);
        const newChange = +(prev.change + sensexFluctuation).toFixed(2);
        const newPercent = +((newChange / (newPoints - newChange)) * 100).toFixed(2);
        return {
          ...prev,
          points: newPoints,
          change: newChange,
          percent: newPercent,
          isUp: newChange >= 0,
        };
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty" style={{ cursor: "pointer" }} title="NSE Benchmark Index">
          <p className="index" style={{ fontWeight: 600, color: "#444" }}>NIFTY 50</p>
          <p className={`index-points ${nifty.isUp ? "profit" : "loss"}`} style={{ fontWeight: 600, fontSize: "0.85rem" }}>
            {nifty.points.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className={`percent ${nifty.isUp ? "profit" : "loss"}`} style={{ fontSize: "0.78rem" }}>
            {nifty.isUp ? "+" : ""}{nifty.change.toFixed(2)} ({nifty.isUp ? "+" : ""}{nifty.percent}%)
          </p>
        </div>

        <div className="sensex" style={{ cursor: "pointer" }} title="BSE Benchmark Index">
          <p className="index" style={{ fontWeight: 600, color: "#444" }}>SENSEX</p>
          <p className={`index-points ${sensex.isUp ? "profit" : "loss"}`} style={{ fontWeight: 600, fontSize: "0.85rem" }}>
            {sensex.points.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </p>
          <p className={`percent ${sensex.isUp ? "profit" : "loss"}`} style={{ fontSize: "0.78rem" }}>
            {sensex.isUp ? "+" : ""}{sensex.change.toFixed(2)} ({sensex.isUp ? "+" : ""}{sensex.percent}%)
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
