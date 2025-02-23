"use client";

import { useMemo, useCallback } from "react";

const Pagination = ({ page, setPage, pages }) => {
  const handlePageChange = useCallback((pageNumber) => {
    setPage(pageNumber);
    window.scroll({ top: 0, behavior: "smooth" });
  }, [setPage]);

  const renderPageNumbers = useMemo(() => {
    if (pages <= 4) {
      return [...Array(pages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded-full text-lg font-semibold ${
              page === pageNumber
                ? "bg-custom-yellow-4 text-white"
                : "bg-white text-cusbg-custom-yellow-4 hover:bg-[#f1d85f] border border-cusbg-custom-yellow-4"
            } transition-all transform hover:scale-110 min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]`}
          >
            {pageNumber}
          </button>
        );
      });
    } else {
      const range = [];
      if (page <= 3) {
        range.push(1, 2, 3, 4, "...", pages);
      } else if (page >= pages - 2) {
        range.push(1, "...", pages - 3, pages - 2, pages - 1, pages);
      } else {
        range.push(1, "...", page - 1, page, page + 1, "...", pages);
      }

      return range.map((item, index) => (
        <button
          key={index}
          onClick={() =>
            typeof item === "number" ? handlePageChange(item) : null
          }
          className={`px-4 py-2 rounded-full text-lg font-semibold ${
            item === page
              ? "bg-custom-yellow-4 text-white"
              : item === "..."
              ? "text-gray-400"
              : "bg-white text-custom-yellow-4 hover:bg-custom-yellow-4/10 border border-custom-yellow-4"
          } transition-all transform hover:scale-110 min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]`}
        >
          {item}
        </button>
      ));
    }
  }, [page, pages, handlePageChange]);

  return (
    <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
      <button
        onClick={() => {
          setPage((prev) => Math.max(prev - 1, 1));
          window.scroll({ top: 0, behavior: "smooth" });
        }}
        disabled={page === 1}
        className="px-4 py-2 rounded-full bg-custom-yellow-4 text-white disabled:opacity-50 transition-all transform hover:scale-105 min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]"
      >
        Prev
      </button>

      {renderPageNumbers}

      <button
        onClick={() => {
          setPage((prev) => Math.min(prev + 1, pages));
          window.scroll({ top: 0, behavior: "smooth" });
        }}
        disabled={page === pages}
        className="px-4 py-2 rounded-full bg-custom-yellow-4 text-white disabled:opacity-50 transition-all transform hover:scale-105 min-w-[40px] sm:min-w-[50px] lg:min-w-[60px]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
