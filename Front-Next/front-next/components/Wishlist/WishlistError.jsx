"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function WishlistError() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] space-y-6">
      <div className="text-7xl text-custom-yellow-4 animate-pulse">
        <FaExclamationTriangle />
      </div>

      <h2 className="text-3xl font-semibold text-gray-600">
        Oops! Something Went Wrong
      </h2>

      <p className="text-lg text-gray-500 max-w-md">
        We couldn't load your wishlist. Please check your connection or try
        again.
      </p>

      <div className="flex items-center gap-2 justify-center">
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-3 bg-gradient-to-r from-custom-yellow-4/60 to-custom-yellow-4/80  text-white text-lg font-medium rounded-s-xl shadow-lg hover:bg-custom-yellow-4 transition-all duration-300"
        >
          Retry
        </button>

        <Link href="/shop">
          <button className="mt-2 px-6 py-3 bg-gradient-to-r from-custom-yellow-4/80 to-custom-yellow-4  text-white text-lg font-medium rounded-e-xl shadow-lg hover:bg-custom-yellow-4 transition-all duration-300">
            Go to Shop
          </button>
        </Link>
      </div>
    </div>
  );
}
