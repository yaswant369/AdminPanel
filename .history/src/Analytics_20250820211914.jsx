import React from "react";
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
  return <div></div>;
}

export default Analytics;
