"use client";

import { FaUserShield } from "react-icons/fa";

export default function AdminActions({ admin, onUpdate }) {
  const handlePromote = () => {
    onUpdate({ ...admin, role: "Owner" });
  };

  const handleDeactivate = () => {
    onUpdate({ ...admin, status: "Inactive" });
  };

  const handleActivate = () => {
    onUpdate({ ...admin, status: "Active" });
  };

  return (
    <div className="mt-6 space-y-3">
      {admin.role === "Admin" && (
        <button
          onClick={handlePromote}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          <FaUserShield className="inline-block mr-2" /> Promote to Owner
        </button>
      )}
      {admin.status === "Active" ? (
        <button
          onClick={handleDeactivate}
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Deactivate Account
        </button>
      ) : (
        <button
          onClick={handleActivate}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Activate Account
        </button>
      )}
    </div>
  );
}
