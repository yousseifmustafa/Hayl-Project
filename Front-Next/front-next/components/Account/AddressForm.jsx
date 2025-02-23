"use client";

import { useState } from "react";

export default function AddressForm({ address = {}, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: address?.id || null,
    name: address?.name || "",
    department: address?.department || "",
    street: address?.street || "",
    buildingNumber: address?.buildingNumber || "",
    city: address?.city || "",
    state: address?.state || "",
    zipCode: address?.zipCode || "",
    phone: address?.phone || "",
    isDefault: address?.isDefault || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 trans">
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-xl relative z-10">
        {/* العنوان */}
        <p className="text-2xl font-bold mb-6 text-gray-800 text-start">
          {formData?.id ? "Edit Address" : "Add New Address"}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Full Name", name: "name" },
              { label: "Phone Number", name: "phone" },
              { label: "Department", name: "department" },
              { label: "Street", name: "street" },
              { label: "Building No", name: "buildingNumber" },
              { label: "City", name: "city" },
              { label: "State", name: "state" },
              { label: "ZIP Code", name: "zipCode" },
            ].map(({ label, name }) => (
              <div key={name} className="flex flex-col">
                <label className="text-gray-600 font-medium mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={formData?.[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData?.isDefault}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <label className="text-gray-700 font-semibold">Set as default address</label>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:cursor-pointer text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-600 hover:cursor-pointer text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
