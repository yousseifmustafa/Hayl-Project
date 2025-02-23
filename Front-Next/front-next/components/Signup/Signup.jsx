"use client";
import Link from "next/link";
import { logo } from "@/Data/Data";
import { TextField } from "@mui/material";
import { useState, useCallback, useMemo, useLayoutEffect } from "react";
import { useFormik } from "formik";
import { signupValidationSchema } from "@/components/Signup/ValidateSchema";
import { useSignupHandler } from "@/components/Signup/useSignupHandler";
import { FaArrowLeft, FaGoogle } from "react-icons/fa";
import SignUp1 from "./SignUp1";
import Signup2 from "./Signup2";

export default function SignUp() {
  const [cont, setCont] = useState(false);
  const SignupMutation = useSignupHandler();

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: useCallback(
      async (values) => {
        SignupMutation.mutate(values);
      },
      [SignupMutation]
    ),
  });

  const handleContToggle = useCallback(() => {
    setCont((prev) => !prev);
  }, []);

  const emailValid = useMemo(
    () => !formik.errors.email && formik.touched.email,
    [formik.errors, formik.touched]
  );

  return (
    <div className="w-full absolute top-0 bottom-0 left-0 right-0 min-h-screen flex items-center justify-center p-4 auth">
      <div className={`${cont ? "opacity-0 lg:opacity-100" : ""}`}>
        <div className="absolute z-100 me-4 top-0 right-0 w-[150px]">
          <Link href="/">
            <img src={logo} alt="El hayl Logo" className="w-full" />
          </Link>
        </div>
      </div>
      <div className="w-full bg-white max-w-lg p-6 sm:p-8 shadow-2xl rounded-2xl shadow-gray-200">
        <div className="w-full text-center flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            {cont && (
              <button
                className="text-xl text-gray-800/60 border-2 rounded-lg border-transparent px-2 hover:cursor-pointer hover:bg-gray-100"
                onClick={handleContToggle}
              >
                <FaArrowLeft />
              </button>
            )}

            <h4 className="text-2xl  text-gray-800/60  sm:text-4xl my-5">
              Sign Up Free Account
            </h4>
          </div>

          <button className="w-full text-sm text-white bg-custom-yellow-4 hover:bg-custom-yellow-4/80 text-main transition-all hover:cursor-pointer text-center rounded-md bg-black flex items-center justify-center gap-4  sm:text-xl py-2">
            <FaGoogle />
            Continue With Google
          </button>

          <div className="flex items-center justify-center">
            <span className="border-t border-gray-500 flex-1"></span>
            <span className="mx-2">or</span>
            <span className="border-t border-gray-500 flex-1"></span>
          </div>

          <form
            className="w-full flex flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <SignUp1
              cont={cont}
              formik={formik}
              emailValid={emailValid}
              setCont={setCont}
              TextField={TextField}
            />
            <Signup2
              cont={cont}
              formik={formik}
              emailValid={emailValid}
              setCont={setCont}
              TextField={TextField}
            />
          </form>
        </div>

        <div className="flex items-center justify-center border-t-2 border-gray-300 py-2 pt-4 gap-2 text-sm sm:text-lg mt-3">
          <p className="text-gray-400">Already have an account?</p>
          <Link className="text-gray-800/80  hover:scale-105" href="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
