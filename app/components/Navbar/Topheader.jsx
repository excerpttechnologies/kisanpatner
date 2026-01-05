'use client';

import React, { useState, useEffect } from "react";
import { Navigate } from "next/link";

const Topheader = ({ isLoggedIn, onLogout }) => {
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    // Check if user is logged in from sessionStorage
    const userLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      // Set isLoggedIn prop if user is logged in
      isLoggedIn = true;
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setIsScrolled(true);
        setLogoImage({
          ...logoImage,
          width: 150,
          height: 70,
          marginLeft: 20,
        });
      } else {
        setIsScrolled(false);
        setLogoImage({
          ...logoImage,
          width: 200,
          height: 70,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleLogout = () => {
    // Perform logout actions
    onLogout();
    setShowLogoutToast(true);
    // Hide the toast after 3 seconds
    setTimeout(() => {
      setShowLogoutToast(false);
      // Clear login status from sessionStorage
      sessionStorage.setItem("isLoggedIn", "false");
    }, 3000);
  };

  return (
    <div>
      <section id="navbar-1">
        <div className={`nav-content ${isScrolled ? "fixed-navbar" : ""} ` }>
          <div className="paragraph notification">
            <span style={{ marginLeft: "80px" }}>
              <a href="mailto:info@excerptech.com">
                <i className="fa-solid fa-envelope"></i>
                <span style={{ marginLeft: "5px" }}>
                  <b>info@excerptech.com</b>
                </span>
              </a>
              <a
                onclick="return gtag_report_conversion('tel:+916364657660');"
                href="tel:+916364657660"
                style={{ marginLeft: "20px" }}
              >
                <i className="fa-solid fa-phone"></i>
                <span style={{ marginLeft: "4px" }}>+91 63646 57660</span>
              </a>
            </span>
            <span style={{ marginLeft: "-50px" }}>
              {isLoggedIn ? (
                <a href="#" className="user-account" onClick={handleLogout}>
                  <i className="fa-solid fa-sign-out"></i> Logout
                </a>
              ) : (
                <a href="/login" className="user-account">
                  <i className="fa-solid fa-user-tie"></i> Login / Register
                </a>
              )}
            </span>
          </div>
        </div>
      </section>
      {showLogoutToast && (
        <div
          className="logout-toast"
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Logout successful
        </div>
      )}
    </div>
  );
};

export default Topheader;
