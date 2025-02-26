"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddressSchema } from "./AccountSchema";

export default function AddressForm({
  address = {},
  onClose,
  onSave,
  onUpdate,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {address?._id ? "Edit Address" : "Add New Address"}
        </h2>

        <Formik
          initialValues={{
            id: address?._id || null,
            name: address?.name || "",
            phone: address?.phone || "",
            department: address?.department || "",
            street: address?.street || "",
            building: address?.building || "",
            city: address?.city || "",
            state: address?.state || "",
            postalCode: address?.postalCode || "",
            isDefault: address?.isDefault || false,
          }}
          validationSchema={AddressSchema}
          onSubmit={(values) => {
            console.log("Submitting values:", values);
            if (address?._id) {
              onUpdate(values);
            } else {
              onSave(values);
            }
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Phone Number", name: "phone" },
                  { label: "Department", name: "department" },
                  { label: "Street", name: "street" },
                  { label: "Building", name: "building" },
                  { label: "City", name: "city" },
                  { label: "State", name: "state" },
                  { label: "Postal Code", name: "postalCode" },
                ].map(({ label, name }) => (
                  <div key={name} className="flex flex-col">
                    <label className="text-gray-700 font-medium">{label}</label>
                    <Field
                      type={name === "postalCode" ? "number" : "text"}
                      name={name}
                      className="mt-1 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-custom-yellow-4 focus:outline-none transition shadow-sm"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={values.isDefault}
                  onChange={() => setFieldValue("isDefault", !values.isDefault)}
                  className="h-5 w-5 text-custom-yellow-4 border-gray-300 rounded-md cursor-pointer"
                />
                <label className="text-gray-700 font-medium cursor-pointer">
                  Set as default address
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-800 font-semibold py-2 px-8 rounded-s-xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-custom-yellow-4 text-white font-bold py-2 px-8 rounded-e-xl hover:bg-custom-yellow-4/80 transition shadow-md"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
