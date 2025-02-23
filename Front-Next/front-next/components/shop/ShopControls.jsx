"use client";

import { useCallback } from "react";
import Link from "next/link";

const ShopControls = ({
  limit,
  setLimit,
  tempSort,
  setTempSort,
  setPage,
  clearFilters,
}) => {
  const handleLimitChange = useCallback(
    (e) => {
      setLimit(Number(e.target.value));
      setPage(1);
    },
    [setLimit, setPage]
  );

  const handleSortChange = useCallback(
    (e) => {
      setTempSort(e.target.value);
      setPage(1); },
    [setTempSort, setPage]
  );

  return (
    <div className="flex items-center flex-row-reverse w-[95%] mx-auto justify-between gap-6 flex-wrap mt-5 p-5">
      <div className="flex items-center gap-6">
        <div>
          <label className="font-medium text-gray-700">Items per page:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border border-gray-300 rounded-md px-3 py-1"
          >
            <option value={20}>20 items</option>
            <option value={50}>50 items</option>
            <option value={100}>100 items</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium text-gray-700">Sort by:</label>
          <select
            value={tempSort}
            onChange={handleSortChange}
            className="border border-gray-300 rounded-md px-3 py-1"
          >
            <option value="">Select</option>
            <option value="-price">High to Low</option>
            <option value="price">Low to High</option>
            <option value="-created_at">Newest</option>
          </select>
        </div>
      </div>

      <div>
        <Link href={"/shop"}>
          <button
            onClick={clearFilters}
            className="px-8 py-2 bg-gradient-to-bl text-white rounded-3xl rounded-br-3xl from-custom-yellow-4/40 via-custom-yellow-4/60 to-custom-yellow-4"
          >
            <p className="text-xl text-white">All Products</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShopControls;
