"use client";

import AdminTable from "./AdminTable";

export default function AdminList({ admins, onSelectAdmin, onAddAdmin }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={onAddAdmin}
          className="bg-custom-yellow-4 text-white px-6 py-2 rounded-xl shadow-md font-bold"
        >
          <span className="text-sm"> New Admin </span>
        </button>
      </div>

      <AdminTable admins={admins} onSelectAdmin={onSelectAdmin} />
    </div>
  );
}
