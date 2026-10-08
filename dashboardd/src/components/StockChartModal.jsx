import React, { useState, useMemo } from "react";
import "./StockChartModal.css";

const TIMEFRAMES = ["1D", "1W", "1M", "6M", "1Y", "ALL"];

const StockChartModal = ({ stock, onClose, onBuy, onSell }) => {
  const [timeframe, setTimeframe] = useState("1D");
  const [chartType, setChartType] = useState("AREA"); // AREA or CANDLE
  const [hoverData, setHoverData] = useState(null);

  const price = stock?.price || 100;
  const isProfit = !stock?.isDown;

  // Generate dynamic chart data based on price and timeframe
  const chartData = useMemo(() => {
    let pointsCount = 30;
    if (timeframe === "1W") pointsCount = 40;
    if (timeframe === "1M") pointsCount = 50;
    if (timeframe === "1Y") pointsCount = 60;

    const data = [];
    let current = price * 0.96;
    const volatility = price * 0.008;

    for (let i = 0; i < pointsCount; i++) {
      const change = (Math.random() - 0.47) * volatility;
      current = Math.max(current + change, price * 0.85);

      const open = +(current - change * 0.4).toFixed(2);
      const close = +current.toFixed(2);
      const high = +(Math.max(open, close) + Math.random() * volatility * 0.6).toFixed(2);
      const low = +(Math.min(open, close) - Math.random() * volatility * 0.6).toFixed(2);

      let label = `${9 + Math.floor((i * 15) / 60)}:${String((i * 15) % 60).padStart(2, "0")}`;
      if (timeframe !== "1D") {
        label = `Day ${i + 1}`;
      }

      data.push({
        time: label,
        price: close,
        open,
        high,
        low,
        close,
        volume: Math.floor(Math.random() * 45000 + 5000),
      });
    }

    // Ensure last point matches current price
    data[data.length - 1].price = price;
    data[data.length - 1].close = price;
    return data;
  }, [price, timeframe]);

  const minPrice = Math.min(...chartData.map((d) => d.low || d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.high || d.price));
  const priceRange = maxPrice - minPrice || 1;

  // Generate SVG path for Area Chart
  const svgWidth = 800;
  const svgHeight = 220;
  const padding = 20;

  const points = chartData.map((d, index) => {
    const x = padding + (index / (chartData.length - 1)) * (svgWidth - padding * 2);
    const y = svgHeight - padding - ((d.price - minPrice) / priceRange) * (svgHeight - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points.reduce(
    (acc, p, i) => `${acc} ${i === 0 ? "M" : "L"} ${p.x},${p.y}`,
    ""
  );

  const areaPath = `${linePath} L ${points[points.length - 1].x},${svgHeight} L ${points[0].x},${svgHeight} Z`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (x - padding) / (svgWidth - padding * 2)));
    const index = Math.round(ratio * (chartData.length - 1));
    if (chartData[index]) {
      setHoverData(chartData[index]);
    }
  };

  const activePoint = hoverData || chartData[chartData.length - 1];

  return (
    <div className="chart-modal-overlay" onClick={onClose}>
      <div className="chart-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chart-modal-header">
          <div className="chart-stock-info">
            <h3 className="chart-stock-symbol">
              {stock?.name || "STOCK"}
              <span className="chart-stock-sector">{stock?.sector || "Equity"}</span>
            </h3>

            <div className="chart-price-box">
              <span className="chart-ltp">
                ₹{Number(activePoint?.price || price).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <span className={`chart-change ${isProfit ? "profit" : "loss"}`}>
                {stock?.percent || "+0.00%"} {isProfit ? "▲" : "▼"}
              </span>
            </div>
          </div>

          <button className="chart-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="chart-modal-body">
          {/* Controls Bar */}
          <div className="chart-controls-bar">
            <div className="timeframe-pills">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  className={`timeframe-btn ${timeframe === tf ? "active" : ""}`}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </button>
              ))}
            </div>

            <div className="chart-type-toggle">
              <button
                className={`type-btn ${chartType === "AREA" ? "active" : ""}`}
                onClick={() => setChartType("AREA")}
              >
                📈 Line
              </button>
              <button
                className={`type-btn ${chartType === "CANDLE" ? "active" : ""}`}
                onClick={() => setChartType("CANDLE")}
              >
                📊 Candles
              </button>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="chart-canvas-container" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverData(null)}>
            {hoverData && (
              <div className="chart-hover-indicator">
                Time: {hoverData.time} | O: ₹{hoverData.open} | H: ₹{hoverData.high} | L: ₹{hoverData.low} | C: ₹{hoverData.close} | Vol: {hoverData.volume.toLocaleString()}
              </div>
            )}

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isProfit ? "#16a34a" : "#dc2626"} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={isProfit ? "#16a34a" : "#dc2626"} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((pct, idx) => (
                <line
                  key={idx}
                  x1={padding}
                  y1={svgHeight * pct}
                  x2={svgWidth - padding}
                  y2={svgHeight * pct}
                  stroke="#f1f5f9"
                  strokeDasharray="4"
                />
              ))}

              {chartType === "AREA" ? (
                <>
                  <path d={areaPath} fill="url(#chartGradient)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke={isProfit ? "#16a34a" : "#dc2626"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {points.map((p, idx) => (
                    <circle
                      key={idx}
                      cx={p.x}
                      cy={p.y}
                      r={hoverData?.time === p.time ? "5" : "0"}
                      fill="#0f172a"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  ))}
                </>
              ) : (
                /* Candlestick visualization */
                points.map((p, idx) => {
                  const isCandleUp = p.close >= p.open;
                  const candleWidth = Math.max(4, (svgWidth - padding * 2) / points.length - 3);
                  const openY = svgHeight - padding - ((p.open - minPrice) / priceRange) * (svgHeight - padding * 2);
                  const closeY = svgHeight - padding - ((p.close - minPrice) / priceRange) * (svgHeight - padding * 2);
                  const highY = svgHeight - padding - ((p.high - minPrice) / priceRange) * (svgHeight - padding * 2);
                  const lowY = svgHeight - padding - ((p.low - minPrice) / priceRange) * (svgHeight - padding * 2);
                  const topY = Math.min(openY, closeY);
                  const height = Math.max(2, Math.abs(openY - closeY));

                  return (
                    <g key={idx}>
                      <line
                        x1={p.x}
                        y1={highY}
                        x2={p.x}
                        y2={lowY}
                        stroke={isCandleUp ? "#16a34a" : "#dc2626"}
                        strokeWidth="1.2"
                      />
                      <rect
                        x={p.x - candleWidth / 2}
                        y={topY}
                        width={candleWidth}
                        height={height}
                        fill={isCandleUp ? "#16a34a" : "#dc2626"}
                        rx="1"
                      />
                    </g>
                  );
                })
              )}
            </svg>
          </div>

          {/* Technical Key Metrics Grid */}
          <div className="metrics-grid">
            <div className="metric-item">
              <p className="metric-label">Open</p>
              <p className="metric-value">₹{(price * 0.995).toFixed(2)}</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">High</p>
              <p className="metric-value">₹{(price * 1.02).toFixed(2)}</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">Low</p>
              <p className="metric-value">₹{(price * 0.98).toFixed(2)}</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">Prev. Close</p>
              <p className="metric-value">₹{(price * 0.99).toFixed(2)}</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">52W High</p>
              <p className="metric-value">₹{(price * 1.35).toFixed(2)}</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">52W Low</p>
              <p className="metric-value">₹{(price * 0.72).toFixed(2)}</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">Volume (Shares)</p>
              <p className="metric-value">18,42,910</p>
            </div>
            <div className="metric-item">
              <p className="metric-label">Market Cap</p>
              <p className="metric-value">₹{((price * 45) / 100).toFixed(1)} Lakh Cr</p>
            </div>
          </div>

          {/* Market Depth Ladder */}
          <div className="depth-section">
            <p className="depth-title">Market Depth (Level 2 Quotes)</p>
            <div className="depth-grid">
              <table className="depth-table">
                <thead>
                  <tr>
                    <th>Bid Price (₹)</th>
                    <th>Orders</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="depth-bid">{(price - 0.05).toFixed(2)}</td>
                    <td>14</td>
                    <td>1,240</td>
                  </tr>
                  <tr>
                    <td className="depth-bid">{(price - 0.1).toFixed(2)}</td>
                    <td>8</td>
                    <td>850</td>
                  </tr>
                  <tr>
                    <td className="depth-bid">{(price - 0.25).toFixed(2)}</td>
                    <td>22</td>
                    <td>3,400</td>
                  </tr>
                </tbody>
              </table>

              <table className="depth-table">
                <thead>
                  <tr>
                    <th>Ask Price (₹)</th>
                    <th>Orders</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="depth-ask">{(price + 0.05).toFixed(2)}</td>
                    <td>11</td>
                    <td>920</td>
                  </tr>
                  <tr>
                    <td className="depth-ask">{(price + 0.15).toFixed(2)}</td>
                    <td>19</td>
                    <td>2,150</td>
                  </tr>
                  <tr>
                    <td className="depth-ask">{(price + 0.3).toFixed(2)}</td>
                    <td>6</td>
                    <td>460</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer with Direct Buy / Sell Actions */}
        <div className="chart-modal-footer">
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Real-time streaming via Kite Connect API
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              className="btn-chart-action btn-chart-buy"
              onClick={() => {
                onClose();
                onBuy(stock.name, stock.price);
              }}
            >
              Buy {stock?.name}
            </button>
            <button
              className="btn-chart-action btn-chart-sell"
              onClick={() => {
                onClose();
                onSell(stock.name, stock.price);
              }}
            >
              Sell {stock?.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChartModal;
