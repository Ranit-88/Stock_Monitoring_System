import React, { useState } from "react";
import { Link } from "react-router-dom";

import { FRONTEND_URL } from "../config";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem("user"));
  } catch (e) {}

  const username = storedUser?.username || storedUser?.name || "ZU";
  const initials = (username || "ZU").substring(0, 2).toUpperCase();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = `${FRONTEND_URL}/login?logged_out=true`;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <Link to="/" style={{ textDecoration: "none" }}>
        <img src="/logo.svg" style={{ height: "34px", width: "auto" }} alt="TradePulse" />
      </Link>
      <div className="menus">
        <ul>
          <li>
            <Link style={{textDecoration: "none"}} to="/" 
            onClick={()=> {handleMenuClick(0)}}>
            <p className={selectedMenu === 0 ? activeMenuClass: menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/orders" 
            onClick={()=> {handleMenuClick(1)}}>
            <p className={selectedMenu === 1 ? activeMenuClass: menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/holdings" 
            onClick={()=> {handleMenuClick(2)}}>
            <p className={selectedMenu === 2 ? activeMenuClass: menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/positions" 
            onClick={()=> {handleMenuClick(3)}}>
            <p className={selectedMenu === 3 ? activeMenuClass: menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/funds" 
            onClick={()=> {handleMenuClick(4)}}>
            <p className={selectedMenu === 4 ? activeMenuClass: menuClass}>Funds</p>
             </Link>
          </li>
          <li>
            <Link style={{textDecoration: "none"}} to="/apps" 
            onClick={()=> {handleMenuClick(5)}}>
            <p className={selectedMenu === 5 ? activeMenuClass: menuClass}>Apps</p>
            </Link>
          </li>
        </ul>
        <hr />
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Animated Dashboard Theme Switcher Pill */}
          <button
            className="dash-theme-pill"
            onClick={() => {
              const current = document.documentElement.getAttribute("data-theme") || "light";
              const next = current === "light" ? "dark" : "light";
              document.documentElement.setAttribute("data-theme", next);
              localStorage.setItem("trade_theme", next);
            }}
            title="Toggle Day/Night Mode"
            aria-label="Toggle theme"
          >
            <span className="dash-theme-icon">☀️</span>
            <span className="dash-theme-thumb"></span>
            <span className="dash-theme-icon">🌙</span>
          </button>

          <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", position: "relative" }}>
            <div className="avatar">{initials}</div>
            <p className="username">{username}</p>

            {isProfileDropdownOpen && (
              <div style={{
                position: "absolute",
                top: "45px",
                right: "0",
                background: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                padding: "10px 15px",
                zIndex: 100,
                minWidth: "140px",
                textAlign: "left"
              }}>
                <p style={{ margin: "0 0 5px", fontSize: "0.85rem", color: "#666" }}>{storedUser?.email || "Logged in"}</p>
                <hr style={{ margin: "5px 0" }} />
                <button 
                  onClick={handleLogout}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#d9534f",
                    cursor: "pointer",
                    padding: "4px 0",
                    fontSize: "0.9rem",
                    fontWeight: "600"
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
