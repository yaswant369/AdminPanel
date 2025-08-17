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
    <ul className="activity-details">
      <li>Activity: {student.activity}</li>
      <li>Last Login: {student.lastLogin}</li>
      <li>
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

  return (
    <div>
      <header className="header bg-white">
        {!isSidebarOpen && (
          <div
            className="hamburger-menu text-black"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            ☰
          </div>
        )}

        <h1 className="dashAdmin">Admin Panel (Uptoskills Team Only)</h1>
      </header>

      <div
        className={`app flex min-h-[100vh] w-screen  bg-[#f5f7fa] text-[#1a1a1a] ${
          isSidebarOpen ? "appopen" : " appclose"
        }`}
      >
        {isSidebarOpen && (
          <aside
            onClick={(e) => {
              if (window.innerWidth < 768) {
                e.stopPropagation();
                setIsSidebarOpen(false);
              }
              if (window.innerWidth >= 768) {
                e.stopPropagation();
                setIsSidebarOpen(true);
              }
            }}
            className={`sidebar  ${
              isSidebarOpen
                ? "w-[250px] bg-[#1e293b] h-[80vh] text-white p-[20px] fixed top-[55%] "
                : "closed"
            }  `}
          >
            <img
              src="http://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png"
              className="  logo"
            />
            {/* <h2>Uptoskills Admin</h2> */}
            <nav>
              <div className="navIcons">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
                <a
                  href="#students"
                  className={activeSection === "students" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("students");
                    setIsSidebarOpen(false);
                  }}
                >
                  Dashboard
                </a>
              </div>
              <div className="navIcons">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <a
                  href="#students"
                  className={activeSection === "students" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("students");
                    setIsSidebarOpen(false);
                  }}
                >
                  Students
                </a>
              </div>

              <div className="navIcons">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 21h18v-2H3v2zm16-4V3H5v14H3v2h18v-2h-2zm-2 0H7V5h10v12zM9 7h2v2H9V7zm4 0h2v2h-2V7zm-4 4h2v2H9v-2zm4 0h2v2h-2v-2z" />
                </svg>

                <a
                  href="#companies"
                  className={activeSection === "companies" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("companies");
                    setIsSidebarOpen(false);
                  }}
                >
                  Companies
                </a>
              </div>

              <div className="navIcons">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                </svg>

                <a
                  href="#projects"
                  className={activeSection === "projects" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("projects");
                    setIsSidebarOpen(false);
                  }}
                >
                  Projects
                </a>
              </div>

              <div className="navIcons">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 22h16v-2H4v2zm2-4h2V10H6v8zm4 0h2V4h-2v14zm4 0h2v-6h-2v6zm4 0h2v-8h-2v8z" />
                </svg>

                <a
                  href="#analytics"
                  className={activeSection === "analytics" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("analytics");
                    setIsSidebarOpen(false);
                  }}
                >
                  Analytics
                </a>
              </div>

              <div className="navIcons">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 4h16v12H5.17L4 17.17V4zm0-2c-1.1 0-2 .9-2 2v20l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4z" />
                </svg>

                <a
                  href="#mentor"
                  className={activeSection === "mentor" ? "active" : ""}
                  onClick={() => {
                    setActiveSection("mentor");
                    setIsSidebarOpen(false);
                  }}
                >
                  Mentor Reviews
                </a>
              </div>
            </nav>
          </aside>
        )}

        <main
          className={`dashboard ${
            !isSidebarOpen
              ? "ml-0 p-[20px] w-[100%] absolute left-0 top-0 "
              : ""
          } `}
        >
          <DashboardMain />
          <section id="students" className="panel slide-in">
            <h2>Manage Students </h2>
            {/* <input
            type="text"
            placeholder="Search Students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          /> */}
            <div className="Searching">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 text-gray-500"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="search-input  "
              />
            </div>
            <div className="card-container">
              {students
                .filter((s) =>
                  s.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((student) => (
                  <div
                    key={student.id}
                    className={`card ${student.status} fade-in`}
                  >
                    <h3>{student.name}</h3>
                    {getActivityDetails(student)}
                    <p>
                      Status:{" "}
                      <span className={`status-badge ${student.status}`}>
                        {student.status}
                      </span>
                    </p>
                    <div className="actions">
                      <button
                        onClick={() =>
                          handleStudentApproval(student.id, "approved")
                        }
                        className="btn btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStudentApproval(student.id, "rejected")
                        }
                        className="btn btn-danger"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section id="companies" className="panel slide-in">
            <h2>Manage Companies </h2>
            <div className="add-item-form ">
              {/* <input
              type="text"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="Add new company name..."
            /> */}

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
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Add new company name..."
                  className="search-input "
                />
              </div>
              <button onClick={addCompany} className="btn btn-primary">
                Add Company
              </button>
            </div>
            <div className="card-container">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className={`card ${company.status} fade-in`}
                >
                  <h3>{company.name}</h3>
                  <p>
                    Status:{" "}
                    <span className={`status-badge ${company.status}`}>
                      {company.status}
                    </span>
                  </p>
                  <div className="actions">
                    <button
                      onClick={() =>
                        handleCompanyApproval(company.id, "approved")
                      }
                      className="btn btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleCompanyApproval(company.id, "rejected")
                      }
                      className="btn btn-danger"
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
        </main>
      </div>
      <footer className="footer">
        <p>&copy; 2025 Uptoskills Team. All rights reserved. ✨</p>
      </footer>
    </div>
  );
}

export default App;
