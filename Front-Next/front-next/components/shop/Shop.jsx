"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ShopProducts from "@/components/shop/ShopProducts";
import FilterSection from "@/components/shop/FilterSection";
import Pagination from "@/components/shop/Pagination";
import ShopControls from "@/components/shop/ShopControls";
import AppliedFilters from "@/components/shop/AppliedFilters";

export default function Shop() {
  const [tempFilters, setTempFilters] = useState({});
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");
  const [tempSort, setTempSort] = useState("");
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [pages, setPages] = useState(1);

  const searchParams = useSearchParams();

  const searchTerm = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const categoryTerm = useMemo(
    () => searchParams.get("category") || "",
    [searchParams]
  );

  const applyFilters = useCallback(() => {
    setPage(1);
    setFilters(tempFilters);
    setSort(tempSort);
    setShowFilters(false);
  }, [tempFilters, tempSort]);

  const clearFilters = useCallback(() => {
    setTempFilters({});
    setTempSort("");
    setFilters({});
    setSort("");
    setLimit(50);
    setPage(1);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <FilterSection
        tempFilters={tempFilters}
        setTempFilters={setTempFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        applyFilters={applyFilters}
        clearFilters={clearFilters}
      />

      <ShopControls
        clearFilters={clearFilters}
        limit={limit}
        setLimit={setLimit}
        tempSort={tempSort}
        setTempSort={setTempSort}
        setPage={setPage}
      />

      <AppliedFilters filters={filters} setFilters={setFilters} />
      <ShopProducts
        category={filters.category?.join(",")}
        categoryTerm={categoryTerm}
        sort={tempSort}
        limit={limit}
        page={page}
        setPages={setPages}
        searchTerm={searchTerm}
      />
      <Pagination page={page} setPage={setPage} pages={pages} />
    </div>
  );
}
