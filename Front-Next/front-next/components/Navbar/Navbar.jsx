"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Rnav from "./Rnav";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Mobnav from "./Mobnav";
import { useSearch } from "@/Hooks/useProducts";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading } = useSearch(searchQuery);

  const closeSearch = useCallback((e) => {
    if (e.target.id === "overlay") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  }, []);

  const handleSearch = useCallback(() => {
    setSearchQuery("");
    setIsSearchOpen(false);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        e.preventDefault();
        window.location.href = `/shop?search=${searchQuery}`;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, searchQuery]);

  useEffect(() => {
    setShowDropdown(searchQuery.length > 0);
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    if (!data?.products?.length) return [];
    return data.products.slice(0, window.innerWidth < 640 ? 2 : 8);
  }, [data]);

  return (
    <div className="relative">
      <div className="nav container mx-auto p-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="hidden sm:flex items-center">
              <div
                className="cursor-pointer"
                onClick={() => setIsSearchOpen(true)}
              >
                <FaMagnifyingGlass />
              </div>
            </div>
            <Mobnav />
          </div>

          <div className="md:ms-60">
            <Logo />
          </div>

          <div className="flex items-center">
            <Rnav />
            <div className="sm:hidden flex items-center ml-4">
              <div
                className="cursor-pointer"
                onClick={() => setIsSearchOpen(true)}
              >
                <FaMagnifyingGlass />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {isSearchOpen && (
        <>
          <div
            className="fixed top-0 left-0 w-full z-50 bg-white shadow-md py-4 px-6 flex items-center justify-between transition-transform transform translate-y-0 md:px-10 lg:px-16"
            style={{ animation: "slideDown 0.8s ease-in-out" }}
          >
            <Logo />
            <div className="mx-10 relative w-full max-w-2xl">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="border border-gray-300 px-4 py-3 rounded-full w-full outline-none text-lg pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                  onClick={handleSearch}
                >
                  <FaMagnifyingGlass />
                </div>
              </form>

              {showDropdown && searchQuery && (
                <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl text-sm shadow-md z-50 max-h-96 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
                    {isLoading || filteredProducts.length === 0 ? (
                      <p className="text-center text-gray-500">
                        No results found
                      </p>
                    ) : (
                      filteredProducts.map((product) => (
                        <Link
                          key={product._id}
                          href={`/productDetails/${product._id}`}
                          onClick={handleSearch}
                        >
                          <div className="border overflow-hidden flex-row gap-2 lg:gap-0 rounded-lg p-2 flex lg:flex-col items-center cursor-pointer hover:shadow-lg transition">
                            <div className="w-20 bg-gray-300 h-20 overflow-hidden rounded-full">
                              <img
                                src={product.image || "/placeholder.jpg"}
                                alt={product.name}
                                className="w-full object-cover"
                              />
                            </div>
                            <div className="flex w-[50%] lg:w-full flex-col items-center justify-center">
                              <p className="text-xs text-center w-full font-semibold mt-2 truncate">
                                {product.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                EGP {product.priceAfterSale}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>

                  <Link href={`/shop?search=${searchQuery}`}>
                    <button
                      onClick={handleSearch}
                      className="w-full py-2 bg-custom-yellow-4 text-white font-semibold rounded-b-xl hover:bg-custom-yellow-4/80 duration-200 transition-colors"
                    >
                      More Results
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <Rnav />
          </div>

          <div
            id="overlay"
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 z-40"
            onClick={closeSearch}
          />
        </>
      )}
    </div>
  );
}
