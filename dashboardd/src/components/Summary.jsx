import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const [username, setUsername] = useState("User");
  const { holdings, funds } = useContext(GeneralContext);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name || storedUser?.username) {
        setUsername(storedUser.name || storedUser.username);
      }
    } catch (e) {}
  }, []);

  // Holdings calculations dynamically from context
  const totalInvestment = holdings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0);
  const currentValue = holdings.reduce((acc, stock) => acc + stock.price * stock.qty, 0);
  const totalPL = currentValue - totalInvestment;
  const totalPLPercent = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;
  const isProfit = totalPL >= 0;

  const formatINR = (val) => {
    return Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      {/* Equity & Margin Section */}
      <div className="section">
        <span>
          <p>Equity & Margins</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 style={{ color: "#1976d2" }}>₹{formatINR(funds.availableMargin)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{formatINR(funds.usedMargin)}</span>{" "}
            </p>
            <p>
              Opening balance <span>₹{formatINR(funds.openingBalance)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      {/* Holdings & Investment Section */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {isProfit ? "+" : ""}₹{formatINR(totalPL)}{" "}
              <small>({isProfit ? "+" : ""}{totalPLPercent.toFixed(2)}%)</small>
            </h3>
            <p>Total P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{formatINR(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>₹{formatINR(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
