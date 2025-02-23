"use client";

export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="border p-2 border-gray-200 rounded-xl w-60"
      value={value}
      onChange={onChange}
    />
  );
}
