"use client";
import Link from "next/link";
import { useState, useEffect, useMemo, useCallback } from "react";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogin2 } from "react-icons/tb";
import { useLogoutHandler } from "@/components/Login/useLoginHandler";

export default function Rnav() {
  const logoutMutation = useLogoutHandler();
  const [role, setRole] = useState("guest");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = sessionStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
    }
  }, []);

  const navLinks = useMemo(
    () => [
      {
        // to: role === "guest" ? "/login" : "/account",
        to: "/account",
        icon: <FaRegUser />,
        label: "Account",
        role: ["user", "admin", "owner", "guest"],
      },
      {
        to: "/management",
        icon: <IoSettingsOutline />,
        label: "Site Management",
        role: ["owner", "admin"],
      },
      {
        to: "/wishlist",
        icon: <FaRegHeart />,
        label: "Wishlist",
        role: ["guest", "user", "owner", "admin"],
      },
      {
        to: "/cart",
        icon: <BsCart3 />,
        label: "Cart",
        role: ["guest", "user", "owner", "admin"],
      },
      { to: "/login", icon: <TbLogin2 />, label: "Login", role: ["guest"] },
    ],
    []
  );

  const filteredLinks = useMemo(() => {
    return navLinks.filter((link) => link.role.includes(role));
  }, [role, navLinks]);

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <div className="hidden sm:flex items-center justify-center gap-9 text-2xl">
      {filteredLinks.map(({ to, icon, label }, index) => (
        <div key={index} className="relative group">
          <Link className="hover:text-primary hover:cursor-pointer" href={to}>
            {icon}
          </Link>
          <div className="absolute mt-3 top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black"></div>
          </div>
        </div>
      ))}

      {role !== "guest" && (
        <div className="relative group cursor-pointer" onClick={handleLogout}>
          <IoMdLogOut className="hover:text-primary text-red-500" />
          <div className="absolute mt-3 top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
            Logout
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-black"></div>
          </div>
        </div>
      )}
    </div>
  );
}
