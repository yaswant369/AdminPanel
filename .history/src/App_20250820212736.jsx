import React, { useState, useEffect } from "react";
import "./App.css";

import DashboardMain from "../DashboardMain";
import Students from "./Students";
import Company from "./Company";
import Project from "./Project";
import Analytics from "./Analytics";
import MentorReview from "./MentorReview";
import Sidebar from "./Sidebar";

// Register Chart.js components

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // New state for project students

  // Smooth scroll to section on navigation click

  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);

  return (
    <div className="overflow-x-hidden  bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex  items-center px-4 py-3 bg-white shadow-md">
        {isMobile && (
          <button
            className="hamburger-button text-2xl cursor-pointer text-gray-700 mr-4 focus:outline-none"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>
        )}
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
          Admin Panel (Uptoskills Team Only)
        </h1>
      </header>

      <div className="flex pt-16 relative min-h-full ">
        {/* Sidebar */}
        <Sidebar className="md:min-h-[calc(100vh-4rem)] min-h-screen" />
        <main
          className={`flex-1 transition-all   duration-300 ease-in-out ${
            isSidebarOpen ? "md:ml-20" : "md:ml-20"
          }`}
        >
          <div className="p-4 sm:p-6">
            <DashboardMain />
            <Students />
            {/* Companies Section */}
            <Company />
            {/* Projects Section */}
            <Project />
            {/* Analytics  Section */}
            <Analytics />
            {/* mentor reviews Section */}
            <MentorReview />
          </div>
        </main>
      </div>
      <footer className="w-screen text-center mt-[50px] p-5 text-[0.9rem] text-[#555] bg-white rounded-xl shadow-zinc-900">
        <p>&copy; 2025 Uptoskills Team. All rights reserved. ✨</p>
      </footer>
    </div>
  );
}

export default App;
