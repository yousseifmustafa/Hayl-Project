export default function PaginationControl({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div className="flex justify-between items-center mt-4">
      <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
      <div className="flex gap-3">
        <button
          aria-label="Go to previous page"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
          className={`px-8 py-1 border rounded-xl ${currentPage <= 1 ? "text-gray-400 cursor-not-allowed" : "hover:cursor-pointer"}`}
        >
          Previous
        </button>
        <button
          aria-label="Go to next page"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
          className={`px-8 py-1 border rounded-xl ${currentPage >= totalPages ? "text-gray-400 cursor-not-allowed" : "hover:cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
