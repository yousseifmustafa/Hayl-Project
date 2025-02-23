"use client";

import { TextField, InputAdornment } from "@mui/material";
import { HiLockClosed } from "react-icons/hi";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useResetHandler } from "./useResetHandler";
import { logo } from "@/Data/Data";
import { useCallback, useMemo } from "react";

export default function ResetPasswordForm() {
  const { token } = useParams();
  const resetPasswordMutation = useResetHandler();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .max(128, "Password cannot exceed 128 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#^\-_=?؟@$!%*?&]).{8,}$/,
            "Password must contain at least one letter, one number, and one special character"
          )
          .required("Password is required"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password"), ""], "Passwords must match")
          .required("Confirm Password is required"),
      }),
    []
  );

  const initialValues = useMemo(
    () => ({ password: "", passwordConfirm: "" }),
    []
  );

  const onSubmit = useCallback(
    (values) => {
      resetPasswordMutation.mutate({
        credentials: {
          password: values.password,
          passwordConfirm: values.passwordConfirm,
          email: sessionStorage.getItem("email"),
        },
        token,
      });
    },
    [resetPasswordMutation, token]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="w-full auth z-10 top-0 bottom-0 left-0 right-0 max-h-screen absolute flex items-center justify-center">
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

      <div className="container bg-white mx-auto px-4 sm:px-6 lg:px-8 max-w-md md:max-w-lg lg:max-w-xl z-10 shadow-2xl rounded-2xl shadow-black">
        <div className="w-full text-gray-800/60 md:w-[80%] m-auto text-center flex-col flex gap-4">
          <h4 className="text-4xl my-7">Set New Password</h4>
          <p className="text-gray-500">Enter your new password below.</p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {["password", "passwordConfirm"].map((field) => (
              <TextField
                key={field}
                id={field}
                name={field}
                type="password"
                label={
                  field === "password" ? "New Password" : "Confirm Password"
                }
                variant="outlined"
                fullWidth
                value={formik.values[field]}
                onChange={useCallback(formik.handleChange, [])}
                onBlur={formik.handleBlur}
                error={formik.touched[field] && Boolean(formik.errors[field])}
                helperText={formik.touched[field] && formik.errors[field]}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HiLockClosed className="text-gray-500" />
                    </InputAdornment>
                  ),
                }}
              />
            ))}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`text-white  w-full  hover:cursor-pointer bg-custom-yellow-4 hover:bg-custom-yellow-4/80 transition-all rounded-lg text-xl py-2 ${
                formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {formik.isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="flex items-center justify-center border-t-2 border-gray-200 py-2 pt-4 gap-2 text-base sm:text-lg">
            <p className="text-gray-400">Remembered your password?</p>
            <Link className="text-gray-800/80 hover:scale-105" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
