import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const { positions, setPositions, openBuyWindow, openSellWindow, showToast } = useContext(GeneralContext);

  const handleSquareOff = (stock) => {
    setPositions((prev) => prev.filter((item) => item.name !== stock.name));
    showToast(`Squared off position in ${stock.name} (${stock.qty} shares) successfully!`, "success");
  };

  // Calculations from live positions
  const totalDayPL = positions.reduce((acc, stock) => {
    const curVal = stock.price * stock.qty;
    return acc + (curVal - stock.avg * stock.qty);
  }, 0);

  const formatINR = (val) => {
    return Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="positions-container" style={{ padding: "10px 0" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h3 className="title" style={{ margin: 0 }}>
            Positions ({positions.length})
          </h3>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            Open Intraday & Delivery contracts
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{ fontSize: "0.9rem", color: "#555" }}>
            Total P&L:{" "}
            <strong className={totalDayPL >= 0 ? "profit" : "loss"}>
              {totalDayPL >= 0 ? "+" : ""}₹{formatINR(totalDayPL)}
            </strong>
          </span>
        </div>
      </div>

      {positions.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", background: "#fafafa", borderRadius: "8px" }}>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: "16px" }}>
            No open trading positions for today.
          </p>
          <button
            onClick={() => openBuyWindow("TATAMOTORS", 1065.20, "BUY")}
            className="btn btn-blue"
            style={{ border: "none", cursor: "pointer" }}
          >
            Open an Intraday Position
          </button>
        </div>
      ) : (
        <div className="order-table" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa", textAlign: "left" }}>
                <th style={{ padding: "10px 14px" }}>Product</th>
                <th style={{ padding: "10px 14px" }}>Instrument</th>
                <th style={{ padding: "10px 14px" }}>Qty.</th>
                <th style={{ padding: "10px 14px" }}>Avg.</th>
                <th style={{ padding: "10px 14px" }}>LTP</th>
                <th style={{ padding: "10px 14px" }}>Cur. Val</th>
                <th style={{ padding: "10px 14px" }}>P&L</th>
                <th style={{ padding: "10px 14px" }}>Chg.</th>
                <th style={{ padding: "10px 14px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const stockPL = curValue - stock.avg * stock.qty;
                const isProfit = stockPL >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock.name || index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          background: stock.product === "MIS" ? "#fff3e0" : "#e3f2fd",
                          color: stock.product === "MIS" ? "#e65100" : "#1565c0",
                          padding: "2px 6px",
                          borderRadius: "3px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {stock.product || "MIS"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: "#333" }}>
                      {stock.name}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 500 }}>{stock.qty}</td>
                    <td style={{ padding: "12px 14px" }}>{formatINR(stock.avg)}</td>
                    <td style={{ padding: "12px 14px", fontWeight: 500 }}>{formatINR(stock.price)}</td>
                    <td style={{ padding: "12px 14px" }}>{formatINR(curValue)}</td>
                    <td className={profClass} style={{ padding: "12px 14px", fontWeight: 600 }}>
                      {isProfit ? "+" : ""}{formatINR(stockPL)}
                    </td>
                    <td className={dayClass} style={{ padding: "12px 14px" }}>{stock.day || "+0.00%"}</td>
                    <td style={{ padding: "12px 14px", textAlign: "center" }}>
                      <button
                        onClick={() => openBuyWindow(stock.name, stock.price, "BUY")}
                        style={{
                          background: "#e3f2fd",
                          color: "#1976d2",
                          border: "none",
                          borderRadius: "3px",
                          padding: "3px 8px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          marginRight: "6px",
                        }}
                      >
                        + Add
                      </button>
                      <button
                        onClick={() => handleSquareOff(stock)}
                        style={{
                          background: "#ffebee",
                          color: "#c62828",
                          border: "none",
                          borderRadius: "3px",
                          padding: "3px 8px",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Square Off
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Positions;
