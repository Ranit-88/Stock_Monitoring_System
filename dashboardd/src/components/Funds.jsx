import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import "./Funds.css";

const Funds = () => {
  const { funds, setFunds } = useContext(GeneralContext);

  // Modal visibility states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  // Form states
  const [addAmount, setAddAmount] = useState("");
  const [addPaymentMode, setAddPaymentMode] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBank, setWithdrawBank] = useState("HDFC Bank (•••• 4892)");

  // Status & processing states
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: '' }

  // Set default UPI ID from stored user if available
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.email) {
        setUpiId(`${user.email.split("@")[0]}@okhdfcbank`);
      }
    } catch (e) {}
  }, []);

  const formatINR = (val) => {
    return Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 4500);
  };

  // Quick Amount Handlers
  const handleQuickAdd = (amt) => {
    const current = parseFloat(addAmount) || 0;
    setAddAmount((current + amt).toString());
  };

  // 1. ADD FUNDS FUNCTION
  const handleAddFunds = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(addAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      showAlert("Please enter a valid amount greater than ₹0", "error");
      return;
    }

    if (addPaymentMode === "UPI" && !upiId.trim()) {
      showAlert("Please enter a valid UPI ID", "error");
      return;
    }

    setLoading(true);

    // Simulate payment gateway completion
    setTimeout(() => {
      const newTransaction = {
        id: `TXN${Date.now().toString().slice(-6)}`,
        type: "ADD",
        amount: amountNum,
        mode: addPaymentMode === "UPI" ? `UPI (${upiId})` : "Net Banking (HDFC)",
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Completed",
      };

      setFunds((prev) => ({
        ...prev,
        availableMargin: prev.availableMargin + amountNum,
        availableCash: prev.availableCash + amountNum,
        payin: prev.payin + amountNum,
        transactions: [newTransaction, ...(prev.transactions || [])],
      }));

      setLoading(false);
      setIsAddModalOpen(false);
      setAddAmount("");
      showAlert(`₹${formatINR(amountNum)} added successfully to your trading account!`, "success");
    }, 600);
  };

  // 2. WITHDRAW FUNDS FUNCTION
  const handleWithdrawFunds = (e) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      showAlert("Please enter a valid withdrawal amount greater than ₹0", "error");
      return;
    }

    if (amountNum > funds.availableCash) {
      showAlert(
        `Insufficient funds. Maximum withdrawable balance is ₹${formatINR(funds.availableCash)}`,
        "error"
      );
      return;
    }

    setLoading(true);

    // Simulate bank transfer processing
    setTimeout(() => {
      const newTransaction = {
        id: `TXN${Date.now().toString().slice(-6)}`,
        type: "WITHDRAW",
        amount: amountNum,
        mode: `Bank Transfer (${withdrawBank})`,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Completed",
      };

      setFunds((prev) => ({
        ...prev,
        availableMargin: Math.max(0, prev.availableMargin - amountNum),
        availableCash: Math.max(0, prev.availableCash - amountNum),
        transactions: [newTransaction, ...(prev.transactions || [])],
      }));

      setLoading(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount("");
      showAlert(
        `Withdrawal request for ₹${formatINR(amountNum)} processed successfully!`,
        "success"
      );
    }, 600);
  };

  const handleOpenCommodity = () => {
    setFunds((prev) => ({ ...prev, commodityEnabled: true }));
    showAlert("Commodity trading account activated successfully!", "success");
  };

  return (
    <div className="funds-wrapper">
      {/* Top Header & Buttons */}
      <div className="funds-header">
        <p className="funds-header-text">
          <span style={{ color: "#388e3c", fontSize: "1.1rem" }}>●</span> Instant, zero-cost fund transfers with UPI
        </p>
        <div className="funds-actions">
          <button
            className="btn-fund-action btn-fund-green"
            onClick={() => {
              setAlert(null);
              setIsAddModalOpen(true);
            }}
          >
            + Add funds
          </button>
          <button
            className="btn-fund-action btn-fund-blue"
            onClick={() => {
              setAlert(null);
              setIsWithdrawModalOpen(true);
            }}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {alert && (
        <div className={`funds-alert ${alert.type === "error" ? "funds-alert-error" : "funds-alert-success"}`}>
          <span>{alert.message}</span>
          <button className="funds-alert-close" onClick={() => setAlert(null)}>
            ×
          </button>
        </div>
      )}

      {/* Main Grid for Equity & Commodity */}
      <div className="funds-grid">
        {/* Equity Card */}
        <div className="funds-card">
          <div className="funds-card-header">
            <h3 className="funds-card-title">Equity</h3>
            <span style={{ fontSize: "0.82rem", color: "#16a34a", fontWeight: 600 }}>Active</span>
          </div>

          <div className="funds-card-body">
            <div className="funds-data-row">
              <p className="funds-label">Available margin</p>
              <p className="funds-value imp colored">{formatINR(funds.availableMargin)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Used margin</p>
              <p className="funds-value imp">{formatINR(funds.usedMargin)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Available cash</p>
              <p className="funds-value imp">{formatINR(funds.availableCash)}</p>
            </div>

            <hr className="funds-divider" />

            <div className="funds-data-row">
              <p className="funds-label">Opening Balance</p>
              <p className="funds-value">{formatINR(funds.openingBalance)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Previous Balance</p>
              <p className="funds-value">{formatINR(funds.prevOpeningBalance)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Payin</p>
              <p className="funds-value">{formatINR(funds.payin)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">SPAN</p>
              <p className="funds-value">{formatINR(funds.span)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Delivery margin</p>
              <p className="funds-value">{formatINR(funds.deliveryMargin)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Exposure</p>
              <p className="funds-value">{formatINR(funds.exposure)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Options premium</p>
              <p className="funds-value">{formatINR(funds.optionsPremium)}</p>
            </div>

            <hr className="funds-divider" />

            <div className="funds-data-row">
              <p className="funds-label">Collateral (Liquid funds)</p>
              <p className="funds-value">{formatINR(funds.collateralLiquid)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Collateral (Equity)</p>
              <p className="funds-value">{formatINR(funds.collateralEquity)}</p>
            </div>
            <div className="funds-data-row">
              <p className="funds-label">Total Collateral</p>
              <p className="funds-value">{formatINR(funds.totalCollateral)}</p>
            </div>
          </div>
        </div>

        {/* Commodity Card */}
        <div className="funds-card">
          <div className="funds-card-header">
            <h3 className="funds-card-title">Commodity</h3>
            <span style={{ fontSize: "0.82rem", color: funds.commodityEnabled ? "#16a34a" : "#64748b" }}>
              {funds.commodityEnabled ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="funds-card-body">
            {!funds.commodityEnabled ? (
              <div className="commodity-box">
                <p>You don't have an active commodity account</p>
                <button
                  className="btn-fund-action btn-fund-blue"
                  onClick={handleOpenCommodity}
                  style={{ maxWidth: "200px" }}
                >
                  Open Account
                </button>
              </div>
            ) : (
              <div>
                <div className="funds-data-row">
                  <p className="funds-label">Available margin</p>
                  <p className="funds-value imp colored">0.00</p>
                </div>
                <div className="funds-data-row">
                  <p className="funds-label">Used margin</p>
                  <p className="funds-value imp">0.00</p>
                </div>
                <div className="funds-data-row">
                  <p className="funds-label">Available cash</p>
                  <p className="funds-value imp">0.00</p>
                </div>
                <hr className="funds-divider" />
                <div className="funds-data-row">
                  <p className="funds-label">Opening Balance</p>
                  <p className="funds-value">0.00</p>
                </div>
                <div className="funds-data-row">
                  <p className="funds-label">Payin</p>
                  <p className="funds-value">0.00</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="transactions-section">
        <h4 style={{ margin: "0 0 12px", color: "#1e293b", fontSize: "1.05rem", fontWeight: 600 }}>
          Recent Fund Activity ({funds.transactions ? funds.transactions.length : 0})
        </h4>
        <div style={{ overflowX: "auto" }}>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Reference ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Payment Mode</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(funds.transactions || []).map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontFamily: "monospace", color: "#64748b" }}>{tx.id}</td>
                  <td>
                    <span className={tx.type === "ADD" ? "badge-deposit" : "badge-withdraw"}>
                      {tx.type === "ADD" ? "↓ Deposit" : "↑ Withdrawal"}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600, color: tx.type === "ADD" ? "#2e7d32" : "#c62828" }}>
                    {tx.type === "ADD" ? "+" : "-"}₹{formatINR(tx.amount)}
                  </td>
                  <td>{tx.mode}</td>
                  <td style={{ color: "#64748b" }}>{tx.date}</td>
                  <td>
                    <span className="badge-success">● {tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1. ADD FUNDS MODAL */}
      {isAddModalOpen && (
        <div className="funds-modal-overlay" onClick={() => !loading && setIsAddModalOpen(false)}>
          <div className="funds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="funds-modal-header">
              <h4>Add Funds</h4>
              <button
                className="funds-modal-close"
                onClick={() => !loading && setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddFunds}>
              <div className="funds-modal-body">
                <div className="funds-form-group">
                  <label htmlFor="depositAmount">Enter Amount (₹)</label>
                  <div className="funds-input-wrapper">
                    <span className="funds-currency-symbol">₹</span>
                    <input
                      id="depositAmount"
                      type="number"
                      min="1"
                      step="1"
                      className="funds-input"
                      placeholder="e.g. 5000"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                  <div className="quick-amounts">
                    {[500, 1000, 5000, 10000, 25000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        className="quick-amount-pill"
                        onClick={() => handleQuickAdd(amt)}
                      >
                        +₹{amt.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="funds-form-group">
                  <label>Payment Method</label>
                  <div className="payment-modes">
                    <div
                      className={`payment-mode-card ${addPaymentMode === "UPI" ? "active" : ""}`}
                      onClick={() => setAddPaymentMode("UPI")}
                    >
                      <p>UPI (Instant)</p>
                      <span>Google Pay, PhonePe, Paytm</span>
                    </div>
                    <div
                      className={`payment-mode-card ${addPaymentMode === "NETBANKING" ? "active" : ""}`}
                      onClick={() => setAddPaymentMode("NETBANKING")}
                    >
                      <p>Net Banking</p>
                      <span>HDFC Bank, ICICI, SBI</span>
                    </div>
                  </div>
                </div>

                {addPaymentMode === "UPI" ? (
                  <div className="funds-form-group">
                    <label htmlFor="upiIdInput">UPI ID / VPA</label>
                    <input
                      id="upiIdInput"
                      type="text"
                      className="funds-input"
                      style={{ paddingLeft: "14px" }}
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="bank-info-box">
                    <div>
                      <p className="bank-title">HDFC Bank Limited</p>
                      <p className="bank-subtitle">A/C: ••••••••••4892 (Primary)</p>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#388e3c", fontWeight: 600 }}>Linked</span>
                  </div>
                )}
              </div>

              <div className="funds-modal-footer">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit btn-fund-green"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Add ₹${addAmount ? formatINR(addAmount) : "0.00"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. WITHDRAW FUNDS MODAL */}
      {isWithdrawModalOpen && (
        <div
          className="funds-modal-overlay"
          onClick={() => !loading && setIsWithdrawModalOpen(false)}
        >
          <div className="funds-modal" onClick={(e) => e.stopPropagation()}>
            <div className="funds-modal-header">
              <h4>Withdraw Funds</h4>
              <button
                className="funds-modal-close"
                onClick={() => !loading && setIsWithdrawModalOpen(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleWithdrawFunds}>
              <div className="funds-modal-body">
                <div className="bank-info-box">
                  <div>
                    <p className="bank-subtitle">Withdrawable Balance</p>
                    <p className="bank-title" style={{ fontSize: "1.2rem", color: "#1976d2" }}>
                      ₹{formatINR(funds.availableCash)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="quick-amount-pill"
                    style={{ background: "#e0f2fe", color: "#0369a1", borderColor: "#bae6fd" }}
                    onClick={() => setWithdrawAmount(funds.availableCash.toString())}
                  >
                    Withdraw All
                  </button>
                </div>

                <div className="funds-form-group">
                  <label htmlFor="withdrawAmount">Amount to Withdraw (₹)</label>
                  <div className="funds-input-wrapper">
                    <span className="funds-currency-symbol">₹</span>
                    <input
                      id="withdrawAmount"
                      type="number"
                      min="1"
                      max={funds.availableCash}
                      step="1"
                      className="funds-input funds-input-blue"
                      placeholder="e.g. 2000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>

                <div className="funds-form-group">
                  <label>Receiving Bank Account</label>
                  <div className="bank-info-box">
                    <div>
                      <p className="bank-title">HDFC Bank Limited</p>
                      <p className="bank-subtitle">A/C: ••••••••••4892 (IFSC: HDFC0001234)</p>
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "#388e3c", fontWeight: 600 }}>Verified</span>
                  </div>
                </div>

                <p style={{ fontSize: "0.78rem", color: "#64748b", margin: "4px 0 0" }}>
                  ℹ️ Withdrawal requests placed before 8 PM are processed on the same business day directly to your linked primary bank account.
                </p>
              </div>

              <div className="funds-modal-footer">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsWithdrawModalOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit btn-fund-blue"
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Withdraw ₹${withdrawAmount ? formatINR(withdrawAmount) : "0.00"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
