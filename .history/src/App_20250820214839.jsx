import React, { useState, useEffect } from "react";

const App = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Navigation handler
  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    if (isMobile) setIsSidebarOpen(false);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Navigation data
  const navLinks = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    },
    {
      id: "students",
      label: "Students",
      icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    },
    {
      id: "companies",
      label: "Companies",
      icon: "M3 21h18v-2H3v2zm16-4V3H5v14H3v2h18v-2h-2zm-2 0H7V5h10v12zM9 7h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z",
    },
    {
      id: "projects",
      label: "Projects",
      icon: "M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: "M4 22h16v-2H4v2zm2-4h2V10H6v8zm4 0h2V4h-2v14zm4 0h2v-6h-2v6zm4 0h2v-8h-2v8z",
    },
    {
      id: "mentor",
      label: "Mentor Reviews",
      icon: "M4 4h16v12H5.17L4 17.17V4zm0-2c-1.1 0-2 .9-2 2v20l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`h-screen fixed top-0 left-0 z-40 bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-0 md:w-20 overflow-hidden"
        }`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700">
          <img
            src="http://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png"
            alt="Uptoskills Logo"
            className={`block mx-auto ${isSidebarOpen ? "w-40" : "w-10"}`}
          />
        </div>

        {/* Nav Links */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.id)}
              className={`flex items-center w-full p-3 rounded-lg mb-1 transition-colors duration-200 ${
                activeSection === link.id
                  ? "bg-blue-700 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={link.icon} />
              </svg>
              <span
                className={`${isSidebarOpen ? "block" : "hidden md:block"}`}
              >
                {link.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        {/* Top bar */}
        <header className="bg-white shadow py-4 px-6 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Panel (Uptoskills Team Only)
          </h1>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Notifications
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Content */}
          {activeSection === "dashboard" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Dashboard
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-2">Card {item}</h2>
                    <p className="text-gray-600">
                      Some dashboard content here...
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <p className="text-gray-600">More content here...</p>
              </div>
            </div>
          )}

          {/* Students Content */}
          {activeSection === "students" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Students
              </h1>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">
                  Student management content here...
                </p>
              </div>
            </div>
          )}

          {/* Add other sections similarly */}
        </main>
      </div>
    </div>
  );
};

export default App;
