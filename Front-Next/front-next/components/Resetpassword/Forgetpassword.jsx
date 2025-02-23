"use client";

import { TextField } from "@mui/material";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgetHandler } from "@/components/Resetpassword/useResetHandler";
import { logo } from "@/Data/Data";
import { useCallback, useMemo } from "react";

export default function ResetPassword() {
  const ForgetPasswordMutation = useForgetHandler();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      }),
    []
  );

  const initialValues = useMemo(
    () => ({
      email: "",
    }),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: useCallback(
      async (values) => {
        ForgetPasswordMutation.mutate(values.email);
      },
      [ForgetPasswordMutation]
    ),
  });

  return (
    <div className="w-full auth z-10 top-0 bottom-0 left-0 right-0 absolute flex items-center justify-center">
      <div className="absolute z-100 me-4 top-0 right-0 w-[150px]">
        <Link href="/">
          <img
            src={logo}
            alt="El hayl Logo"
            className="w-full"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="container bg-white mx-auto px-4 sm:px-6 lg:px-8 max-w-md md:max-w-lg lg:max-w-xl z-10 shadow-2xl rounded-2xl shadow-gray-200">
        <div className="w-full text-gray-800/60 md:w-[80%] m-auto text-center flex-col flex gap-4">
          <h4 className="text-4xl my-7">Forget Password</h4>
          <p className="text-gray-500 mb-2">
            Enter your email to receive reset instructions.
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Enter your Email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={useCallback(formik.handleChange, [])}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <button
              type="submit"
              disabled={formik.isSubmitting || ForgetPasswordMutation.isSuccess}
              className={`w-full text-white  bg-custom-yellow-4  hover:cursor-pointer hover:bg-custom-yellow-4/80 transition-all rounded-lg text-xl py-2 ${
                formik.isSubmitting || ForgetPasswordMutation.isSuccess
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {ForgetPasswordMutation.isSuccess
                ? "Email Sent!"
                : formik.isSubmitting
                ? "Sending..."
                : "Send Reset OTP"}
            </button>
          </form>

          <div className="flex items-center justify-center border-t-2 border-gray-200 py-2 pt-4 gap-2 text-base sm:text-lg">
            <p className="text-gray-400">Remember your password?</p>
            <Link className=" text-gray-800/60 hover:scale-105" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
