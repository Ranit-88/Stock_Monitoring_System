import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import './App.css'

function App() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const user = params.get("user");
      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("user", decodeURIComponent(user));
      }
      if (token || user) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      // Load saved theme
      const savedTheme = localStorage.getItem("trade_theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
    } catch (e) {
      console.error("Auth/Theme sync error:", e);
    }
  }, []);

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default App
