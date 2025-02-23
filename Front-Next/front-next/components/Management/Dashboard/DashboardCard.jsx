import { useState } from "react";
import dynamic from "next/dynamic"; // Dynamic import for Next.js
import { FaUser, FaMousePointer, FaShoppingCart, FaDollarSign } from "react-icons/fa";

// Dynamically import Recharts components
const ResponsiveContainer = dynamic(() => import("recharts").then(mod => mod.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(mod => mod.Tooltip), { ssr: false });

const monthlyData = {
  January: [
    { week: "Week 1", users: 400, clicks: 1800000, sales: 350, items: 30 },
    { week: "Week 2", users: 200, clicks: 2000000, sales: 400, items: 40 },
    { week: "Week 3", users: 300, clicks: 2200000, sales: 450, items: 35 },
    { week: "Week 4", users: 500, clicks: 2500000, sales: 500, items: 45 },
  ],
  February: [
    { week: "Week 1", users: 450, clicks: 1900000, sales: 370, items: 32 },
    { week: "Week 2", users: 150, clicks: 1700000, sales: 420, items: 38 },
    { week: "Week 3", users: 350, clicks: 2300000, sales: 460, items: 42 },
    { week: "Week 4", users: 400, clicks: 2100000, sales: 480, items: 39 },
  ],
};

function Metric({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl">{icon}</div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
}

export default function DashboardChart() {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedWeek, setSelectedWeek] = useState(monthlyData["January"][0]);
  const [hoveredWeek, setHoveredWeek] = useState(null);

  const currentWeek = hoveredWeek || selectedWeek;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="mb-4">
        <label className="text-sm font-semibold">Select Month:</label>
        <select
          className="ml-2 p-1 border rounded"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            setSelectedWeek(monthlyData[e.target.value][0]);
          }}
        >
          {Object.keys(monthlyData).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="bg-gray-900 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={310}>
          <BarChart data={monthlyData[selectedMonth]} onMouseLeave={() => setHoveredWeek(null)}>
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <XAxis dataKey="week" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Bar
              barSize={30}
              dataKey="users"
              fill="#D4B257"
              onClick={(data) => setSelectedWeek(data)}
              onMouseEnter={(data) => setHoveredWeek(data)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-4 px-4">
        <Metric icon={<FaUser className="text-orange-500" />} label="Users" value={`${currentWeek.users}K`} />
        <Metric icon={<FaMousePointer className="text-blue-500" />} label="Clicks" value={`${(currentWeek.clicks / 1000000).toFixed(1)}M`} />
        <Metric icon={<FaDollarSign className="text-yellow-500" />} label="Sales" value={`$${currentWeek.sales}`} />
        <Metric icon={<FaShoppingCart className="text-pink-500" />} label="Items" value={currentWeek.items} />
      </div>
    </div>
  );
}
