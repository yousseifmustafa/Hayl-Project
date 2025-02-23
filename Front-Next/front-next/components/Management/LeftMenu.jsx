"use client";

import Logo from "../Navbar/Logo";
import { LuLayoutDashboard, LuShoppingBag } from "react-icons/lu";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { GrReturn, GrUserAdmin } from "react-icons/gr";

export default function LeftMenu({ page, setPage }) {
  const menuItems = [
    { name: "Dashboard", icon: <LuLayoutDashboard /> },
    { name: "Products Management", icon: <MdOutlineManageHistory /> },
    { name: "Order Management", icon: <LuShoppingBag /> },
    { name: "Customers Management", icon: <FaUsersCog /> },
    { name: "Admins Management", icon: <GrUserAdmin /> },
    { name: "Returns Management", icon: <GrReturn /> },
  ];

  return (
    <div className="w-full sm:w-[90%] m-auto sticky top-0 bottom-0 h-lvh px-4 sm:px-0">
      <div className="border-b-[1px] border-gray-300 me-12 hidden md:flex">
        <Logo />
      </div>

      <div className="w-full sm:w-[80%]">
        {menuItems.map(({ name, icon }) => (
          <div
            key={name}
            onClick={() => setPage(name)}
            className={`flex w-[70%] md:w-full ps-3 font-bold items-center gap-4 my-3 py-2 text-sm transition-all 
              ${
                page === name
                  ? "rounded-xl shadow-2xl bg-white border-white"
                  : "hover:cursor-pointer"
              }`}
          >
            <div
              className={`border-2 border-white rounded-xl text-2xl p-1 transition-all 
                ${page === name ? "bg-custom-yellow-4 text-white" : "text-black bg-white"}`}
            >
              {icon}
            </div>
            <p className="opacity-0 md:opacity-100">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
