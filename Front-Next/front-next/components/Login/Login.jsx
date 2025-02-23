"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { validationSchema } from "@/components/Login/ValidateSchema";
import { useLoginHandler } from "@/components/Login/useLoginHandler";
import { logo } from "@/Data/Data";

export default function Login() {
  const router = useRouter();
  const loginMutation = useLoginHandler();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      loginMutation.mutate(values);
    },
  });

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  return (
    <div className="w-full pt-8    auth max-h-screen absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center z-10">
      <div className="absolute z-100 me-4 top-0 right-0 w-[150px]">
        <Link href="/">
          <img src={logo} alt="El hayl Logo" className="w-full" />
        </Link>
      </div>

      <div className="container bg-white mx-auto px-4 sm:px-6 lg:px-8 max-w-md md:max-w-lg lg:max-w-xl z-10 shadow-2xl rounded-2xl shadow-gray-200">
        <div className="w-full md:w-[80%] m-auto text-center flex-col flex gap-4">
          <h4 className="text-3xl  sm:text-4xl my-6 sm:my-7 text-gray-800/60">
            Login
          </h4>

          <button className="w-full rounded-md text-white font-bold font-xl bg-custom-yellow-4 hover:bg-custom-yellow-4/80 text-main transition-all hover:cursor-pointer text-center  bg-black flex items-center justify-center gap-4 text-sm sm:text-xl py-2">
            <FaGoogle /> Continue With Google
          </button>

          <div className="flex items-center justify-center">
            <span className="border-t border-gray-500 flex-1"></span>
            <span className="mx-2">or</span>
            <span className="border-t border-gray-500 flex-1"></span>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col gap-4"
          >
            <div className="relative">
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-2 transition-all ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-black"
                }`}
              >
                <HiMail className="text-gray-500 text-xl" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  {...formik.getFieldProps("email")}
                  className="flex-1 bg-transparent outline-none text-lg"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-start text-sm mt-1 px-2">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className="relative">
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-2 transition-all ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-black"
                }`}
              >
                <RiLockPasswordLine className="text-gray-500 text-xl" />
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your Password"
                  {...formik.getFieldProps("password")}
                  className="flex-1 bg-transparent outline-none text-lg"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 text-sm"
                >
                  {isPasswordVisible ? (
                    <AiOutlineEyeInvisible className="text-gray-500 text-xl" />
                  ) : (
                    <AiOutlineEye className="text-gray-500 text-xl" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-start text-sm mt-1 px-2">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="w-full text-sm  text-white font-bold font-xl hover:bg-custom-yellow-4/80 transition-all hover:cursor-pointer text-center rounded-md bg-custom-yellow-4 flex items-center justify-center  sm:text-xl py-2"
            >
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex justify-center items-center gap-2 text-sm mb-8 sm:mb-12">
            <p className="text-gray-400">Trouble logging in?</p>
            <Link className="hover-main" href={"/forgetPassword"}>
              <p>Forget password</p>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center border-t-2 border-gray-200 py-2 pt-4 gap-2 text-base sm:text-lg">
          <p className="text-gray-400">Don’t have an account?</p>
          <Link className="text-gray-800/80 hover:scale-105" href="/signup">
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
