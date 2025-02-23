"use client";

export default function UserRow({ user, onSelect }) {
  return (
    <tr
      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={onSelect}
    >
      <td className="p-3">
        <input type="checkbox" />
      </td>
      <td className="p-3">{user.id}</td>
      <td className="p-3 flex items-center gap-2">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />{" "}
        {user.name}
      </td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">{user.role}</td>
      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            user.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.status}
        </span>
      </td>
    </tr>
  );
}
