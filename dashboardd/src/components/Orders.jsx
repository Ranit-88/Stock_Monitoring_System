import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { BACKEND_URL } from "../config";

const Orders = () => {
  const [filterType, setFilterType] = useState("ALL"); // ALL, BUY, SELL
  const [searchQuery, setSearchQuery] = useState("");
  const { orders, setOrders, openBuyWindow } = useContext(GeneralContext);

  useEffect(() => {
    // Optionally pull any latest from backend
    axios
      .get(`${BACKEND_URL}/allOrder`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setOrders((prev) => {
            const combined = [...prev, ...res.data];
            const unique = combined.filter(
              (v, i, a) =>
                a.findIndex(
                  (t) =>
                    t._id === v._id ||
                    (t.name === v.name && t.qty === v.qty && t.price === v.price && t.mode === v.mode)
                ) === i
            );
            return unique;
          });
        }
      })
      .catch(() => {});
  }, [setOrders]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.name?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === "BUY") return order.mode === "BUY";
    if (filterType === "SELL") return order.mode === "SELL";
    return true;
  });

  const totalOrderValue = filteredOrders.reduce(
    (acc, order) => acc + (order.price || 0) * (order.qty || 1),
    0
  );

  return (
    <div className="orders-container" style={{ padding: "10px 0" }}>
      {/* Header & Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h3 className="title" style={{ margin: 0 }}>
            Orders ({filteredOrders.length})
          </h3>
          <span style={{ fontSize: "0.85rem", color: "#666" }}>
            Total Turnover: ₹{totalOrderValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search orders..."
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
          <button
            onClick={() => openBuyWindow("RELIANCE", 2985.40, "BUY")}
            className="btn btn-blue"
            style={{ padding: "6px 14px", fontSize: "0.85rem", border: "none", cursor: "pointer" }}
          >
            + Place Order
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
        {["ALL", "BUY", "SELL"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: "4px 14px",
              borderRadius: "16px",
              border: "1px solid #ddd",
              background: filterType === type ? "#4184f3" : "#f8f9fa",
              color: filterType === type ? "#fff" : "#555",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", background: "#fafafa", borderRadius: "8px" }}>
          <p style={{ color: "#888", fontSize: "1rem", marginBottom: "16px" }}>
            {searchQuery ? `No orders found matching "${searchQuery}"` : "You haven't placed any orders today"}
          </p>
          <button
            onClick={() => openBuyWindow("RELIANCE", 2985.40, "BUY")}
            className="btn btn-blue"
            style={{ border: "none", cursor: "pointer" }}
          >
            Place your first order
          </button>
        </div>
      ) : (
        <div className="order-table" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f9fa", textAlign: "left" }}>
                <th style={{ padding: "10px 14px" }}>Time</th>
                <th style={{ padding: "10px 14px" }}>Type</th>
                <th style={{ padding: "10px 14px" }}>Instrument</th>
                <th style={{ padding: "10px 14px" }}>Product</th>
                <th style={{ padding: "10px 14px" }}>Qty.</th>
                <th style={{ padding: "10px 14px" }}>Price (₹)</th>
                <th style={{ padding: "10px 14px" }}>Total Value</th>
                <th style={{ padding: "10px 14px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((stock, index) => {
                const isBuy = stock.mode === "BUY";
                const totalVal = (stock.price || 0) * (stock.qty || 1);
                return (
                  <tr key={stock._id || index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 14px", color: "#666", fontSize: "0.85rem" }}>
                      {stock.time || "10:30 AM"}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          background: isBuy ? "#e3f2fd" : "#fbe9e7",
                          color: isBuy ? "#1976d2" : "#d84315",
                          padding: "3px 8px",
                          borderRadius: "3px",
                          fontSize: "0.78rem",
                          fontWeight: "600",
                        }}
                      >
                        {stock.mode || "BUY"}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: "#333" }}>
                      {stock.name}
                    </td>
                    <td style={{ padding: "12px 14px", color: "#666", fontSize: "0.85rem" }}>
                      {stock.product || "CNC"}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 500 }}>{stock.qty}</td>
                    <td style={{ padding: "12px 14px" }}>
                      {Number(stock.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px 14px", fontWeight: 500, color: "#333" }}>
                      ₹{totalVal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      {stock.status === "PENDING" ? (
                        <span
                          style={{
                            background: "#fffbeb",
                            color: "#d97706",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            border: "1px solid #fef3c7",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span style={{ animation: "pulse 1s infinite" }}>⏳</span> PENDING (3s)
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#16a34a",
                            fontWeight: 600,
                            fontSize: "0.82rem",
                          }}
                        >
                          ● EXECUTED
                        </span>
                      )}
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

export default Orders;
