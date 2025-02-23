"use client";
import { useCallback, useState } from "react";
import ProductCard from "@/components/Productcard/Productcard";
import { FaRegHeart } from "react-icons/fa";
import { useProductsByIds, useWishlist } from "@/Hooks/useProducts";
import Loading from "../Loading/Loading";
import { clearWishlistHandler } from "./WishListHandler";
import { MdDeleteForever } from "react-icons/md";
import EmptyWishlist from "./EmptyWishlist";
import { useVirtualWishlist } from "@/Hooks/useVirtualWishlist";
import WishlistError from "./WishlistError";

export default function Wishlist() {
  const isAuthenticated = !!sessionStorage.getItem("jwt");
  const [wish, setWish] = useState(true);

  const {
    data: wishlistProducts = [],
    isLoading,
    isError,
  } = isAuthenticated
    ? useWishlist()
    : { data: [], isLoading: false, isError: false };

  const { wishlist, clearWishlist } = useVirtualWishlist();
  const { data: virtualProducts = [] } = useProductsByIds(wishlist);

  const products = isAuthenticated ? wishlistProducts || [] : virtualProducts?.products || [];

  const removeFromWishlistMutation = isAuthenticated ? clearWishlistHandler() : null;

  const clearHandler = useCallback(() => {
    if (isAuthenticated && removeFromWishlistMutation) {
      removeFromWishlistMutation.mutate();
    } else {
      clearWishlist();
    }
  }, [removeFromWishlistMutation, clearWishlist, isAuthenticated]);

  if (isLoading) return <Loading />;
  if (isError) return <WishlistError />;
  if (products?.length === 0) return <EmptyWishlist />;

  return (
    <div className="container mx-auto my-6 pb-3 flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-[1200px] px-4">
        <p className="m-3 text-4xl flex items-center gap-3">
          <FaRegHeart className="main-color" />
          Wishlist
        </p>

        <button
          className="flex items-center text-gray-800/80 text-xl group"
          onClick={clearHandler}
        >
          <MdDeleteForever className="text-gray-700 group-hover:rotate-[360deg] transition-transform duration-700" />
          <p>Remove</p>
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-2 max-w-[1200px] mx-auto">
        {products?.map((product) => (
          <ProductCard key={product?._id} product={product} wish={true} setWish={setWish} />
        ))}
      </div>
    </div>
  );
}
