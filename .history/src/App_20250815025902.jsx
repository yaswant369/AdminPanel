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

  return (
    <div>
      <header className="mb-[30px] fixed top-0 left-0 z-[9] w-screen overflow-x-hidden text-center px-[30px] py-[20px] rounded-xl shadow-[var(--shadow)] bg-white">
        {!isSidebarOpen && (
          <div
            className=" hidden text-[2rem] cursor-pointer text-black z-[1001] md:block "
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            ☰
          </div>
        )}

        <h1 className="text-[2rem] flex items-center gap-[10px]">
          Admin Panel (Uptoskills Team Only)
        </h1>
      </header>

      <div
        className={`app  flex min-h-[100vh]  bg-[#f5f7fa] text-[#1a1a1a] ${
          isSidebarOpen ? "appopen" : " appclose"
        }`}
      >
        {isSidebarOpen && (
          <aside
            className={`sidebar fixed top-0 left-0 z-20 h-full p-5 bg-[#1e293b] text-white shadow-md transition-all duration-300 ${
              isSidebarOpen ? "w-[250px]" : "w-0 overflow-hidden"
            }`}
          >
            <img
              src="http://uptoskills.com/wp-content/uploads/2023/04/hd-logo-iguru.png"
              className="mb-6"
            />
            <nav className="flex flex-col gap-4">
              <a
                href="#dashboard"
                className={`px-3 py-2 rounded-lg hover:bg-slate-700 flex items-center gap-2 ${
                  activeSection === "dashboard" ? "bg-slate-800" : ""
                }`}
                onClick={() => setActiveSection("dashboard")}
              >
                <svg className="w-5 h-5">...</svg> Dashboard
              </a>
              {/* Repeat for other sections */}
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
          <section
            id="students"
            className="bg-white p-[30px] mb-[30px] rounded-xl shadow-[var(--shadow)] relative animate-[slideIn_0.5s_ease-out_forwards]"
          >
            <h2 className="mb-[25px] text-[1.7rem] border-b-2 border-[var(--accent)] pb-[10px] flex items-center gap-[10px]">
              Manage Students{" "}
            </h2>

            <div className="Searching  flex justify-center items-center mb-[20px] w-[100%]  relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 text-gray-500 left-3 absolute max-w-[3vw]  "
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="placeholder:pl-[3vw] focus:outline-none w-[100%] focus:ring-2 focus:ring-blue-500 search-input border-[#D1D5DB] border-2 rounded-[6px] text-[#6B7280] p-[12px]"
              />
            </div>
            <div className="grid   [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-[25px]">
              {students
                .filter((s) =>
                  s.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((student) => (
                  <div
                    key={student.id}
                    className={`bg-white  p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col justify-between ${student.status} fade-in`}
                  >
                    <h3 className="mb-3 text-[1.3rem] text-gray-900 font-semibold">
                      {student.name}
                    </h3>
                    {getActivityDetails(student)}
                    <p className="text-base text-gray-500 mb-2">
                      Status:{" "}
                      <span
                        className={` px-[10px] py-[4px] rounded-[5px] text-[0.85rem] font-bold text-zinc-800 ${student.status}`}
                      >
                        {student.status}
                      </span>
                    </p>
                    <div className="flex  flex-wrap gap-5">
                      <button
                        onClick={() =>
                          handleStudentApproval(student.id, "approved")
                        }
                        className=" text-white px-6 py-2 rounded-md mr-0 bg-[#00bda5]"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleStudentApproval(student.id, "rejected")
                        }
                        className="text-white px-6 py-2 rounded-md mr-0 bg-[#e74c3c]"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section
            id="companies"
            className="bg-white p-[30px] mb-[30px] rounded-xl shadow-[var(--shadow)] relative animate-[slideIn_0.5s_ease-out_forwards]"
          >
            <h2 className="mb-[25px] text-[1.7rem] border-b-2 border-[var(--accent)] pb-[10px] flex items-center gap-[10px]">
              Manage Companies{" "}
            </h2>
            <div className="flex gap-[15px] mb-[30px] flex-wrap">
              <div className="Searching flex justify-center items-center mb-[20px] w-[80%] relative">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 text-gray-500 left-3 absolute max-w-[3vw]  "
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="placeholder:pl-[3vw] w-[100%] focus:outline-none focus:ring-2 focus:ring-blue-500 search-input border-[#D1D5DB] border-2 rounded-[6px] text-[#6B7280] p-[12px]"
                />
              </div>
              <button
                onClick={addCompany}
                className=" bg-[#00aaff] text-white px-5 h-[7vh] rounded-lg cursor-pointer text-base font-medium border-0 transition duration-200 ease-in-out hover:bg-[#016ca2] hover:-translate-y-[2px]"
              >
                Add Company
              </button>
            </div>
            <div className="grid   [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] gap-[25px]">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className={`bg-white ${
                    company.status == "approved"
                      ? "border-l-4 border-[#00bda5]"
                      : "border-l-4 border-[#e74c3c]"
                  } p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex  flex-col justify-between ${
                    company.status
                  } fade-in`}
                >
                  <h3 className="mb-3 text-[1.3rem] text-gray-900 font-semibold">
                    {company.name}
                  </h3>
                  <p className="text-base text-gray-500 mb-2">
                    Status:{" "}
                    <span
                      className={` px-[10px] py-[4px] rounded-[5px] text-[0.85rem] font-bold text-zinc-800 ${company.status}`}
                    >
                      {company.status}
                    </span>
                  </p>
                  <div className="flex flex-wrap  gap-5">
                    <button
                      onClick={() =>
                        handleCompanyApproval(company.id, "approved")
                      }
                      className=" text-white px-6 py-2 rounded-md mr-0 bg-[#00bda5]"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleCompanyApproval(company.id, "rejected")
                      }
                      className="text-white px-6 py-2  rounded-md mr-0 bg-[#e74c3c]"
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
