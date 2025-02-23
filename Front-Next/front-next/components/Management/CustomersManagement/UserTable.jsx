"use client";

import UserRow from "./UserRow";

export default function UserTable({ users, onSelect }) {
  return (
    <div className="bg-white rounded-xl text-sm text-gray-400 shadow-md p-4 overflow-x-auto">
      <div className="w-full flex justify-end items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border p-2 border-gray-200 rounded-md w-60"
          onChange={(e) => onSelect(e.target.value)}
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-gray-200 border-b">
            <th className="p-3"></th>
            <th className="p-3">ID</th>
            <th className="p-3">NAME</th>
            <th className="p-3">EMAIL</th>
            <th className="p-3">ROLE</th>
            <th className="p-3">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onSelect={() => onSelect(user)} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
