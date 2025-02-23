import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for recharts components
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

const paymentsData = {
  2023: [
    { month: "Jan", amount: 1200 },
    { month: "Feb", amount: 1500 },
    { month: "Mar", amount: 1800 },
    { month: "Apr", amount: 1400 },
    { month: "May", amount: 1600 },
    { month: "Jun", amount: 1900 },
    { month: "Jul", amount: 2000 },
    { month: "Aug", amount: 1700 },
    { month: "Sep", amount: 1800 },
    { month: "Oct", amount: 2100 },
    { month: "Nov", amount: 2300 },
    { month: "Dec", amount: 2500 },
  ],
  2024: [
    { month: "Jan", amount: 1400 },
    { month: "Feb", amount: 1600 },
    { month: "Mar", amount: 2000 },
    { month: "Apr", amount: 1700 },
    { month: "May", amount: 1800 },
    { month: "Jun", amount: 2200 },
    { month: "Jul", amount: 2300 },
    { month: "Aug", amount: 2100 },
    { month: "Sep", amount: 2400 },
    { month: "Oct", amount: 2600 },
    { month: "Nov", amount: 2800 },
    { month: "Dec", amount: 3000 },
  ],
};

export default function MonthlyPaymentsChart() {
  const [year, setYear] = useState(2024);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Monthly Payments</h2>
        <select
          className="border px-2 py-1 rounded"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={paymentsData[year]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#D4B257" barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
