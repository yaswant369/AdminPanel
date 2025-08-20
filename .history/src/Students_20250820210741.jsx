import React, { useState, useEffect } from "react";

function Students() {
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
  const [searchTerm, setSearchTerm] = useState("");
  const getActivityDetails = (student) => (
    <ul className="list-none p-0 mt-2 mb-4 text-[0.95rem]">
      <li className="mb-1 text-gray-500">Activity: {student.activity}</li>
      <li className="mb-1 text-gray-500">Last Login: {student.lastLogin}</li>
      <li className="mb-1 text-gray-500">
        Progress: <strong>{student.progress}%</strong>
      </li>
    </ul>
  );
  return (
    <div>
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
                    ? "border-[#01c1b6]"
                    : student.status === "rejected"
                    ? "border-[#fe4d35]"
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
                        ? " text-[#01c1b6]"
                        : student.status === "rejected"
                        ? " text-[#fe4d35]"
                        : " text-yellow-800"
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
                    className="flex-1 bg-[#01c1b6] hover:bg-[#09706b] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStudentApproval(student.id, "rejected")
                    }
                    className="flex-1 bg-[#fe4d35] hover:bg-[#f52f15] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Students;
