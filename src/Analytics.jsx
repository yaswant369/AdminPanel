import React, { useState, useEffect } from "react";
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
function Analytics() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
  );

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
    </div>
  );
}

export default Analytics;
