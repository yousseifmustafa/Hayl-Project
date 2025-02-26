"use client";
import { useEffect, useMemo } from "react";
import ProductCard from "@/components/Productcard/Productcard";
import LoadingPage from "@/components/Loading/Loading";
import { useProducts, useSearch } from "@/Hooks/useProducts";

export default function ProductSlider({
  category,
  sort,
  limit,
  page,
  setPages,
  searchTerm,
  categoryTerm,
}) {
  const { data, isLoading, isError } = searchTerm
    ? useSearch(searchTerm, sort, limit, page)
    : categoryTerm
    ? useProducts(categoryTerm, sort, limit, page)
    : useProducts(category, sort, limit, page);

  const products = useMemo(() => data?.products || [], [data]);

  useEffect(() => {
    if (data?.totalPages) {
      setPages(data.totalPages);
    }
  }, [data?.totalPages, setPages]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <p>Error loading data.</p>;

  if (!Array.isArray(products)) {
    console.error("Expected 'products' to be an array but got:", products);
    return <p className="text-red-500">Error: Invalid product data.</p>;
  }

  return (
    <div className="grid grid-cols-2  lg:container  md:grid-cols-3 w-[1000px]:grid-col-4 lg:grid-cols-5  gap-4 my-2 max-w-[1200px] m-auto">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No products available.
        </p>
      )}
    </div>
  );
}
