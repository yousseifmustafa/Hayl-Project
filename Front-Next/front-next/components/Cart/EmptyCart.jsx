"use client";

import Link from "next/link";
import Image from "next/image";

const emptyCartImage =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1739318860/Empty_Cart_qqaalz.png";

export default function EmptyCart() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left md:my-12 md:gap-8 md:p-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800/80">
          Your shopping cart looks empty.
        </h2>
        <p className="text-gray-800/80 mt-2">What are you waiting for?</p>
        <Link href="/shop">
          <button className="hover:cursor-pointer  mt-4 px-6 py-2 bg-custom-yellow-4 text-white font-semibold rounded-md hover:bg-custom-yellow-4/80 transition">
            START SHOPPING
          </button>
        </Link>
      </div>

      <Image
        src={emptyCartImage}
        alt="Empty Cart"
        width={300}
        height={300}
        className="max-w-xs md:max-w-md"
      />
    </div>
  );
}
