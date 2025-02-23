"use client";

export default function Signup2({ formik, cont, TextField }) {
  return (
    <div>
      {cont && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <TextField
              fullWidth
              label="First Name"
              name="FirstName"
              variant="filled"
              value={formik.values.FirstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.FirstName && Boolean(formik.errors.FirstName)
              }
              helperText={formik.touched.FirstName && formik.errors.FirstName}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="LastName"
              variant="filled"
              value={formik.values.LastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.LastName && Boolean(formik.errors.LastName)}
              helperText={formik.touched.LastName && formik.errors.LastName}
            />
          </div>
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            variant="filled"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            variant="filled"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm)
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          />
          <button
            type="submit"
            className="w-full rounded-md text-sm text-white bg-black hover:bg-custom-yellow-4/80 transition-all hover:cursor-pointer text-center  bg-custom-yellow-4 flex items-center justify-center  sm:text-xl py-2"
            disabled={formik.isSubmitting}
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}
