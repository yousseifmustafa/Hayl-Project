"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useCallback } from "react";

const AppliedFilters = ({ filters, setFilters }) => {
  const handleFilterRemove = useCallback(
    (key, value) => {
      setFilters((prev) => {
        const newFilters = { ...prev };
        if (Array.isArray(prev[key])) {
          newFilters[key] = prev[key].filter((item) => item !== value);
          if (newFilters[key].length === 0) delete newFilters[key];
        } else {
          delete newFilters[key];
        }
        return newFilters;
      });
    },
    [setFilters]
  );

  const filterElements = useMemo(() => {
    return Object.keys(filters).length > 0 ? (
      <div className="flex flex-wrap items-center gap-2 me-12 p-4">
        {Object.entries(filters).flatMap(([key, values]) =>
          (Array.isArray(values) ? values : [values]).map((value) => (
            <div
              key={value}
              className="bg-gradient-to-l from-custom-yellow-4/60 via-custom-yellow-4/70 to-custom-yellow-4 text-white text-md gap-2 px-3 py-1 rounded-3xl shadow-md flex items-center"
            >
              <span>{value}</span>
              <button
                onClick={() => handleFilterRemove(key, value)}
                className="rounded-full px-2 text-red-600 hover:scale-105 text-sm"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          ))
        )}
      </div>
    ) : null;
  }, [filters, handleFilterRemove]);

  return <div className="  rounded-3xl  w-[93%] mx-auto">{filterElements}</div>;
};

export default AppliedFilters;
