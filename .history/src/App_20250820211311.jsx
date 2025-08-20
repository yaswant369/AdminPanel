import React, { useState, useEffect } from "react";
import "./App.css";
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import DashboardMain from "../DashboardMain";
import Students from "./Students";
import Company from "./Company";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("students"); // State for active section
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for mobile sidebar
  const [projects, setProjects] = useState([
    { id: 1, title: "AI Chatbot", mentor: "Dr. Reddy", students: 15 },
    { id: 2, title: "Resume Builder", mentor: "Ms. Sharma", students: 25 },
    { id: 3, title: "Data Analysis Tool", mentor: "Dr. Singh", students: 10 },
  ]);

  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectMentor, setNewProjectMentor] = useState("");
  const [newProjectStudents, setNewProjectStudents] = useState(""); // New state for project students

  const [analytics, setAnalytics] = useState({
    totalHires: 120,
    topCompanies: ["TCS", "Google", "Infosys"],
    avgPlacement: "6.5 LPA",
    mostPopularTech: "React.js",
    bestMentor: "Dr. Reddy",
    hireTrend: [
      { month: "Jan", hires: 10 },
      { month: "Feb", hires: 15 },
      { month: "Mar", hires: 20 },
      { month: "Apr", hires: 12 },
      { month: "May", hires: 18 },
      { month: "Jun", hires: 25 },
    ],
    placementDistribution: {
      "3-5 LPA": 30,
      "5-8 LPA": 50,
      "8-12 LPA": 25,
      "12+ LPA": 15,
    },
  });

  const [mentorReviews, setMentorReviews] = useState([
    {
      id: 1,
      mentor: "Dr. Reddy",
      feedback: "Excellent guidance for AI projects.",
      rating: 5,
    },
    {
      id: 2,
      mentor: "Ms. Sharma",
      feedback: "Resume Builder students had strong engagement.",
      rating: 4.8,
    },
    {
      id: 3,
      mentor: "Dr. Singh",
      feedback: "Provided insightful feedback on data projects.",
      rating: 4.5,
    },
  ]);

  const [newReviewMentor, setNewReviewMentor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState("");

  // Smooth scroll to section on navigation click
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

  const updateProjectStudents = (id, newStudentCount) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, students: parseInt(newStudentCount, 10) || 0 }
          : project
      )
    );
  };

  const removeProject = (id) => {
    const filtered = projects.filter((proj) => proj.id !== id);
    setProjects(filtered);
  };

  const addMentorReview = () => {
    if (newReviewMentor && newReviewText && newReviewRating) {
      const newId =
        mentorReviews.length > 0
          ? Math.max(...mentorReviews.map((r) => r.id)) + 1
          : 1;
      const review = {
        id: newId,
        mentor: newReviewMentor,
        feedback: newReviewText,
        rating: parseFloat(newReviewRating),
      };
      setMentorReviews([...mentorReviews, review]);
      setNewReviewMentor("");
      setNewReviewText("");
      setNewReviewRating("");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // Chart data for Hire Trend
  const hireTrendData = {
    labels: analytics.hireTrend.map((data) => data.month),
    datasets: [
      {
        label: "Hires per Month",
        data: analytics.hireTrend.map((data) => data.hires),
        backgroundColor: "rgba(254, 109, 53,0.6)",
        borderColor: "rgba(254, 109, 53,1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart data for Placement Distribution
  const placementDistributionData = {
    labels: Object.keys(analytics.placementDistribution),
    datasets: [
      {
        label: "Placement Distribution",
        data: Object.values(analytics.placementDistribution),
        backgroundColor: [
          "#9370DB",
          "rgba(0, 208, 181,1)",
          "rgba(254, 109, 53,0.6)",
          "#FF6384",
          // Orange // Purple
          // Pink-Red (new)
          ,
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 780);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <section
              id="projects"
              className="bg-white p-4 sm:p-6 mb-6 rounded-xl shadow-md"
            >
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
                Manage Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    placeholder="Enter project title..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mentor Name
                  </label>
                  <input
                    type="text"
                    value={newProjectMentor}
                    onChange={(e) => setNewProjectMentor(e.target.value)}
                    placeholder="Enter mentor name..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Students
                  </label>
                  <input
                    type="number"
                    value={newProjectStudents}
                    onChange={(e) => setNewProjectStudents(e.target.value)}
                    placeholder="Enter number..."
                    min="0"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                onClick={addProject}
                className="mb-6 bg-[#0781d9] hover:bg-[#025e9f] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add Project
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white p-4 shadow-zinc-300 rounded-lg shadow-sm  hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      Mentor:{" "}
                      <span className="font-medium">{project.mentor}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      Students:{" "}
                      <span className="font-medium">{project.students}</span>
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => removeProject(project.id)}
                        className="flex-1 bg-[#fe4d35] hover:bg-[#f52f15] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Remove
                      </button>

                      <button className="flex-1  bg-[#01c1b6] hover:bg-[#09706b] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                        Upskill
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            {/* Analytics  Section */}
            <section
              id="analytics"
              className="bg-white mb-6 p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
                Analytics - Insights Overview{" "}
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[25px] mb-[40px]">
                <div className="bg-[rgba(0,208,181,0.2)] p-[25px] shadow-[var(--shadow)] flex flex-col justify-between transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
                  <h3 className="mb-[12px] text-[1.2rem] text-[rgb(254,109,53)] font-semibold">
                    Total Hires
                  </h3>
                  <p className="font-bold text-[1.4rem] text-zinc-800">
                    {analytics.totalHires}
                  </p>
                  <div className="bg-[#e0e0e0] rounded-[10px] h-[12px] mt-[15px] overflow-hidden">
                    <div
                      className="bg-[rgba(254,109,53,0.8)] h-full rounded-[10px] transition-all duration-500 ease-out w-[70%]"
                      style={{
                        width: `${Math.min(
                          (analytics.totalHires / 200) * 100,
                          100
                        )}%`,
                      }} // Max 200 hires for visual scale
                    ></div>
                  </div>
                </div>

                <div className="bg-[rgba(0,208,181,0.2)] p-[25px] shadow-zinc-900 flex flex-col justify-between transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
                  <h3 className="mb-[12px] text-[1.2rem] text-[rgb(254,109,53)] font-semibold">
                    Top Companies
                  </h3>
                  <ul className="list-none pl-0 mt-3">
                    {analytics.topCompanies.map((company, i) => (
                      <li
                        key={i}
                        className="mb-2 text-[1rem] text-zinc-800 flex justify-end items-center gap-2"
                      >
                        <span role="img" aria-label="company"></span> {company}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[rgba(0,208,181,0.2)] p-[25px] shadow-zinc-900 flex flex-col justify-between transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
                  <h3 className="mb-[12px] text-[1.2rem] text-[rgb(254,109,53)] font-semibold">
                    Avg. Package
                  </h3>
                  <p className="font-bold text-[1.4rem] text-zinc-800">
                    {analytics.avgPlacement}
                  </p>
                </div>

                <div className="bg-[rgba(0,208,181,0.2)] p-[25px] shadow-zinc-900 flex flex-col justify-between transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
                  <h3 className="mb-[12px] text-[1.2rem] text-[rgb(254,109,53)] font-semibold">
                    Most Popular Tech
                  </h3>
                  <p className="font-bold text-[1.4rem] text-zinc-800">
                    <span role="img" aria-label="fire"></span>
                    {analytics.mostPopularTech}
                  </p>
                </div>

                <div className="bg-[rgba(0,208,181,0.2)] p-[25px] shadow-zinc-900 flex flex-col justify-between transition-transform duration-200 ease-in-out hover:-translate-y-[3px]">
                  <h3 className="mb-[12px] text-[1.2rem] text-[rgb(254,109,53)] font-semibold">
                    Top Mentor
                  </h3>
                  <p className="font-bold text-[1.4rem] text-zinc-800">
                    <span role="img" aria-label="trophy"></span>
                    {analytics.bestMentor}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
                <div className="max-h-[500px] min-h-[300px] bg-white p-[25px] rounded-xl shadow-[var(--shadow)] flex flex-col items-center justify-center">
                  <h3 className="mb-[20px] text-[1.4rem] text-black font-semibold">
                    Monthly Hire Trend
                  </h3>
                  <Bar
                    className="max-h-full w-full h-full"
                    data={hireTrendData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
                <div className="max-h-[500px] min-h-[300px] bg-white p-[25px] rounded-xl shadow-[var(--shadow)] flex flex-col items-center justify-center">
                  <h3 className="mb-[20px] text-[1.4rem] text-black font-semibold">
                    Placement Package Distribution
                  </h3>
                  <Pie
                    className="max-h-full w-full h-full"
                    data={placementDistributionData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </section>
            {/* mentor reviews Section */}
            <section
              id="mentor"
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
            >
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
                Mentor Reviews{" "}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="Searching">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mentor Name{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Mentor Name"
                    value={newReviewMentor}
                    onChange={(e) => setNewReviewMentor(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="Searching">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Text{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Review Text"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="Searching">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Review Rating{" "}
                  </label>
                  <input
                    type="number"
                    placeholder="Rating (0-5)"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(e.target.value)}
                    min="0"
                    max="5"
                    step="0.1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                onClick={addMentorReview}
                className="mb-6 bg-[#0781d9] hover:bg-[#025e9f] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Add Review
              </button>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[25px]">
                {mentorReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-[25px] bg-[#fdfdfd] shadow-[var(--shadow)] transition-transform duration-200 ease-in-out hover:-translate-y-[3px]"
                  >
                    <h4 className="mb-[10px] text-[1.25rem] text-[rgba(0,208,181,1)] font-semibold">
                      {review.mentor}
                    </h4>
                    <p className="italic text-[var(--text-dark)] mb-[10px] leading-[1.6]">
                      "{review.feedback}"
                    </p>
                    <div className="text-[1.3rem] text-[rgb(254,109,53)]">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
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
