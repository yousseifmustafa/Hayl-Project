"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateAdmin({ onCreate, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAdmin = {
      id: `#A${Math.floor(1000 + Math.random() * 9000)}`,
      ...formData,
      status: "Active",
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
        Math.random() * 20
      )}.jpg`,
    };

    onCreate(newAdmin);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin",
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer font-semibold text-lg mb-4"
      >
        <FaArrowLeft />
        Go Back
      </button>

      <h2 className="text-2xl font-semibold mb-4">Create New Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded-md w-full"
        >
          <option value="Admin">Admin</option>
          <option value="Owner">Owner</option>
        </select>

        <button
          type="submit"
          className="bg-custom-yellow-4 text-white px-4 py-2 rounded-md w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
}
