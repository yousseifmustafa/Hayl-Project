"use client";

import { useUser } from "@/Hooks/useUser";
import { UpdateMeHandler } from "./AccountHander";
import { useFormik } from "formik";
import { profileValidationSchema } from "./AccountSchema";

export default function Profile() {
  const { data: user } = useUser();
  const UpdateMeMutation = UpdateMeHandler();

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      FirstName: user?.FirstName || "",
      LastName: user?.LastName || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
    },
    enableReinitialize: true,
    validationSchema: profileValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      UpdateMeMutation.mutate(values);
    },
  });

  return (
    <div className="w-full flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-start">
          Profile Info
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 text-gray-700">
              Email
            </label>
            <input
              className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full"
              type="email"
              disabled
              id="email"
              {...formik.getFieldProps("email")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="FirstName" className="mb-2 text-gray-700">
                First Name
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full"
                type="text"
                id="FirstName"
                {...formik.getFieldProps("FirstName")}
              />
              {formik.errors.FirstName && (
                <p className="text-red-500 mt-1 text-sm" aria-live="polite">
                  {formik.errors.FirstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="LastName" className="mb-2 text-gray-700">
                Last Name
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full"
                type="text"
                id="LastName"
                {...formik.getFieldProps("LastName")}
              />
              {formik.errors.LastName && (
                <p className="text-red-500 mt-1 text-sm" aria-live="polite">
                  {formik.errors.LastName}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Gender Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 text-gray-700">
                Phone Number
              </label>
              <input
                className="border border-gray-300 rounded-lg p-3 sm:p-4 w-full"
                type="text"
                id="phone"
                {...formik.getFieldProps("phone")}
              />
              {formik.errors.phone && (
                <p className="text-red-500 mt-1 text-sm" aria-live="polite">
                  {formik.errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 text-gray-700">Gender</label>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className={`p-3 sm:p-4 w-full md:w-32 rounded-lg border font-bold hover:cursor-pointer ${
                    formik.values.gender === "male"
                      ? "main-bg-color text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => formik.setFieldValue("gender", "male")}
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`p-3 sm:p-4 w-full md:w-32 rounded-lg border font-bold hover:cursor-pointer ${
                    formik.values.gender === "female"
                      ? "main-bg-color text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => formik.setFieldValue("gender", "female")}
                >
                  Female
                </button>
              </div>
              {formik.errors.gender && (
                <p className="text-red-500 mt-1 text-sm" aria-live="polite">
                  {formik.errors.gender}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={`w-full p-3 sm:p-4 rounded-lg text-white font-bold transition-all ${
              formik.dirty && formik.isValid
                ? "main-bg-color hover:opacity-90 hover:cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!(formik.dirty && formik.isValid)}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
