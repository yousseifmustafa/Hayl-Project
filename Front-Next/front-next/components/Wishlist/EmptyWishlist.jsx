"use client";

import Link from "next/link";
import { FaHeartBroken } from "react-icons/fa";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] space-y-6 mb-4">
      <div className="text-7xl text-custom-yellow-4 animate-pulse">
        <FaHeartBroken />
      </div>

      <p className="text-3xl font-semibold text-gray-500">
        Your Wishlist Looks Empty
      </p>

      <p className="text-lg text-gray-400 max-w-md">
        Looks like you haven't added anything yet. Start exploring our shop and
        find your favorite items!
      </p>

      <Link href="/shop">
        <button className="mt-4 px-28 py-3 bg-custom-yellow-4 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-custom-yellow-5 transition-all duration-300">
          Go to Shop
        </button>
      </Link>
    </div>
  );
}
