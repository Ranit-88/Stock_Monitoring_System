import React, { useState, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist } from "../data/data";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL"); // ALL, BANKING, IT, AUTO

  const filteredStocks = watchlist.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (stock.fullName && stock.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (stock.sector && stock.sector.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeCategory === "ALL") return matchesSearch;
    if (activeCategory === "BANKING") return matchesSearch && stock.sector === "Banking";
    if (activeCategory === "IT") return matchesSearch && stock.sector === "IT";
    if (activeCategory === "AUTO") return matchesSearch && stock.sector === "Automobile";
    return matchesSearch;
  });

  return (
    <div className="watchlist-container" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg: infy, reliance, tata, hdfc, pharma"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts">{filteredStocks.length} / {watchlist.length}</span>
      </div>

      {/* Quick Sector Filters */}
      <div style={{ display: "flex", gap: "6px", padding: "6px 12px", borderBottom: "1px solid #f0f0f0", overflowX: "auto" }}>
        {["ALL", "BANKING", "IT", "AUTO"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "2px 8px",
              fontSize: "0.75rem",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              background: activeCategory === cat ? "#4184f3" : "#f8f9fa",
              color: activeCategory === cat ? "#fff" : "#666",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stock List */}
      <ul className="list" style={{ overflowY: "auto", flex: 1, margin: 0, padding: 0 }}>
        {filteredStocks.length === 0 ? (
          <li style={{ padding: "20px", textAlign: "center", color: "#888", fontSize: "0.9rem" }}>
            No matching instruments found for "{searchTerm}"
          </li>
        ) : (
          filteredStocks.map((stock, index) => (
            <WatchListItem stock={stock} key={stock.name || index} />
          ))
        )}
      </ul>
    </div>
  );
};

export default WatchList;

export const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const { openChartModal } = useContext(GeneralContext);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
      onClick={() => openChartModal(stock)}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <div className="item">
        <div>
          <p className={stock.isDown ? "down" : "up"} style={{ margin: 0, fontWeight: 500 }}>
            {stock.name}
          </p>
          {stock.sector && (
            <span style={{ fontSize: "0.68rem", color: "#999" }}>{stock.sector}</span>
          )}
        </div>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="down" style={{ color: "#4caf50" }} />
          )}
          <span className="price">
            {Number(stock.price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      {showWatchlistActions && <WatchListAction stock={stock} />}
    </li>
  );
};

const WatchListAction = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = (e) => {
    e.stopPropagation();
    generalContext.openBuyWindow(stock.name, stock.price, "BUY");
  };

  const handleSellClick = (e) => {
    e.stopPropagation();
    generalContext.openSellWindow(stock.name, stock.price);
  };

  const handleAnalyticsClick = (e) => {
    e.stopPropagation();
    generalContext.openChartModal(stock);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button
            className="sell"
            style={{ background: "#ff5722", color: "#fff" }}
            onClick={handleSellClick}
          >
            Sell
          </button>
        </Tooltip>
        <Tooltip title="Analytics & Chart (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={handleAnalyticsClick}>
            <BarChartOutlinedIcon className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="Chart Modal" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={handleAnalyticsClick}>
            <MoreHorizIcon className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
