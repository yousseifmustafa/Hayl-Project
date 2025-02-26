import React from "react";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";

export default function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}) {
  return (
    <div
      className={`bg-white border ${
        address?.isDefault
          ? "border-custom-yellow-4 shadow-md"
          : "border-gray-200"
      } rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 relative transition-all`}
    >
      <h4 className="text-base sm:text-lg font-bold mb-2 text-gray-800">
        {address?.isDefault ? "Home (Default)" : "Address"}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-gray-700 text-sm sm:text-base">
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
          <strong>Building:</strong> {address?.building}
        </p>
        <p>
          <strong>City:</strong> {address?.city}
        </p>
        <p>
          <strong>State:</strong> {address?.state}
        </p>
        <p>
          <strong>Postal Code:</strong> {address?.postalCode}
        </p>
      </div>

      {address?.isDefault && (
        <span className="text-custom-yellow-4 font-bold mt-2 block text-sm sm:text-base">
          Default
        </span>
      )}

      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center space-x-2 sm:space-x-3">
        {!address.isDefault && (
          <button
            onClick={onSetDefault}
            className="text-custom-yellow-4 text-xs sm:text-sm hover:cursor-pointer transition"
          >
            Make Default
          </button>
        )}
        <button
          onClick={onEdit}
          className="text-gray-800 text-lg sm:text-xl hover:cursor-pointer transition"
        >
          <MdOutlineEdit />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 text-lg sm:text-xl hover:cursor-pointer transition"
        >
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}
