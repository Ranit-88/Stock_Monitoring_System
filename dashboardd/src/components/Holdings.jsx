import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { holdings, openBuyWindow, openSellWindow } = useContext(GeneralContext);

  const filteredHoldings = holdings.filter((stock) =>
    stock.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic Portfolio Calculations from live context
  const totalInvestment = holdings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0);
  const currentValue = holdings.reduce((acc, stock) => acc + stock.price * stock.qty, 0);
  const totalPL = currentValue - totalInvestment;
  const totalPLPercentage = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;
  const isOverallProfit = totalPL >= 0;

  const formatINR = (val) => {
    return Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="holdings-container" style={{ padding: "10px 0" }}>
      {/* Header & Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h3 className="title" style={{ margin: 0 }}>
            Holdings ({holdings.length})
          </h3>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            Long-term delivery portfolio (CNC)
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search holdings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {filteredHoldings.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", background: "#fafafa", borderRadius: "8px" }}>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: "16px" }}>
            {searchQuery ? `No holdings matching "${searchQuery}"` : "You don't have any stocks in your portfolio yet."}
          </p>
          <button
            onClick={() => openBuyWindow("RELIANCE", 2985.40, "BUY")}
            className="btn btn-blue"
            style={{ border: "none", cursor: "pointer" }}
          >
            Buy your first stock
          </button>
        </div>
      ) : (
        <div className="order-table" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa", textAlign: "left" }}>
                <th style={{ padding: "10px 14px" }}>Instrument</th>
                <th style={{ padding: "10px 14px" }}>Qty.</th>
                <th style={{ padding: "10px 14px" }}>Avg. cost</th>
                <th style={{ padding: "10px 14px" }}>LTP</th>
                <th style={{ padding: "10px 14px" }}>Cur. val</th>
                <th style={{ padding: "10px 14px" }}>P&L</th>
                <th style={{ padding: "10px 14px" }}>Net chg.</th>
                <th style={{ padding: "10px 14px" }}>Day chg.</th>
                <th style={{ padding: "10px 14px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.map((stock, index) => {
                const stockCurValue = stock.price * stock.qty;
                const stockPL = stockCurValue - stock.avg * stock.qty;
                const isProfit = stockPL >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={stock.name || index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: "#333" }}>
                      {stock.name}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 500 }}>{stock.qty}</td>
                    <td style={{ padding: "12px 14px" }}>{formatINR(stock.avg)}</td>
                    <td style={{ padding: "12px 14px", fontWeight: 500 }}>{formatINR(stock.price)}</td>
                    <td style={{ padding: "12px 14px" }}>{formatINR(stockCurValue)}</td>
                    <td className={profClass} style={{ padding: "12px 14px", fontWeight: 600 }}>
                      {isProfit ? "+" : ""}{formatINR(stockPL)}
                    </td>
                    <td className={profClass} style={{ padding: "12px 14px" }}>{stock.net || "+0.00%"}</td>
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
                        onClick={() => openSellWindow(stock.name, stock.price)}
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
                        Exit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Portfolio Summary Analytics Bar */}
      <div
        className="row"
        style={{
          marginTop: "30px",
          background: "#fafafa",
          padding: "20px 10px",
          borderRadius: "8px",
          border: "1px solid #eee",
        }}
      >
        <div className="col">
          <h5 style={{ fontSize: "1.3rem", fontWeight: 600, margin: "0 0 4px", color: "#333" }}>
            ₹{formatINR(totalInvestment)}
          </h5>
          <p style={{ margin: 0, color: "#777", fontSize: "0.85rem" }}>Total investment</p>
        </div>
        <div className="col">
          <h5 style={{ fontSize: "1.3rem", fontWeight: 600, margin: "0 0 4px", color: "#333" }}>
            ₹{formatINR(currentValue)}
          </h5>
          <p style={{ margin: 0, color: "#777", fontSize: "0.85rem" }}>Current value</p>
        </div>
        <div className="col">
          <h5
            className={isOverallProfit ? "profit" : "loss"}
            style={{ fontSize: "1.3rem", fontWeight: 600, margin: "0 0 4px" }}
          >
            {isOverallProfit ? "+" : ""}₹{formatINR(totalPL)} ({isOverallProfit ? "+" : ""}{totalPLPercentage.toFixed(2)}%)
          </h5>
          <p style={{ margin: 0, color: "#777", fontSize: "0.85rem" }}>Total P&L</p>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
