"use client";

import Image from "next/image";

export default function CustomerDetails({ user }) {
  if (!user) return <p>No user selected.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={user.avatar}
          alt={user.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-gray-500">Role: {user.role}</p>
        </div>
      </div>

      <p className="text-lg font-medium">
        Status:{" "}
        <span
          className={`px-3 py-1 rounded-full ${
            user.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.status}
        </span>
      </p>

      <div className="w-full flex justify-end">
        <button
          className={`mt-4 px-4 py-2 rounded-md text-white font-semibold ${
            user.status === "Active" ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={() =>
            alert(`User ${user.status === "Active" ? "deactivated" : "activated"}!`)
          }
        >
          {user.status === "Active" ? "Deactivate User" : "Activate User"}
        </button>
      </div>
    </div>
  );
}
