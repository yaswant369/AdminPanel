import React, { useState, useEffect } from "react";

function Sidebar() {
  const [activeSection, setActiveSection] = useState("students"); // State for active section
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for mobile sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial check in case of direct link with hash
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="bg-blue-300 min-h-screen">
      <aside
        className={`min-h-screen top-0 left-0 fixed md:static z-40 bg-gray-800 text-white md:min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? "left-0 w-64"
            : "-left-64 md:left-0 md:w-20 overflow-hidden"
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
          {[
            {
              id: "dashboard",
              label: "Dashboard",
              href: "/dashboard",
              icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
            },
            {
              id: "students",
              label: "Students",
              href: "/students",
              icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
            },
            {
              id: "companies",
              label: "Companies",
              href: "/companies",
              icon: "M3 21h18v-2H3v2zm16-4V3H5v14H3v2h18v-2h-2zm-2 0H7V5h10v12zM9 7h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z",
            },
            {
              id: "projects",
              label: "Projects",
              href: "/projects",
              icon: "M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
            },
            {
              id: "analytics",
              label: "Analytics",
              href: "/analytics",
              icon: "M4 22h16v-2H4v2zm2-4h2V10H6v8zm4 0h2V4h-2v14zm4 0h2v-6h-2v6zm4 0h2v-8h-2v8z",
            },
            {
              id: "mentor",
              label: "Mentor Reviews",
              href: "/mentor-reviews",
              icon: "M4 4h16v12H5.17L4 17.17V4zm0-2c-1.1 0-2 .9-2 2v20l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z",
            },
          ].map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => {
                setActiveSection(link.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
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
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
