"use client";

export default function AdminTable({ admins, onSelectAdmin }) {
  return (
    <div className="bg-white text-gray-400 text-sm rounded-xl shadow-md p-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-gray-200 border-b">
            <th className="p-3">ID</th>
            <th className="p-3">NAME</th>
            <th className="p-3">EMAIL</th>
            <th className="p-3">ROLE</th>
            <th className="p-3">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr
              key={admin.id}
              className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelectAdmin(admin)}
            >
              <td className="p-3">{admin.id}</td>
              <td className="p-3 flex items-center gap-2">
                {/* Use next/image for optimization */}
                <img
                  src={admin.avatar}
                  alt={`${admin.firstName} ${admin.lastName}`}
                  className="w-8 h-8 rounded-full"
                />
                {admin.firstName} {admin.lastName}
              </td>
              <td className="p-3">{admin.email}</td>
              <td className="p-3">{admin.role}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    admin.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {admin.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
