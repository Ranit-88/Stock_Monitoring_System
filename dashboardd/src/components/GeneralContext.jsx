import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyActionWindow from "./BuyActionWindow";
import StockChartModal from "./StockChartModal";
import { holdings as defaultHoldings, positions as defaultPositions } from "../data/data";
import { BACKEND_URL } from "../config";

const DEFAULT_FUNDS = {
  availableMargin: 4043.10,
  usedMargin: 3757.30,
  availableCash: 4043.10,
  openingBalance: 4043.10,
  prevOpeningBalance: 3736.40,
  payin: 4064.00,
  span: 0.00,
  deliveryMargin: 0.00,
  exposure: 0.00,
  optionsPremium: 0.00,
  collateralLiquid: 0.00,
  collateralEquity: 0.00,
  totalCollateral: 0.00,
  commodityEnabled: false,
  transactions: [],
};

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price, mode) => {},
  openSellWindow: (uid, price) => {},
  closeBuyWindow: () => {},
  openChartModal: (stock) => {},
  closeChartModal: () => {},
  executeOrder: async (orderData) => {},
  holdings: [],
  positions: [],
  orders: [],
  funds: DEFAULT_FUNDS,
  setHoldings: () => {},
  setPositions: () => {},
  setOrders: () => {},
  setFunds: () => {},
  showToast: (msg, type) => {},
});

export const GeneralContextProvider = (props) => {
  // Buy / Sell Window States
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [orderMode, setOrderMode] = useState("BUY");

  // Chart Modal States
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [selectedChartStock, setSelectedChartStock] = useState(null);

  // Global State for Holdings, Positions, Orders, Funds
  const [holdings, setHoldings] = useState(() => {
    try {
      const saved = localStorage.getItem("stock_holdings_data");
      return saved ? JSON.parse(saved) : defaultHoldings;
    } catch (e) {
      return defaultHoldings;
    }
  });

  const [positions, setPositions] = useState(() => {
    try {
      const saved = localStorage.getItem("stock_positions_data");
      return saved ? JSON.parse(saved) : defaultPositions;
    } catch (e) {
      return defaultPositions;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("stock_local_orders");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [funds, setFunds] = useState(() => {
    try {
      const saved = localStorage.getItem("stock_funds_data");
      return saved ? JSON.parse(saved) : DEFAULT_FUNDS;
    } catch (e) {
      return DEFAULT_FUNDS;
    }
  });

  const [toast, setToast] = useState(null); // { message, type }

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("stock_holdings_data", JSON.stringify(holdings));
    } catch (e) {}
  }, [holdings]);

  useEffect(() => {
    try {
      localStorage.setItem("stock_positions_data", JSON.stringify(positions));
    } catch (e) {}
  }, [positions]);

  useEffect(() => {
    try {
      localStorage.setItem("stock_local_orders", JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem("stock_funds_data", JSON.stringify(funds));
    } catch (e) {}
  }, [funds]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleOpenBuyWindow = (uid, price = 0, mode = "BUY") => {
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
    setOrderMode(mode);
    setIsBuyWindowOpen(true);
  };

  const handleOpenSellWindow = (uid, price = 0) => {
    setSelectedStockUID(uid);
    setSelectedStockPrice(price);
    setOrderMode("SELL");
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
  };

  const handleOpenChartModal = (stock) => {
    setSelectedChartStock(stock);
    setIsChartModalOpen(true);
  };

  const handleCloseChartModal = () => {
    setIsChartModalOpen(false);
    setSelectedChartStock(null);
  };

  // CORE BUY & SELL EXECUTION ENGINE WITH 3-SECOND EXECUTION LIFECYCLE
  const executeOrder = async ({ name, qty, price, mode = "BUY", product = "CNC", orderType = "LIMIT" }) => {
    const qtyNum = parseInt(qty, 10);
    const priceNum = parseFloat(price);
    const orderTotal = qtyNum * priceNum;
    const orderId = `ORD_${Date.now()}`;

    if (mode === "BUY") {
      // 1. Check funds
      if (funds.availableCash < orderTotal) {
        showToast(
          `Insufficient funds! Order requires ₹${orderTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}, available is ₹${funds.availableCash.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
          "error"
        );
        return false;
      }

      // 2. Initial PENDING order
      const pendingOrder = {
        _id: orderId,
        name,
        qty: qtyNum,
        price: priceNum,
        mode: "BUY",
        product,
        orderType,
        status: "PENDING",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };

      setOrders((prev) => [pendingOrder, ...prev]);
      showToast(`⏳ Order placed! Processing BUY ${qtyNum} ${name} in exchange (3s)...`, "info");

      // 3. 3-Second Execution Timer
      setTimeout(async () => {
        // Deduct funds
        setFunds((prev) => ({
          ...prev,
          availableCash: Math.max(0, prev.availableCash - orderTotal),
          availableMargin: Math.max(0, prev.availableMargin - orderTotal),
          usedMargin: prev.usedMargin + orderTotal,
        }));

        // Update Holdings or Positions
        if (product === "CNC") {
          setHoldings((prev) => {
            const existingIndex = prev.findIndex((item) => item.name === name);
            if (existingIndex > -1) {
              const existing = prev[existingIndex];
              const newTotalQty = existing.qty + qtyNum;
              const newAvg = (existing.avg * existing.qty + priceNum * qtyNum) / newTotalQty;
              const updated = [...prev];
              updated[existingIndex] = {
                ...existing,
                qty: newTotalQty,
                avg: +newAvg.toFixed(2),
                price: priceNum,
                net: `${(((priceNum - newAvg) / newAvg) * 100).toFixed(2)}%`,
              };
              return updated;
            } else {
              return [
                ...prev,
                {
                  name,
                  qty: qtyNum,
                  avg: priceNum,
                  price: priceNum,
                  net: "+0.00%",
                  day: "+0.00%",
                  isLoss: false,
                },
              ];
            }
          });
        } else {
          // Intraday MIS
          setPositions((prev) => {
            const existingIndex = prev.findIndex((item) => item.name === name && item.product === "MIS");
            if (existingIndex > -1) {
              const existing = prev[existingIndex];
              const newTotalQty = existing.qty + qtyNum;
              const newAvg = (existing.avg * existing.qty + priceNum * qtyNum) / newTotalQty;
              const updated = [...prev];
              updated[existingIndex] = {
                ...existing,
                qty: newTotalQty,
                avg: +newAvg.toFixed(2),
                price: priceNum,
              };
              return updated;
            } else {
              return [
                ...prev,
                {
                  product: "MIS",
                  name,
                  qty: qtyNum,
                  avg: priceNum,
                  price: priceNum,
                  net: "+0.00%",
                  day: "+0.00%",
                  isLoss: false,
                },
              ];
            }
          });
        }

        // Mark status as EXECUTED
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId ? { ...ord, status: "EXECUTED" } : ord))
        );

        // Backend sync
        try {
          await axios.post(`${BACKEND_URL}/newOrder`, { ...pendingOrder, status: "EXECUTED" });
          await axios.post(`${BACKEND_URL}/updateHoldings`, { name, qty: qtyNum, price: priceNum, mode: "BUY" });
        } catch (e) {}

        showToast(`✅ BUY order #${orderId.slice(-4)} for ${qtyNum} ${name} @ ₹${priceNum} EXECUTED on NSE!`, "success");
      }, 3000);

      return true;
    } else if (mode === "SELL") {
      // 1. Check if holding exists for CNC sell
      if (product === "CNC") {
        const holding = holdings.find((item) => item.name === name);
        if (!holding || holding.qty < qtyNum) {
          showToast(
            `Insufficient holdings! You only own ${holding ? holding.qty : 0} shares of ${name}.`,
            "error"
          );
          return false;
        }
      }

      // 2. Initial PENDING order
      const pendingOrder = {
        _id: orderId,
        name,
        qty: qtyNum,
        price: priceNum,
        mode: "SELL",
        product,
        orderType,
        status: "PENDING",
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };

      setOrders((prev) => [pendingOrder, ...prev]);
      showToast(`⏳ Order placed! Processing SELL ${qtyNum} ${name} in exchange (3s)...`, "info");

      // 3. 3-Second Execution Timer
      setTimeout(async () => {
        if (product === "CNC") {
          setHoldings((prev) => {
            return prev
              .map((item) => {
                if (item.name === name) {
                  const remaining = item.qty - qtyNum;
                  return remaining > 0 ? { ...item, qty: remaining } : null;
                }
                return item;
              })
              .filter(Boolean);
          });
        } else {
          setPositions((prev) => {
            return prev
              .map((item) => {
                if (item.name === name && item.product === "MIS") {
                  const remaining = item.qty - qtyNum;
                  return remaining > 0 ? { ...item, qty: remaining } : null;
                }
                return item;
              })
              .filter(Boolean);
          });
        }

        // Credit funds
        setFunds((prev) => ({
          ...prev,
          availableCash: prev.availableCash + orderTotal,
          availableMargin: prev.availableMargin + orderTotal,
          usedMargin: Math.max(0, prev.usedMargin - orderTotal),
        }));

        // Mark status as EXECUTED
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId ? { ...ord, status: "EXECUTED" } : ord))
        );

        // Backend sync
        try {
          await axios.post(`${BACKEND_URL}/newOrder`, { ...pendingOrder, status: "EXECUTED" });
          await axios.post(`${BACKEND_URL}/updateHoldings`, { name, qty: qtyNum, price: priceNum, mode: "SELL" });
        } catch (e) {}

        showToast(`✅ SELL order #${orderId.slice(-4)} for ${qtyNum} ${name} @ ₹${priceNum} EXECUTED on NSE!`, "success");
      }, 3000);

      return true;
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openChartModal: handleOpenChartModal,
        closeChartModal: handleCloseChartModal,
        executeOrder,
        holdings,
        positions,
        orders,
        funds,
        setHoldings,
        setPositions,
        setOrders,
        setFunds,
        showToast,
      }}
    >
      {/* Global Notification Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            padding: "12px 20px",
            borderRadius: "6px",
            background:
              toast.type === "error"
                ? "#ffebee"
                : toast.type === "info"
                ? "#e0f2fe"
                : "#e8f5e9",
            color:
              toast.type === "error"
                ? "#c62828"
                : toast.type === "info"
                ? "#0369a1"
                : "#2e7d32",
            border: `1px solid ${
              toast.type === "error"
                ? "#ffcdd2"
                : toast.type === "info"
                ? "#bae6fd"
                : "#c8e6c9"
            }`,
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            fontSize: "0.9rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <span>
            {toast.type === "error"
              ? "⚠️"
              : toast.type === "info"
              ? "⏳"
              : "✅"}
          </span>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              color: "inherit",
              marginLeft: "10px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {props.children}

      {/* Buy / Sell Modal */}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          initialPrice={selectedStockPrice}
          initialMode={orderMode}
        />
      )}

      {/* Stock Analytics & Graph Modal */}
      {isChartModalOpen && selectedChartStock && (
        <StockChartModal
          stock={selectedChartStock}
          onClose={handleCloseChartModal}
          onBuy={(name, price) => handleOpenBuyWindow(name, price, "BUY")}
          onSell={(name, price) => handleOpenSellWindow(name, price)}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;