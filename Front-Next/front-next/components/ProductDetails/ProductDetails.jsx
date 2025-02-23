"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProductById } from "@/Hooks/useProducts";
import { useParams } from "next/navigation";
import { toCartHandler } from "@/components/Cart/CartHandler";
import { toggleWishlistHandler } from "../Wishlist/WishListHandler";
import { useVirtualWishlist } from "@/Hooks/useVirtualWishlist";
import { useVirtualCart } from "@/Hooks/useVirtualCart";
import { getAuth } from "@/authDB";
export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { toggleWishlist } = useVirtualWishlist();
  const toCartMutation = toCartHandler();
  const toggleWishlistMutation = toggleWishlistHandler();
  const { addToCart } = useVirtualCart();
  const { data: product, isLoading, isError } = useProductById(id);

  useEffect(() => {
    const checkAuth = async () => {
      const authData = await getAuth();
      setIsAuthenticated(!!authData.token);
    };
    checkAuth();
  }, []);

  const wishlistHandler = useCallback(
    (id) => {
      if (isAuthenticated) {
        toggleWishlistMutation.mutate(product._id || id);
      } else {
        toggleWishlist(product._id || id);
      }
      setWishlist((prev) => !prev);
    },
    [toggleWishlistMutation, toggleWishlist, isAuthenticated, product]
  );

  const cartHandler = useCallback(() => {
    if (isAuthenticated) {
      toCartMutation.mutate({ id: product._id, quantity });
    } else {
      addToCart({ product: product._id, quantity });
    }
  }, [toCartMutation, addToCart, isAuthenticated, product, quantity]);

  const productPriceDetails = useMemo(() => {
    if (!product) return null;
    const { price, priceAfterSale, discount } = product;
    const saving =
      price && priceAfterSale ? (price - priceAfterSale).toFixed(2) : "0.00";
    return { price, priceAfterSale, discount, saving };
  }, [product]);

  if (isError) {
    return (
      <p className="text-red-500 text-center">
        Error loading product. Please try again later.
      </p>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl pt-4 container m-auto">
      <div className="my-3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center rounded-lg mx-6 overflow-hidden">
          {isLoading ? (
            <Skeleton height={500} width={500} />
          ) : product?.image ? (
            <div className="h-[500px] w-[500px] flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name || "Product image"}
                height={500}
                width={500}
                className="w-full bg-gray-200 object-cover rounded-lg"
                priority={id === "1"}
                loading="lazy"
              />
            </div>
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>

        <div className="p-4 flex flex-col justify-between text-gray-600">
          <div className="flex flex-col gap-2 mx-6">
            <div className="flex justify-between items-center mb-2 gap-3">
              <h1 className="text-2xl font-bold">
                {isLoading ? <Skeleton width={200} /> : product?.name || "Unknown Product"}
              </h1>
              <p className="text-lg font-bold">
                {isLoading ? <Skeleton width={100} /> : product?.category || "No Category"}
              </p>
            </div>

            <p className="text-2xl font-bold mt-4">
              {isLoading ? <Skeleton count={3} /> : product?.description || "No description available."}
            </p>

            {isLoading ? (
              <Skeleton width={120} height={30} />
            ) : productPriceDetails?.discount <= 0 ? (
              <p className="text-2xl font-bold mt-4">EGP {productPriceDetails?.price}</p>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-gray-500 line-through text-lg">
                  Was: EGP {productPriceDetails?.price?.toFixed(2)}
                </p>
                <p className="text-2xl font-bold text-black">
                  Now: EGP {productPriceDetails?.priceAfterSale?.toFixed(2)}
                  <span className="text-gray-500 text-sm"> Inclusive of VAT</span>
                </p>
                <p className="text-gray-700 text-lg font-semibold flex gap-3 items-center">
                  Saving: <span className="text-black">EGP {productPriceDetails?.saving}</span>
                  <span className="bg-green-200 text-green-800 px-2 py-1 text-sm rounded-md">
                    {productPriceDetails?.discount}% Off
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-start">
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={cartHandler}
                  className="w-full rounded-2xl bg-custom-yellow-4 text-white py-3 px-6 text-sm mx-6 font-semibold shadow-lg 
                    hover:bg-custom-yellow-4/80 transition-all duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50"
                  disabled={toCartMutation.isLoading || isLoading}
                >
                  {toCartMutation.isLoading ? "Adding..." : isLoading ? <Skeleton width={100} /> : "ADD TO CART"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-6 mt-6 mx-8 text-gray-600">
              <button
                onClick={wishlistHandler}
                className={`flex items-center gap-2 text-lg font-semibold ${
                  wishlist ? "text-custom-yellow-4" : "text-gray-600"
                } hover:text-custom-yellow-4 transition`}
                disabled={isLoading}
              >
                <FaRegHeart className="text-xl" />
                <p className="text-sm md:text-lg">{!wishlist ? "Add to Wishlist" : "Remove From Wishlist"}</p>
              </button>

              <div className="flex items-center justify-center gap-1 w-1/4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity === 1}
                  className="px-2.5 md:text-xl text-sm text-white font-bold border border-gray-300 rounded-full bg-custom-yellow-4 hover:bg-custom-yellow-4/80 transition disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  -
                </button>

                <span className="md:text-lg text-sm font-semibold px-4 py-2">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => Math.min(99, prev + 1))}
                  className="px-2 md:text-xl text-sm text-white font-bold border border-gray-300 rounded-full bg-custom-yellow-4 hover:bg-custom-yellow-4/80 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
