"use client";
import { FaArrowRight } from "react-icons/fa6";

export default function SignUp1({ formik, cont, emailValid , setCont ,TextField}) {
  return (
    <div>
      {!cont && (
        <TextField
          fullWidth
          label="Email"
          name="email"
          variant="filled"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      )}

      {!cont && (
        <button
          type="button"
          className="flex text-sm text-white  mt-3 rounded-md group gap-3 w-full transition-all text-center  bg-custom-yellow-4 items-center justify-center  sm:text-xl py-2 bg-black hover:cursor-pointer hover:bg-custom-yellow-4/80"
          onClick={() => {
            if (emailValid) {
              setCont(true);
            }
          }}
          disabled={!emailValid}
        >
          Continue with Email
          <div className="group-hover:translate-x-4 transition-transform">
            <FaArrowRight />
          </div>
        </button>
      )}
    </div>
  );
}
