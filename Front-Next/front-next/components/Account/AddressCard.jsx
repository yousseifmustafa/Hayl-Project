import React from 'react';

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <div
      className={`bg-white border ${
        address?.isDefault ? "border-green-500 shadow-md" : "border-gray-200"
      } rounded-lg p-6 mb-6 relative transition-all`}
    >
      <h4 className="text-lg font-bold mb-2 text-gray-800">
        {address?.isDefault ? "Home (Default)" : "Address"}
      </h4>

      {/* تفاصيل العنوان */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
        <p>
          <strong>Name:</strong> {address?.name}
        </p>
        <p>
          <strong>Phone:</strong> {address?.phone}
        </p>
        <p>
          <strong>Department:</strong> {address?.department}
        </p>
        <p>
          <strong>Street:</strong> {address?.street}
        </p>
        <p>
          <strong>Building No:</strong> {address?.buildingNumber}
        </p>
        <p>
          <strong>City:</strong> {address?.city}
        </p>
        <p>
          <strong>State:</strong> {address?.state}
        </p>
        <p>
          <strong>ZIP Code:</strong> {address?.zipCode}
        </p>
      </div>

      {/* إشارة التحقق في حالة العنوان الافتراضي */}
      {address?.isDefault && (
        <span className="text-green-600 font-bold mt-2 block">Default</span>
      )}

      {/* الأزرار */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-green-500 px-3 py-1 rounded-lg hover:cursor-pointer transition"
          >
            Make Default
          </button>
        )}
        <button
          onClick={onEdit}
          className="text-blue-500 px-3 py-1 rounded-lg hover:cursor-pointer transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 px-3 py-1 rounded-lg hover:cursor-pointer transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
