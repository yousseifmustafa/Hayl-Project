"use client";

import Link from "next/link";
import Image from "next/image";

const Deals_Banner =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1739318700/DealBanner_h2ynps.jpg";

export default function DealsBanner() {
  return (
    <section className="relative rounded-3xl overflow-hidden mb-3 w-full h-[100%] md:h-screen bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 rounded-4xl container m-auto flex items-center">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16">
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Unbeatable Deals Await
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-xl">
            Discover limited-time offers on your favorite products and save big.
          </p>
          <Link href="/shop">
            <button className="hover:cursor-pointer hover:font-bolder mt-6 px-10 py-5 text-lg font-semibold rounded-lg bg-gradient-to-r from-yellow-400 to-main-bg-color text-black hover:scale-105 transition-transform duration-300 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>

        <div className="w-full ms-24 md:ms-5 md:w-1/2 l rounded-l-full rounded-r-3xl relative md:mt-0 my-3 overflow-hidden">
          <Image
            src={Deals_Banner}
            alt="Deals Banner"
            width={700}
            height={500}
            priority
            className="object-cover bg-transparent w-full h-full shadow-lg"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
        </div>
      </div>
    </section>
  );
}
