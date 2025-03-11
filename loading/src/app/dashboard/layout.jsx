"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  function toggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        closeSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(55deg, #1a2a74, #344468, #c0c0c0)",
          backgroundSize: "400% 400%",
          animation: "gradientMove 15s ease infinite",
        }}
      />
      
      <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} sidebarRef={sidebarRef} />

      <div className={`transition-all duration-300 ${isOpen ? "md:ml-80" : "ml-0"}`}>
        <Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
