import React from "react";
import Card from "./Card"; // Import the Card component
import "./DashboardMain.css";
import {
  FaBook,
  FaLaptopCode,
  FaCamera,
  FaPalette,
  FaMicrophone,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dummy Data for Charts
const studentData = [
  { name: "Jan", students: 400, teachers: 240 },
  { name: "Feb", students: 300, teachers: 139 },
  { name: "Mar", students: 200, teachers: 980 },
  { name: "Apr", students: 278, teachers: 390 },
  { name: "May", students: 189, teachers: 480 },
  { name: "Jun", students: 239, teachers: 380 },
  { name: "Jul", students: 349, teachers: 430 },
];

const courseProgressData = [
  { name: "User Experience Design", value: 72, tasks: 120, color: "#8884d8" },
  { name: "Basic Fundamentals", value: 48, tasks: 32, color: "#82ca9d" },
  { name: "React Native Components", value: 15, tasks: 182, color: "#ffc658" },
  { name: "Basic of Music Theory", value: 28, tasks: 58, color: "#ff7300" },
];

const topicInterestData = [
  { name: "Development", value: 35, language: "Java", langValue: 20 },
  { name: "UI/UX Design", value: 14, language: "Material", langValue: 12 },
  { name: "React", value: 10, language: "SEO, SMM", langValue: 25 },
];

const popularInstructors = [
  { name: "Maven Analytics", courses: 33, role: "Business Intelligence" },
  { name: "Maven Analytics", courses: 22, role: "Data Analytics" },
  { name: "Maven Analytics", courses: 18, role: "React Native" },
];

// Recharts Pie Chart Colors
const PIE_COLORS = [
  "rgba(254, 109, 53,0.5)", // Indigo
  "rgba(0, 208, 181,0.5)", // Yellow
  "rgba(76, 175, 80, 0.5)", // Green
  "rgba(244, 67, 54, 0.5)", // Red
];

const DashboardMain = () => {
  // Event handlers for interactivity (logging to console for demonstration)
  const handleDropdownChange = (e, sectionName) => {
    console.log(`Dropdown in ${sectionName} changed to:`, e.target.value);
    // Add filtering logic here
  };

  const handleCourseItemClick = (courseName) => {
    console.log(`Course item clicked: ${courseName}`);
    // Add navigation or detailed view logic
  };

  const handleJoinEventClick = () => {
    console.log("Join The Event button clicked!");
    // Add logic to open webinar link or modal
  };

  const handleGoToFullAdminClick = () => {
    console.log("Go to Full Admin Settings button clicked!");
    // Add navigation to admin panel
  };

  return (
    <main className="dashboard-main">
      {/* Top Cards Section */}
      <section className="dashboard-cards">
        <Card
          title="Total Students"
          value="563k"
          textIcon={<FaUserGraduate />}
          color="rgb(254, 109, 53)"
          bg="rgba(254, 109, 53,0.3)"
        />
        <Card
          title="Total Teachers"
          value="469"
          textIcon={<FaChalkboardTeacher />}
          color="#FFBB28"
          bg="rgba(255, 187, 40, 0.3)"
        />
        <Card
          title="Total Earning"
          value="$563k"
          textIcon={<FaMoneyBillWave />}
          color="rgba(0, 208, 181)"
          bg="rgba(0, 208, 181,0.4)"
        />
        <Card
          title="Total Cost"
          value="$264k"
          textIcon={<FaMoneyCheckAlt />}
          color="#f44336"
          bg="rgba(244, 67, 54, 0.3)"
        />
      </section>

      {/* Top Courses & Assignment Progress Section */}
      <section className="dashboard-section-flex">
        <div className="top-courses-card card">
          <div className="card-header">
            <h3>Top Courses</h3>
            <select
              className="filter-dropdown"
              onChange={(e) => handleDropdownChange(e, "Top Courses")}
            >
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
          <ul className="course-list">
            <li
              onClick={() =>
                handleCourseItemClick("Videography Basic Design Course")
              }
            >
              <div className="course-info">
                <span
                  className="course-text-icon"
                  style={{
                    padding: "1vh",
                    width: "4vw",
                    color: "rgba(106, 98, 255, 0.9)",
                    backgroundColor: "rgba(106, 98, 255, 0.4)",
                    textAlign: "center",
                  }}
                >
                  <FaBook />
                </span>
                <span>Videography Basic Design Course</span>
              </div>
              <span className="views">1.2K Views</span>
            </li>

            <li
              onClick={() =>
                handleCourseItemClick("Basic Front-end Development Course")
              }
            >
              <div className="course-info">
                <span
                  className="course-text-icon"
                  style={{
                    padding: "1vh",
                    width: "4vw",
                    color: "rgba(255, 187, 40, 0.8)",
                    backgroundColor: "rgba(255, 187, 40, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <FaLaptopCode />
                </span>
                <span>Basic Front-end Development Course</span>
              </div>
              <span className="views">1.5K Views</span>
            </li>

            <li
              onClick={() =>
                handleCourseItemClick("Basic Fundamentals of Photography")
              }
            >
              <div className="course-info">
                <span
                  className="course-text-icon"
                  style={{
                    padding: "1vh",
                    width: "4vw",
                    color: "rgba(76, 175, 80, 0.8)",
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <FaCamera />
                </span>
                <span>Basic Fundamentals of Photography</span>
              </div>
              <span className="views">978 Views</span>
            </li>

            <li
              onClick={() =>
                handleCourseItemClick("Advance Dribble Base Visual Design")
              }
            >
              <div className="course-info">
                <span
                  className="course-text-icon"
                  style={{
                    padding: "1vh",
                    width: "4vw",
                    color: "rgba(244, 67, 54, 0.8)",
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <FaPalette />
                </span>
                <span>Advance Dribble Base Visual Design</span>
              </div>
              <span className="views">765 Views</span>
            </li>

            <li
              onClick={() => handleCourseItemClick("Your First Singing Lesson")}
            >
              <div className="course-info">
                <span
                  className="course-text-icon"
                  style={{
                    padding: "1vh",
                    width: "4vw",
                    color: "rgba(0, 255, 255, 1)",
                    backgroundColor: "rgba(0, 255, 255, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <FaMicrophone />
                </span>
                <span>Your First Singing Lesson</span>
              </div>
              <span className="views">3.4K Views</span>
            </li>
          </ul>
        </div>

        <div className="assignment-progress-card card">
          <div className="card-header">
            <h3>Assignment Progress</h3>
            <select
              className="filter-dropdown"
              onChange={(e) => handleDropdownChange(e, "Assignment Progress")}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
          </div>

          <div className="progress-list">
            {courseProgressData.map((data, index) => (
              <div key={index} className="progress-item">
                <div className="progress-top-row">
                  <span className="progress-text">{data.name}</span>
                  <span className="progress-tasks">{data.tasks} Tasks</span>
                </div>

                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${data.value}%`,
                      backgroundColor: "rgba(254, 109, 53,0.8)",
                    }}
                  />
                </div>

                <div className="progress-bottom-row">
                  <span className="progress-percentage">{data.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinar Section */}
      <section className="upcoming-webinar-section card">
        <div className="webinar-content">
          {/* Removed image thumbnail */}
          <img
            className="webinar-thumbnail-placeholder"
            src="https://img.freepik.com/free-vector/webinar-concept-with-laughing-man_23-2147759429.jpg?semt=ais_hybrid&w=740&q=80"
          />

          {/* Placeholder text */}
          <div className="webinar-details">
            <h3>Upcoming Webinar</h3>
            <p className="webinar-title">
              Next Generation Frontend Architecture Using Layout Engine and
              React Native
            </p>
            <div className="webinar-meta">
              <span>📅 17 Nov 23</span>
              <span>👨‍💻 32 minutes</span>
            </div>
            <button
              className="primary join-event-button"
              onClick={handleJoinEventClick}
            >
              🗓️ Join The Event
            </button>
          </div>
        </div>
      </section>

      {/* Graphs Section: Topic Interested & Popular Instructors */}
      <section className="dashboard-section-flex">
        {/* ===== Topic Interest Chart ===== */}
        <div className="topic-interest-card card">
          <div className="card-header">
            <h3>Topic you are interested in</h3>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={topicInterestData}
                  cx="50%"
                  cy="45%"
                  outerRadius={100}
                  dataKey="value"
                  fill="#00D0B5"
                  labelLine={false}
                >
                  {topicInterestData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Topic Details */}
            <div className="topic-details">
              {topicInterestData.map((item, index) => (
                <div key={index} className="topic-item">
                  <span
                    className="topic-color-indicator"
                    style={{
                      backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                    }}
                  ></span>
                  <span className="topic-name">{item.name}</span>
                  <span className="topic-value">{item.value}%</span>
                  {item.language && (
                    <span className="topic-language">
                      ({item.language} {item.langValue}%)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Popular Instructors List ===== */}
        <div className="popular-instructors-card card">
          <div className="card-header">
            <h3>Popular Instructors</h3>
            <select
              className="filter-dropdown"
              onChange={(e) => handleDropdownChange(e, "Popular Instructors")}
            >
              <option value="all">All</option>
              <option value="new">New</option>
            </select>
          </div>

          <table className="instructor-table">
            <thead>
              <tr>
                <th>INSTRUCTORS</th>
                <th>COURSES</th>
              </tr>
            </thead>
            <tbody>
              {popularInstructors.map((instructor, index) => (
                <tr key={index}>
                  <td>
                    <div className="instructor-info">
                      <span className="instructor-icon-avatar">
                        <FaChalkboardTeacher />
                      </span>
                      <div className="instructor-details">
                        <p>{instructor.name}</p>
                        <small>{instructor.role}</small>
                      </div>
                    </div>
                  </td>
                  <td>{instructor.courses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Another Graph (e.g., Student Growth Over Time) */}
      {/* <section className="student-growth-card card">
        <div className="card-header">
          <h3>Student & Teacher Growth</h3>
          <select
            className="filter-dropdown"
            onChange={(e) =>
              handleDropdownChange(e, "Student & Teacher Growth")
            }
          >
            <option value="year">This Year</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={studentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border-color)"
              />
              <XAxis dataKey="name" stroke="var(--text-color)" />
              <YAxis stroke="var(--text-color)" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="teachers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section> */}

      {/* Admin Panel section (from 5th image, simplified) */}
    </main>
  );
};

export default DashboardMain;
