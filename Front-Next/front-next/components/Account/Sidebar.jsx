"use client";

import { useRouter } from "next/navigation";
import { FaRegAddressCard, FaRegUserCircle } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { MdOutlinePayment, MdOutlineSecurity } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import { useUser } from "@/Hooks/useUser";
import { useLogoutHandler } from "../Login/useLoginHandler";
import { useCallback } from "react";

export default function Sidebar({ setPage, Page }) {
  const { data: user } = useUser();
  const logoutMutation = useLogoutHandler();

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const menuItems = [
    { name: "Profile", icon: <FaRegUserCircle />, page: "profile" },
    { name: "Security", icon: <MdOutlineSecurity />, page: "security" },
    { name: "Addresses", icon: <FaRegAddressCard />, page: "addresses" },
    { name: "Orders", icon: <FaListCheck />, page: "orders" },
    { name: "Payments", icon: <MdOutlinePayment />, page: "payments" },
  ];

  return (
    <div className="sticky top-0 h-[50%] flex flex-col justify-between ps-6 px-4 bg-white w-[25%] overflow-hidden rounded-b-3xl mb-4">
      <div className="flex flex-col items-start border-b-2 border-gray-200 pb-4 mt-8">
        <h4>Hello {user?.FirstName}</h4>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      <div className="flex flex-col gap-3">
        {menuItems.map(({ name, icon, page }) => (
          <div
            key={name}
            onClick={() => setPage(page)}
            className={`flex items-center gap-2 my-3 hover:cursor-pointer hover:scale-105 transition-transform
            ${Page === name ? "underline scale-105 text-xl" : "text-xl"}`}
          >
            <div className="main-color text-2xl ps-1">{icon}</div>
            <p>{name}</p>
          </div>
        ))}
      </div>

      <div className="mb-24 mt-12 text-2xl border-t-2 border-gray-200 pt-4">
        <button
          onClick={handleLogout}
          className="group flex items-center w-full text-xl justify-center rounded-2xl gap-2"
        >
          <BiLogOutCircle className="text-red-700 group-hover:-translate-x-[100%] transition-all" />
          <p className="text-gray-500">Sign out</p>
        </button>
      </div>
    </div>
  );
}
