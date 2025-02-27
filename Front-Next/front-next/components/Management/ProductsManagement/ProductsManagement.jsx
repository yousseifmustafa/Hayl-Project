"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ProductList from "./ProductList";
import ProductActions from "./ProductActions";
import PaginationControls from "./PaginationControl";
import ProductDetails from "../../ProductDetails/ProductDetails";
import AddProduct from "./AddProduct";
import ImportFile from "./ImportFile";
import EditProduct from "./EditProduct";
import { useProducts, useSearch } from "@/Hooks/useProducts";

export default function ProductsManagement() {
  const [tempFilters, setTempFilters] = useState({});
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [tempSort, setTempSort] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [id, setId] = useState(null);
  const [view, setView] = useState("discover");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = searchTerm
    ? useSearch(searchTerm)
    : useProducts(filters.category, sort, limit, page);

  const handleTempFilterChange = (key, value) => {
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
  };

  const applyFilters = () => {
    setPage(1);
    setFilters(tempFilters);
    setSort(tempSort);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setTempFilters({});
    setTempSort("");
    setFilters({});
    setSort("");
    setLimit(50);
    setPage(1);
  };

  useEffect(() => {
    if (data?.totalPages) {
      setTotalPages(data.totalPages);
    }
  }, [data?.totalPages]);

  if (view !== "discover") {
    return (
      <div>
        <button
          onClick={() => {
            setView("discover");
            setId(null);
          }}
          className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer font-semibold text-lg my-4"
        >
          <FaArrowLeft />
          Go Back
        </button>
        {view === "preview" && <ProductDetails id={id} />}
        {view === "edit" && <EditProduct id={id} />}
        {view === "ImportFile" && <ImportFile id={id} setView={setView} />}
        {view === "add" && <AddProduct />}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <ProductActions
        setView={setView}
        setEntries={setLimit}
        setSearchTerm={setSearchTerm}
      />

      <ProductList
        displayedProducts={data?.products || []}
        setView={setView}
        setId={setId}
      />

      <PaginationControls
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}
