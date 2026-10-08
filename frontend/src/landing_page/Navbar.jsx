import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardRedirectUrl } from '../config';

function Navbar() {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("trade_theme") || "dark";
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (token) {
        setHasToken(true);
        setUser(storedUser);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("trade_theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? "navbar-scrolled" : ""}`}>
      <nav className="nav-pill-container">
        {/* Brand Logo */}
        <Link to="/" className="d-flex align-items-center text-decoration-none" style={{ gap: "8px" }}>
          <img src="/images/logo.svg" alt="TradePulse" style={{ height: "34px" }} />
        </Link>

        {/* Desktop Nav Links */}
        <div className="d-none d-lg-flex align-items-center" style={{ gap: "4px" }}>
          <Link className="nav-link-custom" to="/products">Products</Link>
          <Link className="nav-link-custom" to="/pricing">Pricing</Link>
          <Link className="nav-link-custom" to="/about">About</Link>
          <Link className="nav-link-custom" to="/support">Support</Link>
        </div>

        {/* Action Controls & Theme Toggle */}
        <div className="d-none d-lg-flex align-items-center" style={{ gap: "14px" }}>
          {/* Animated Pill Switch */}
          <button
            className="theme-switch-pill"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            aria-label="Toggle theme"
          >
            <span className="theme-switch-icon" style={{ opacity: theme === "light" ? 1 : 0.35 }}>☀️</span>
            <span className="theme-switch-thumb"></span>
            <span className="theme-switch-icon" style={{ opacity: theme === "dark" ? 1 : 0.35 }}>🌙</span>
          </button>

          {!hasToken ? (
            <>
              <Link to="/login" className="btn-secondary-outline" style={{ padding: "8px 18px", fontSize: "0.9rem" }}>
                Log In
              </Link>
              <Link to="/signup" className="btn-primary-glow" style={{ padding: "8px 20px", fontSize: "0.9rem" }}>
                Sign Up Free →
              </Link>
            </>
          ) : (
            <a
              className="btn-primary-glow"
              style={{ padding: "8px 20px", fontSize: "0.9rem" }}
              href={getDashboardRedirectUrl(localStorage.getItem("token"), user)}
            >
              Launch Dashboard 🚀
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="d-flex d-lg-none align-items-center" style={{ gap: "10px" }}>
          <button
            className="theme-switch-pill"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ width: "52px", height: "26px" }}
          >
            <span className="theme-switch-icon" style={{ opacity: theme === "light" ? 1 : 0.35 }}>☀️</span>
            <span className="theme-switch-thumb" style={{ width: "20px", height: "20px" }}></span>
            <span className="theme-switch-icon" style={{ opacity: theme === "dark" ? 1 : 0.35 }}>🌙</span>
          </button>

          <button
            className="btn btn-sm text-secondary border-0 p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div
          className="d-lg-none position-absolute w-100 px-3"
          style={{ top: "68px", left: 0, zIndex: 1040 }}
        >
          <div
            className="p-4 rounded-4 shadow-lg"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="d-flex flex-column gap-2 mb-3">
              <Link className="nav-link-custom py-2" to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link className="nav-link-custom py-2" to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link className="nav-link-custom py-2" to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link className="nav-link-custom py-2" to="/support" onClick={() => setMobileMenuOpen(false)}>Support</Link>
            </div>

            <div className="d-flex flex-column gap-2 pt-2 border-top border-subtle">
              {!hasToken ? (
                <>
                  <Link to="/login" className="btn-secondary-outline w-100 text-center" onClick={() => setMobileMenuOpen(false)}>
                    Log In
                  </Link>
                  <Link to="/signup" className="btn-primary-glow w-100 text-center" onClick={() => setMobileMenuOpen(false)}>
                    Sign Up Free →
                  </Link>
                </>
              ) : (
                <a
                  className="btn-primary-glow w-100 text-center"
                  href={getDashboardRedirectUrl(localStorage.getItem("token"), user)}
                >
                  Launch Dashboard 🚀
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
