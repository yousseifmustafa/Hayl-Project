"use client";
import { useRouter } from "next/navigation";
import { IoCartSharp } from "react-icons/io5";

export default function UnauthorizedCart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center  my-12  text-center">
      <div className="text-8xl text-custom-yellow-4 animate-pulse mb-6">
        <IoCartSharp />
      </div>

      <h1 className="text-3xl font-bold mb-4 ">
        Sorry, You Need to Login to Access Cart
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        But don't worry, all your added items will be there after login.
      </p>
      <div className="flex gap-4 mb-6 ">
        <button
          onClick={() => router.push("/login")}
          className="px-14 py-2 bg-gradient-to-r from-custom-yellow-4/60 to-custom-yellow-4/80  text-white rounded-s-xl  hover:animate-pulse   transition-all"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="px-14 py-2 bg-gradient-to-r from-custom-yellow-4/80 to-custom-yellow-4 rounded-e-xl  text-white  hover:animate-pulse transition-all"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
