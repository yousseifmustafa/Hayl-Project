"use client";

import { useState } from "react";
import { BsDownload } from "react-icons/bs";
import ActionButton from "./ActionButton";
import UserTable from "./UserTable";
import CustomerDetails from "./CustomerDetails";
import { usersData } from "../../../Data/Data";

export default function CustomersManagement() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState({ mode: "discover", user: null });

  const filteredUsers = usersData.filter(({ name, email, id }) =>
    [name, email, id].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {view.mode === "discover" ? (
        <>
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-4">
            <button className="bg-custom-yellow-4 text-white px-6 py-2 rounded-xl shadow-md font-bold">
              New User
            </button>
            <div className="flex gap-3">
              <ActionButton icon={<BsDownload />} label="Export CSV" />
            </div>
          </div>

          {/* Users Table */}
          <UserTable
            users={filteredUsers}
            onSelect={(user) => setView({ mode: "details", user })}
          />
        </>
      ) : (
        <CustomerDetails
          user={view.user}
          onBack={() => setView({ mode: "discover", user: null })}
        />
      )}
    </div>
  );
}
