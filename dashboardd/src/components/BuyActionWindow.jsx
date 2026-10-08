import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, initialPrice = 0, initialMode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(initialPrice || 100.0);
  const [orderMode, setOrderMode] = useState(initialMode || "BUY");
  const [orderType, setOrderType] = useState("LIMIT"); // MARKET, LIMIT
  const [productType, setProductType] = useState("CNC"); // CNC, MIS
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { closeBuyWindow, executeOrder, funds, holdings } = useContext(GeneralContext);

  useEffect(() => {
    if (initialPrice > 0) {
      setStockPrice(initialPrice);
    }
  }, [initialPrice]);

  useEffect(() => {
    setOrderMode(initialMode);
  }, [initialMode]);

  const totalMargin = (parseFloat(stockQuantity || 0) * parseFloat(stockPrice || 0)).toFixed(2);
  const userHolding = holdings.find((h) => h.name === uid);

  const handleOrderSubmit = async (e) => {
    e?.preventDefault();
    const qtyNum = parseInt(stockQuantity, 10);
    const priceNum = parseFloat(stockPrice);

    if (isNaN(qtyNum) || qtyNum <= 0) {
      setErrorMsg("Please enter a valid quantity (min 1)");
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg("Please enter a valid price");
      return;
    }

    if (orderMode === "BUY" && funds.availableCash < qtyNum * priceNum) {
      setErrorMsg(`Insufficient cash! Required: ₹${(qtyNum * priceNum).toLocaleString("en-IN")}, Available: ₹${funds.availableCash.toLocaleString("en-IN")}`);
      return;
    }

    if (orderMode === "SELL" && productType === "CNC") {
      if (!userHolding || userHolding.qty < qtyNum) {
        setErrorMsg(`Insufficient holdings! You currently own ${userHolding ? userHolding.qty : 0} shares of ${uid}`);
        return;
      }
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const success = await executeOrder({
      name: uid,
      qty: qtyNum,
      price: priceNum,
      mode: orderMode,
      product: productType,
      orderType: orderType,
    });

    setIsSubmitting(false);
    if (success) {
      closeBuyWindow();
    }
  };

  return (
    <div
      className="container"
      id="buy-window"
      draggable="true"
      style={{
        borderColor: orderMode === "BUY" ? "#4184f3" : "#ff5722",
        zIndex: 1100,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header with Mode Toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid #eee",
          background: orderMode === "BUY" ? "#f0f6ff" : "#fff3f0",
        }}
      >
        <div>
          <span style={{ fontWeight: "700", fontSize: "1.05rem", color: "#222" }}>
            {orderMode} {uid}
          </span>
          <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "8px" }}>
            NSE • ₹{stockPrice}
          </span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            type="button"
            onClick={() => {
              setOrderMode("BUY");
              setErrorMsg("");
            }}
            style={{
              padding: "4px 10px",
              fontSize: "0.78rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background: orderMode === "BUY" ? "#4184f3" : "#e0e0e0",
              color: orderMode === "BUY" ? "#fff" : "#333",
            }}
          >
            BUY
          </button>
          <button
            type="button"
            onClick={() => {
              setOrderMode("SELL");
              setErrorMsg("");
            }}
            style={{
              padding: "4px 10px",
              fontSize: "0.78rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background: orderMode === "SELL" ? "#ff5722" : "#e0e0e0",
              color: orderMode === "SELL" ? "#fff" : "#333",
            }}
          >
            SELL
          </button>
        </div>
      </div>

      {/* Product & Order Types */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px 0", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", gap: "12px", fontSize: "0.85rem" }}>
          <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontWeight: 500 }}>
            <input
              type="radio"
              name="product"
              checked={productType === "CNC"}
              onChange={() => setProductType("CNC")}
            />
            Longterm CNC
          </label>
          <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", fontWeight: 500 }}>
            <input
              type="radio"
              name="product"
              checked={productType === "MIS"}
              onChange={() => setProductType("MIS")}
            />
            Intraday MIS
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px", fontSize: "0.85rem" }}>
          <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            <input
              type="radio"
              name="type"
              checked={orderType === "MARKET"}
              onChange={() => setOrderType("MARKET")}
            />
            Market
          </label>
          <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            <input
              type="radio"
              name="type"
              checked={orderType === "LIMIT"}
              onChange={() => setOrderType("LIMIT")}
            />
            Limit
          </label>
        </div>
      </div>

      {/* Holdings & Available Cash Badge */}
      <div style={{ padding: "6px 16px", fontSize: "0.78rem", color: "#666", display: "flex", justifyContent: "space-between" }}>
        <span>Owned in Portfolio: <strong>{userHolding ? userHolding.qty : 0} Qty</strong></span>
        <span>Available Cash: <strong>₹{funds.availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong></span>
      </div>

      {errorMsg && (
        <div style={{ color: "#c62828", background: "#ffebee", padding: "6px 16px", fontSize: "0.8rem", margin: "0 16px 8px", borderRadius: "4px" }}>
          {errorMsg}
        </div>
      )}

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price (₹)</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              disabled={orderType === "MARKET"}
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span style={{ fontSize: "0.82rem", color: "#555" }}>
          Margin required ₹{Number(totalMargin).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </span>
        <div>
          <button
            type="button"
            className={`btn ${orderMode === "BUY" ? "btn-blue" : ""}`}
            style={{
              background: orderMode === "BUY" ? "#4184f3" : "#ff5722",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
            onClick={handleOrderSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Executing..." : orderMode}
          </button>
          <button
            type="button"
            className="btn btn-grey"
            style={{ border: "none", cursor: "pointer" }}
            onClick={closeBuyWindow}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;