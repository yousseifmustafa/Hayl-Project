"use client";

export default function ProductActions({ setView, setEntries,setSearchTerm }) {
  return (
    <>
      <div className="flex justify-between items-center mb-12 mt-4">
        <h2 className="text-xl font-semibold">All Products</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setView("add")}
            className=" border border-transparent hover:bg-custom-yellow-4/80 bg-custom-yellow-4 text-white px-8 py-1 rounded-xl transition-all duration-700"
          >
            Add New Product
          </button>
          <button
            onClick={() => setView("ImportFile")}
            className="border-gray-100  border transition-all   text-custom-yellow-4 px-8 py-1 rounded-xl duration-700"
          >
            Import on Batch
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label className="text-gray-600">Show</label>
          <select
            className="border p-1 rounded cursor-pointer"
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries per page</span>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded-xl border-gray-300 max-w-sm w-full focus:border-custom-yellow-4 "
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
}
