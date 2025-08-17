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
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Amit Kumar",
      status: "pending",
      activity: "Logged in 2 days ago",
      progress: 75,
      lastLogin: "2025-07-19",
    },
    {
      id: 2,
      name: "Sneha Patel",
      status: "approved",
      activity: "Completed task 3",
      progress: 90,
      lastLogin: "2025-07-20",
    },
    {
      id: 3,
      name: "Rahul Mehta",
      status: "rejected",
      activity: "No recent activity",
      progress: 10,
      lastLogin: "2025-07-10",
    },
    {
      id: 4,
      name: "Priya Singh",
      status: "approved",
      activity: "Submitted final project",
      progress: 95,
      lastLogin: "2025-07-21",
    },
    {
      id: 5,
      name: "Mohit Sharma",
      status: "pending",
      activity: "Started new course",
      progress: 30,
      lastLogin: "2025-07-18",
    },
  ]);

  const [companies, setCompanies] = useState([
    { id: 1, name: "TCS", status: "pending", hires: 50 },
    { id: 2, name: "Infosys", status: "approved", hires: 70 },
    { id: 3, name: "Wipro", status: "rejected", hires: 20 },
    { id: 4, name: "Google", status: "approved", hires: 60 },
    { id: 5, name: "Microsoft", status: "approved", hires: 45 },
  ]);

  const [newCompany, setNewCompany] = useState("");
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

  const handleStudentApproval = (id, action) => {
    const updated = students.map((student) =>
      student.id === id ? { ...student, status: action } : student
    );
    setStudents(updated);
  };

  const handleCompanyApproval = (id, action) => {
    const updated = companies.map((company) =>
      company.id === id ? { ...company, status: action } : company
    );
    setCompanies(updated);
  };

  const addCompany = () => {
    if (newCompany.trim()) {
      const newId =
        companies.length > 0 ? Math.max(...companies.map((c) => c.id)) + 1 : 1;
      setCompanies([
        ...companies,
        { id: newId, name: newCompany, status: "pending", hires: 0 },
      ]);
      setNewCompany("");
    }
  };

  const addProject = () => {
    if (
      newProjectTitle.trim() &&
      newProjectMentor.trim() &&
      newProjectStudents.trim()
    ) {
      const newId =
        projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects([
        ...projects,
        {
          id: newId,
          title: newProjectTitle,
          mentor: newProjectMentor,
          students: parseInt(newProjectStudents, 10) || 0, // Parse as int, default to 0
        },
      ]);
      setNewProjectTitle("");
      setNewProjectMentor("");
      setNewProjectStudents("");
    }
  };

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

  const getActivityDetails = (student) => (
    <ul className="list-none p-0 mt-2 mb-4 text-[0.95rem]">
      <li className="mb-1 text-gray-500">Activity: {student.activity}</li>
      <li className="mb-1 text-gray-500">Last Login: {student.lastLogin}</li>
      <li className="mb-1 text-gray-500">
        Progress: <strong>{student.progress}%</strong>
      </li>
    </ul>
  );

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
    <div className="overflow-x-hidden min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 z-50 w-full flex items-center px-4 py-3 bg-white shadow-md">
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

      <div className="flex pt-16 gap-0 bg-amber-200">
        {/* Sidebar */}
        <aside
          className={`sidebar fixed md:static z-40 bg-gray-800 text-white h-full md:h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
            isSidebarOpen
              ? "left-0 w-64"
              : "-left-64 md:left-0 md:w-20 overflow-hidden"
          }`}
        >
          <div className="p-4 border-b border-gray-700">
            <img
              src="http://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png"
              alt="Uptoskills Logo"
              className={`block mx-auto ${isSidebarOpen ? "w-40" : "w-10"}`}
            />
          </div>
          {/* <h2>Uptoskills Admin</h2> */}
          <nav className="p-4">
            {[
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
            ].map((link) => (
              <button
                key={link.id}
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
              </button>
            ))}
          </nav>
        </aside>

        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <div className="p-4 sm:p-6">
            <DashboardMain />
            <section
              id="students"
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6"
            >
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
                Manage Students
              </h2>

              {/* Search bar */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search students..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              {/* Students grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {students
                  .filter((s) =>
                    s.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((student) => (
                    <div
                      key={student.id}
                      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
                        student.status === "approved"
                          ? "border-green-500"
                          : student.status === "rejected"
                          ? "border-red-500"
                          : "border-yellow-500"
                      } hover:shadow-md transition-shadow duration-200`}
                    >
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        {student.name}
                      </h3>
                      {getActivityDetails(student)}
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            student.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : student.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleStudentApproval(student.id, "approved")
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStudentApproval(student.id, "rejected")
                          }
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            {/* Companies Section */}
            <section
              id="companies"
              className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-6"
            >
              <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl border-b-2 border-blue-500 pb-2">
                Manage Companies
              </h2>

              {/* Search + Add Button */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Add new company..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  onClick={addCompany}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  Add Company
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
                      company.status === "approved"
                        ? "border-green-500"
                        : "border-red-500"
                    } hover:shadow-md transition-shadow duration-200`}
                  >
                    <h3 className="mb-2 sm:mb-3 text-lg sm:text-[1.3rem] text-gray-900 font-semibold">
                      {company.name}
                    </h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          company.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {company.status.charAt(0).toUpperCase() +
                          company.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleCompanyApproval(company.id, "approved")
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleCompanyApproval(company.id, "rejected")
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="projects" className="panel slide-in">
              <h2>Manage Projects </h2>
              <div className="add-item-form">
                <div className="Searching">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Project title..."
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    className="search-input "
                  />
                </div>

                <div className="Searching">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Mentor name..."
                    value={newProjectMentor}
                    onChange={(e) => setNewProjectMentor(e.target.value)}
                    className="search-input "
                  />
                </div>

                <div className="Searching">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="number"
                    placeholder="Number of students..."
                    value={newProjectStudents}
                    onChange={(e) => setNewProjectStudents(e.target.value)}
                    min="0"
                    className="search-input "
                  />
                </div>
                <button onClick={addProject} className="btn btn-primary">
                  Add Project
                </button>
              </div>
              <div className="card-container">
                {projects.map((project) => (
                  <div key={project.id} className="card fade-in">
                    <h3>{project.title}</h3>
                    <p>
                      Mentor: <strong>{project.mentor}</strong>
                    </p>
                    <p>
                      Students: <strong>{project.students}</strong>
                    </p>
                    <div className="actions">
                      <button
                        onClick={() => removeProject(project.id)}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                      <button className="btn btn-secondary">Upskill</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="analytics" className="panel slide-in">
              <h2>Analytics - Insights Overview </h2>
              <div className="analytics-grid">
                <div className="analytics-card fade-in">
                  <h3>Total Hires</h3>
                  <p className="metric-value">{analytics.totalHires}</p>
                  <div className="bar-wrapper">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.min(
                          (analytics.totalHires / 200) * 100,
                          100
                        )}%`,
                      }} // Max 200 hires for visual scale
                    ></div>
                  </div>
                </div>

                <div className="analytics-card fade-in">
                  <h3>Top Companies</h3>
                  <ul className="top-list">
                    {analytics.topCompanies.map((company, i) => (
                      <li key={i}>
                        <span role="img" aria-label="company"></span> {company}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="analytics-card fade-in">
                  <h3>Avg. Package</h3>
                  <p className="metric-value">{analytics.avgPlacement}</p>
                </div>

                <div className="analytics-card fade-in">
                  <h3>Most Popular Tech</h3>
                  <p className="metric-value">
                    <span role="img" aria-label="fire"></span>{" "}
                    {analytics.mostPopularTech}
                  </p>
                </div>

                <div className="analytics-card fade-in">
                  <h3>Top Mentor</h3>
                  <p className="metric-value">
                    <span role="img" aria-label="trophy"></span>{" "}
                    {analytics.bestMentor}
                  </p>
                </div>
              </div>

              <div className="charts-container">
                <div className="chart-card fade-in">
                  <h3>Monthly Hire Trend</h3>
                  <Bar
                    data={hireTrendData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
                <div className="chart-card fade-in">
                  <h3>Placement Package Distribution</h3>
                  <Pie
                    data={placementDistributionData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </section>

            <section id="mentor" className="panel slide-in">
              <h2>Mentor Reviews </h2>

              <div className="add-item-form">
                <div className="Searching">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Mentor Name"
                    value={newReviewMentor}
                    onChange={(e) => setNewReviewMentor(e.target.value)}
                    className="search-input "
                  />
                </div>

                <div className="Searching">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Review Text"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="search-input "
                  />
                </div>

                <div className="Searching">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className=""
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                  <input
                    type="number"
                    placeholder="Rating (0-5)"
                    value={newReviewRating}
                    onChange={(e) => setNewReviewRating(e.target.value)}
                    min="0"
                    max="5"
                    step="0.1"
                    className="search-input "
                  />
                </div>
                <button onClick={addMentorReview} className="btn btn-primary">
                  Add Review
                </button>
              </div>

              <div className="reviews-container">
                {mentorReviews.map((review) => (
                  <div key={review.id} className="review fade-in">
                    <h4>{review.mentor}</h4>
                    <p className="feedback-text">"{review.feedback}"</p>
                    <div className="stars">{renderStars(review.rating)}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      <footer className="footer">
        <p>&copy; 2025 Uptoskills Team. All rights reserved. ✨</p>
      </footer>
    </div>
  );
}

export default App;
