"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/Account/Sidebar"), { ssr: false });
const Profile = dynamic(() => import("@/components/Account/Profile"), { ssr: false });
const Security = dynamic(() => import("@/components/Account/Security"), { ssr: false });
const Address = dynamic(() => import("@/components/Account/address"), { ssr: false });

export default function Account() {
  const [page, setPage] = useState("profile");

  return (
    <div className="flex">
      <Sidebar Page={page} setPage={setPage} />

      <div className="w-[75%] md:p-6">
        {page === "profile" && <Profile />}
        {page === "security" && <Security />}
        {page === "addresses" && <Address />}
      </div>
    </div>
  );
}
