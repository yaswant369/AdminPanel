import React, { useState, useEffect } from "react";

export default function Company() {
  const [newCompany, setNewCompany] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([
    { id: 1, name: "TCS", status: "pending", hires: 50 },
    { id: 2, name: "Infosys", status: "approved", hires: 70 },
    { id: 3, name: "Wipro", status: "rejected", hires: 20 },
    { id: 4, name: "Google", status: "approved", hires: 60 },
    { id: 5, name: "Microsoft", status: "approved", hires: 45 },
  ]);

  return (
    <div>
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
            className="bg-[#0781d9] hover:bg-[#025e9f] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
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
                  ? "border-[#01c1b6] "
                  : "border-[#fe4d35] "
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
                      ? " text-[#01c1b6]"
                      : " text-[#fe4d35] "
                  }`}
                >
                  {company.status.charAt(0).toUpperCase() +
                    company.status.slice(1)}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCompanyApproval(company.id, "approved")}
                  className="flex-1 bg-[#01c1b6] hover:bg-[#09706b] text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleCompanyApproval(company.id, "rejected")}
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
