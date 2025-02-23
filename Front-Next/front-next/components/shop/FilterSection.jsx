"use client";

import { FaFilter } from "react-icons/fa";
import { useState, useMemo, useCallback } from "react";
import { filterOptions } from "@/Data/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const FilterSection = ({
  tempFilters,
  setTempFilters,
  showFilters,
  setShowFilters,
  applyFilters,
  clearFilters,
}) => {
  const handleTempFilterChange = useCallback(
    (key, value) => {
      setTempFilters((prev) => {
        if (key === "category") {
          const currentValues = prev[key] || [];
          return {
            ...prev,
            [key]: currentValues.includes(value)
              ? currentValues.filter((item) => item !== value)
              : [...currentValues, value],
          };
        } else {
          return {
            ...prev,
            [key]: prev[key] === value ? null : value,
          };
        }
      });
    },
    [setTempFilters]
  );

  const filterElements = useMemo(() => {
    return filterOptions.map(({ key, label, options }) => (
      <div key={key} className="w-full sm:w-[48%] lg:w-[30%] min-w-[200px]">
        <h6 className="mb-2 font-medium text-white">{label}</h6>
        <div className="flex md:flex-wrap items-start justify-start flex-col md:h-[200px] gap-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={
                  key === "category"
                    ? tempFilters[key]?.includes(option)
                    : tempFilters[key] === option
                }
                onChange={() => handleTempFilterChange(key, option)}
                className={`w-6 h-6 appearance-none border-2 border-gray-400 rounded-full ${
                  (
                    key === "category"
                      ? tempFilters[key]?.includes(option)
                      : tempFilters[key] === option
                  )
                    ? "bg-gradient-to-l from-custom-yellow-4/40 via-custom-yellow-4/60 to-custom-yellow-4"
                    : "bg-white border-gray-400"
                }`}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    ));
  }, [filterOptions, tempFilters, handleTempFilterChange]);

  return (
    <div className="relative bg-gradient-to-tr text-white rounded-3xl rounded-br-3xl from-custom-yellow-4/40 via-custom-yellow-4/60 to-custom-yellow-4 p-5 shadow-md flex flex-wrap items-center justify-between gap-4 mx-10">
      <div className="w-full items-center justify-between flex flex-col gap-4 md:flex-row">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex w-full h-full transition-all hover:cursor-pointer items-center gap-3 text-gray-600"
        >
          <FaFilter className="text-yellow-600 text-xl" />
          <p className="text-2xl text-white">Click Here To Filter</p>
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 w-full">
          {filterElements}

          <div className="flex md:flex-row gap-2 mt-4 md:mt-0 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(false)}
              className="bg-gray-500/60 bg-gradient-to-r from-custom-yellow-4/40 px-4 py-2 rounded-s-2xl text-white transition-all"
            >
              Cancel
            </button>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 bg-gradient-to-r from-custom-yellow-4/40 to-custom-yellow-4/60 text-white transition-all"
            >
              Clear Filters
            </button>
          <Link href={"/shop"}>
            <button
              onClick={applyFilters}
              className="px-4 py-2 rounded-e-2xl bg-gradient-to-r from-custom-yellow-4/60 to-custom-yellow-4 bg-gray-500 text-white transition-all"
              >
              Apply Filters
            </button>
              </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
