"use client";

import { useRouter } from "next/navigation";
import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  const router = useRouter(); 
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex mx-6 items-center gap-2 text-gray-700 hover:text-black cursor-pointer font-semibold text-lg"
      >
        <FaArrowLeft />
        Go Back
      </button>

      <ProductDetails />
    </div>
  );
}
