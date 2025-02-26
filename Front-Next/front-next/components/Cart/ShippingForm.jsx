"use client";

import { useDefault } from "@/Hooks/useUser";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AddressSchema } from "@/components/Account/AccountSchema";

export default function ShippingForm({ handleChange, formData, setFormData }) {
  const { data } = useDefault();
  const [defaultAddress, setDefaultAddress] = useState(null);

  useEffect(() => {
    if (data) {
      setDefaultAddress(data);
    }
  }, [data]);

  const handleUseDefault = (setFieldValue) => {
    if (defaultAddress) {
      setFieldValue("name", defaultAddress.name || "");
      setFieldValue("phone", defaultAddress.phone || "");
      setFieldValue("department", defaultAddress.department || "");
      setFieldValue("street", defaultAddress.street || "");
      setFieldValue("building", defaultAddress.building || "");
      setFieldValue("city", defaultAddress.city || "");
      setFieldValue("state", defaultAddress.state || "");
      setFieldValue("postalCode", defaultAddress.postalCode || "");
    }
  };

  return (
    <div className="w-full lg:w-2/3 mt-3">
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <Formik
          initialValues={{
            name: formData.name || "",
            phone: formData.phone || "",
            department: formData.department || "",
            street: formData.street || "",
            building: formData.building || "",
            city: formData.city || "",
            state: formData.state || "",
            postalCode: formData.postalCode || "",
          }}
          validationSchema={AddressSchema}
          onSubmit={(values) => setFormData(values)}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="flex items-center justify-between font-semibold">
                <p className="text-lg font-semibold mb-4">Shipping Address</p>
                {defaultAddress && (
                  <button
                    type="button"
                    onClick={() => handleUseDefault(setFieldValue)}
                    className="text-md mb-4 text-custom-yellow-4 hover:cursor-pointer"
                  >
                    Use Default
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Field name={name} placeholder={label} className="input" />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
