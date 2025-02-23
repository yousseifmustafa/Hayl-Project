"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import { FaRegHeart, FaRegUser } from "react-icons/fa6";
import { IoMdLogOut, IoMdClose, IoMdMenu } from "react-icons/io";
import { useLogoutHandler } from "@/components/Login/useLoginHandler";

export default function Mobnav() {
  const router = useRouter();
  const logoutMutation = useLogoutHandler();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("guest");

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeDropdown = useCallback((e) => {
    if (e.target.id === "overlay") setIsOpen(false);
  }, []);
  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
    setIsOpen(false);
  }, [logoutMutation]);

  const navLinks = useMemo(
    () => [
      {
        to: "/account",
        icon: <FaRegUser />,
        label: "Account",
        role: ["user", "admin", "owner", "guest"],
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
      { to: "/login", icon: <FaRegUser />, label: "Login", role: ["guest"] },
    ],
    []
  );

  const filteredLinks = useMemo(
    () => navLinks.filter((link) => link.role.includes(role)),
    [role]
  );

  return (
    <div className="rnav flex items-center justify-center gap-9 text-2xl sm:hidden">
      <div className="relative">
        <button
          className="hover:main-color hover:cursor-pointer group"
          onClick={toggleDropdown}
        >
          {isOpen ? <IoMdClose /> : <IoMdMenu />}
        </button>

        <div
          id="dropdown-menu"
          className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out`}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col gap-4 p-6">
            <button
              className="self-start text-xl w-full"
              onClick={toggleDropdown}
            >
              <div className="flex w-full items-center justify-end font-bold text-4xl">
                <IoMdClose className="hover:cursor-pointer hover-main" />
              </div>
            </button>

            {filteredLinks.map(({ to, icon, label }, index) => (
              <Link
                key={index}
                href={to}
                className="w-full p-3  border-b-2 group hover-main rounded-md text-lg flex items-center gap-2"
                onClick={toggleDropdown}
              >
                <div className="w-full flex  items-center justify-start gap-2 transition-transform duration-500 ease-in-out group-hover:translate-x-2.5">
                  {icon}
                  <p> {label} </p>
                </div>
              </Link>
            ))}

            {role !== "guest" && (
              <button
                className="w-full p-3 border-b-2 group text-lg flex items-center gap-2 text-red-500 hover:text-red-700"
                onClick={handleLogout}
              >
                <IoMdLogOut />
                <p> Logout</p>
              </button>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="overlay"
          className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
          onClick={closeDropdown}
        />
      )}
    </div>
  );
}
