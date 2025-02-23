"use client";
import DashboardCard from "./DashboardCard";
import MonthlyPaymentsChart from "./MonthlyPaymentsChart";
import { PiCoins } from "react-icons/pi";
import { FaChartLine, FaCalendarAlt, FaUserPlus } from "react-icons/fa";

export default function Dashboard() {
  const salesData = [
    { id: 1, title: "Today's Sales", amount: "e£ 32,139", icon: <PiCoins /> },
    { id: 2, title: "Weekly Sales", amount: "e£ 225,480", icon: <FaChartLine /> },
    { id: 3, title: "Monthly Sales", amount: "e£ 978,320", icon: <FaCalendarAlt /> },
    { id: 4, title: "Users Today", amount: "1,245", icon: <FaUserPlus /> },
  ];

  return (
    <div>
      <h2 className="text-4xl">Dashboard</h2>

      <div className="flex flex-col xl:flex-row items-start justify-center gap-4 mt-4"> 
        <div className="w-full xl:w-[60%] flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {salesData.map(({ id, title, amount, icon }) => (
              <div
                key={id}
                className="flex items-center gap-4 shadow-xl rounded-2xl py-4 bg-white w-full justify-between px-4"
              >
                <div className="flex flex-col">
                  <p className="text-gray-400">{title}</p>
                  <h6 className="text-xl font-extrabold">{amount}</h6>
                </div>
                <div className="rounded-xl text-2xl shadow-2xl bg-custom-yellow-4 text-white p-4">
                  {icon}
                </div>
              </div>
            ))}
          </div>
          <MonthlyPaymentsChart />
        </div>

        <div className="w-full xl:w-[40%] rounded-2xl">
          <DashboardCard />
        </div>
      </div>
    </div>
  );
}
