"use client";

import { FaArrowLeft } from "react-icons/fa";
import AdminActions from "./AdminActions";
import Image from "next/image";

export default function AdminPreview({ admin, onClose, onUpdate }) {
  if (!admin) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer font-semibold text-lg mb-4"
      >
        <FaArrowLeft /> Go Back
      </button>

      <div className="flex flex-col items-center text-center">
        <Image
          src={admin.avatar}
          alt={admin.firstName}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-2xl font-semibold">
          {admin.firstName} {admin.lastName}
        </h2>
        <p className="text-gray-600">{admin.email}</p>
        <p className="text-gray-800 font-bold">{admin.role}</p>
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            admin.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {admin.status}
        </span>
      </div>

      <AdminActions admin={admin} onUpdate={onUpdate} />
    </div>
  );
}
