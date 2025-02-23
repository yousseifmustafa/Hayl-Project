"use client";

import { useRouter } from "next/navigation";

const errorImg =
  "https://res.cloudinary.com/dl9gghlyx/image/upload/v1739319213/image_vjilja.png";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container  mx-auto flex flex-col-reverse md:flex-row items-center justify-center px-4 gap-6">
      <div className="text-center md:text-left md:w-1/2 md:ms-12">
        <h1 className="text-5xl font-extrabold text-gray-800">404</h1>
        <p className="text-lg text-gray-600 font-semibold mt-2">
          You weren’t meant to see this...
        </p>
        <p className="text-gray-500 mt-2">
          Either the internet has broken or we couldn’t find the file that you
          were looking for.
        </p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-6 py-3 main-bg-color text-white rounded-full w-full md:w-auto hover:scale-105 hover:shadow-lg transition-all"
        >
          Take Me Back
        </button>
      </div>

      <div className="w-full flex items-center justify-evenly md:w-1/2">
        <img
          className="max-w-xs md:max-w-sm h-auto"
          src={errorImg}
          alt="404 Not Found Illustration"
        />
      </div>
    </div>
  );
}
