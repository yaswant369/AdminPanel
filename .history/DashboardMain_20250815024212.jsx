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
    <main className="flex-grow p-5 flex flex-col gap-6">
      {/* Top Cards Section */}
      <section className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
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
      <section className="flex flex-wrap gap-6">
        <div className="top-courses-card  rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-[25px]">
          <div className="flex justify-between items-center mb-5 pb-2 border-b border-zinc-400">
            <h3 className="text-[1.2rem] font-semibold text-zinc-800">
              Top Courses
            </h3>
            <select
              className="px-3 py-2 rounded-lg border text-zinc-800   text-sm cursor-pointer focus:border-2 focus:ring-2 focus:ring-[rgba(106,98,255,0.2)] outline-none "
              onChange={(e) => handleDropdownChange(e, "Top Courses")}
            >
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
          <ul className="list-none p-0">
            {[
              {
                name: "Videography Basic Design Course",
                views: "1.2K Views",
                icon: <FaBook />,
                color: "rgba(106, 98, 255, 0.9)",
                bg: "rgba(106, 98, 255, 0.4)",
              },
              {
                name: "Basic Front-end Development Course",
                views: "1.5K Views",
                icon: <FaLaptopCode />,
                color: "rgba(255, 187, 40, 0.8)",
                bg: "rgba(255, 187, 40, 0.2)",
              },
              {
                name: "Basic Fundamentals of Photography",
                views: "978 Views",
                icon: <FaCamera />,
                color: "rgba(76, 175, 80, 0.8)",
                bg: "rgba(76, 175, 80, 0.2)",
              },
              {
                name: "Advance Dribble Base Visual Design",
                views: "765 Views",
                icon: <FaPalette />,
                color: "rgba(244, 67, 54, 0.8)",
                bg: "rgba(244, 67, 54, 0.2)",
              },
              {
                name: "Your First Singing Lesson",
                views: "3.4K Views",
                icon: <FaMicrophone />,
                color: "rgba(0, 255, 255, 1)",
                bg: "rgba(0, 255, 255, 0.2)",
              },
            ].map((course, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-3 border-b  border-zinc-400 cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-colors"
                onClick={() => handleCourseItemClick(course.name)}
              >
                <div className="flex items-center gap-2.5 font-medium text-base">
                  <span
                    className="flex justify-center items-center text-[1.3rem]"
                    style={{
                      padding: "1vh",
                      width: "4vw",
                      color: course.color,
                      backgroundColor: course.bg,
                      textAlign: "center",
                      borderRadius: "0.375rem", // optional for rounding
                    }}
                  >
                    {course.icon}
                  </span>
                  <span>{course.name}</span>
                </div>
                <span className="text-[0.9rem] text-[var(--text-color)] opacity-80">
                  {course.views}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm text-gray-800  ">
          <div className="flex gap-2 justify-between items-center mb-5 pb-2 border-b border-[var(--border-color)]">
            <h3 className="text-[1.2rem] font-semibold text-zinc-800">
              Assignment Progress
            </h3>
            <select
              className="px-3 py-2 rounded-lg border-2  border-zinc-600  text-zinc-700 focus:ring-2 focus:ring-[rgba(106,98,255,0.2)] outline-none"
              onChange={(e) => handleDropdownChange(e, "Assignment Progress")}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
          </div>

          <div className="flex flex-col gap-5">
            {courseProgressData.map((data, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between mb-2 font-medium">
                  <span className="progress-text">{data.name}</span>
                  <span className="progress-tasks">{data.tasks} Tasks</span>
                </div>

                <div className="h-[10px] bg-[rgba(0,208,181,0.15)] rounded-[6px] overflow-hidden relative">
                  <div
                    className="h-full rounded-[6px] transition-all duration-300 ease-in-out bg-[rgba(0,208,181,1)]"
                    style={{
                      width: `${data.value}%`,
                      backgroundColor: "rgba(254, 109, 53,0.8)",
                    }}
                  />
                </div>

                <div className="text-right text-[0.85rem] mt-1 text-[#555]">
                  <span className="progress-percentage">{data.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinar Section */}
      <section className="flex p-6 rounded-2xl bg-white shadow-md transition-transform hover:-translate-y-1">
        <div className="flex gap-6 items-center w-full">
          {/* Removed image thumbnail */}
          <img
            className="w-[200px] h-[130px] object-cover rounded-xl shadow-md"
            src="https://img.freepik.com/free-vector/webinar-concept-with-laughing-man_23-2147759429.jpg?semt=ais_hybrid&w=740&q=80"
          />

          {/* Placeholder text */}
          <div className="webinar-details">
            <h3 className="text-black text-lg font-semibold mb-1">
              Upcoming Webinar
            </h3>
            <p className="text-base font-medium my-1 text-gray-800 leading-relaxed">
              Next Generation Frontend Architecture Using Layout Engine and
              React Native
            </p>
            <div className="flex gap-5 text-sm text-gray-500 mb-4">
              <span>📅 17 Nov 23</span>
              <span>👨‍💻 32 minutes</span>
            </div>
            <button
              className="bg-[#00bda5] text-white px-5 py-2 rounded-lg font-semibold text-sm shadow-md hover:bg-[#fe6d35] transition-colors"
              onClick={handleJoinEventClick}
            >
              🗓️ Join The Event
            </button>
          </div>
        </div>
      </section>

      {/* Graphs Section: Topic Interested & Popular Instructors */}
      <section className="flex gap-[25px]">
        {/* ===== Topic Interest Chart ===== */}
        <div className="flex items-center justify-center flex-wrap gap-5 card">
          <div className="h-[3vh]">
            <h3>Topic you are interested in</h3>
          </div>

          <div className="h-fit mb-[3vh]">
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
            <div className="flex flex-col gap-2.5">
              {topicInterestData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-evenly items-center py-[1vh] px-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] gap-[3px] text-[0.95rem] leading-[1.4]"
                >
                  <span
                    className="w-[4vw] h-[2vh]"
                    style={{
                      backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                    }}
                  ></span>
                  <span className="font-semibold mr-[5px]">{item.name}</span>
                  <span className="font-medium text-zinc-700">
                    {item.value}%
                  </span>
                  {item.language && (
                    <span className="text-[0.85rem] text-[var(--text-color)] opacity-70">
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

          <table className="hover:bg-[rgba(254,109,53,0.3)]">
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
