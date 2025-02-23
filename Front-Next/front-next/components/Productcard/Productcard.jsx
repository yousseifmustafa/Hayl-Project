"use client";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { toggleWishlistHandler } from "@/components/Wishlist/WishListHandler";
import { toCartHandler } from "@/components/Cart/CartHandler";
import { useRouter } from "next/navigation";
import { useVirtualCart } from "@/Hooks/useVirtualCart";
import { useVirtualWishlist } from "@/Hooks/useVirtualWishlist";

export default function ProductCard({ product, wish, setWish }) {
  const router = useRouter();
  const isAuthenticated = !!sessionStorage.getItem("jwt");
  const toCartMutation = toCartHandler();
  const toggleWishlistMutation = toggleWishlistHandler();
  const [wishlist, setWishlist] = useState(false);

  const { addToCart } = useVirtualCart();
  const { toggleWishlist } = useVirtualWishlist();

  const wishlistHandler = useCallback(
    (id) => {
      if (isAuthenticated) {
        toggleWishlistMutation.mutate(id);
        setWishlist((prev) => !prev);
      } else {
        toggleWishlist(id);
        setWish&& setWish((prev) => !prev);
        setWishlist((prev) => !prev);
      }
    },
    [isAuthenticated, wish, wishlist, toggleWishlistMutation, toggleWishlist]
  );

  const cartHandler = useCallback(
    (id, quantity) => {
      if (isAuthenticated) {
        toCartMutation.mutate({ id, quantity });
      } else {
        addToCart({ product: id, quantity });
      }
    },
    [isAuthenticated, toCartMutation, addToCart]
  );

  const handleOverview = useCallback(
    (id) => {
      router.push(`/productDetails/${id}`);
    },
    [router]
  );

  return (
    <div className="transition-all w-52 h-[380px] overflow-hidden bg-white shadow-md rounded-lg p-3 border flex flex-col items-start justify-between relative">
      <div className="relative overflow-hidden flex items-center justify-center group w-full h-[70%]">
        <Image
          src={product?.image}
          alt={product?.description}
          width={208}
          height={266}
          className="object-cover bg-cover w-full h-full rounded-lg bg-gray-100"
        />
        <div className="absolute items-center justify-start gap-2 h-full top-2 z-10 right-1 flex flex-col">
          <button
            onClick={() => wishlistHandler(product?._id)}
            className="w-[100%] p-3 hover:cursor-pointer flex bg-white/80 rounded-xl items-center justify-center border py-3"
          >
            <FaHeart
              className={`${
                wishlist || wish ? "text-yellow-600" : "text-gray-700"
              }`}
            />
          </button>
          <button
            onClick={() => handleOverview(product._id)}
            className="w-[100%] p-3 hover:cursor-pointer flex bg-white/80 rounded-xl mb-3 items-center justify-center border py-3"
          >
            <FaRegEye />
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center text-sm text-gray-700 mb-3">
          <p className="truncate w-full">{product?.name}</p>
        </div>

        <div className="flex items-center mt-1 space-x-2">
          <span className="text-md font-bold text-gray-900">
            EGP {product?.priceAfterSale}
          </span>
          {product?.price !== product?.priceAfterSale && (
            <span className="text-gray-500 line-through text-xs">
              {product?.price}
            </span>
          )}
          {product?.price !== product?.priceAfterSale && (
            <span className="text-green-600 font-semibold text-xs">
              {parseInt(100 - (product?.priceAfterSale / product?.price) * 100)}
              % OFF
            </span>
          )}
        </div>
      </div>

      <div className="flex mt-6 w-full items-center justify-between gap-1">
        <button
          onClick={() => cartHandler(product?._id, 1)}
          className="bg-custom-yellow-4 w-full text-white py-2 rounded-md hover:opacity-80 hover:cursor-pointer"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
