"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { Categories } from "../../../Data/Data";
import { AddProductHandler } from "./mangeProductHandler";
import { validationSchema } from "./productSchema";

export default function AddProduct() {
  const AddProductMutation = AddProductHandler();
  const [previewImage, setPreviewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      priceAfterSale: "",
      tags: "",
      description: "",
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      AddProductMutation.mutate(values);
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-center items-center p-4 w-full max-w-4xl mx-auto"
    >
      <div className="p-4 flex w-full mb-4 items-center justify-between">
        <h3 className="text-2xl">Fill in the details below</h3>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
        <div className="w-full lg:w-1/3 h-[500px] bg-white rounded-2xl flex flex-col p-6 shadow-md">
          <h4 className="text-2xl font-bold mb-3">Product Image</h4>
          <div className="w-[230px] h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-full h-full object-cover rounded-2xl"
                alt="Preview"
              />
            ) : (
              <span className="text-gray-500">No Image Selected</span>
            )}
          </div>
          <div className="flex mt-4 gap-2">
            <label className="rounded-xl text-white bg-custom-yellow-4 py-1 px-8 cursor-pointer">
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {previewImage && (
              <button
                type="button"
                onClick={() => {
                  formik.setFieldValue("image", null);
                  setPreviewImage(null);
                }}
                className="rounded-xl main-color border-[#d4b257] border py-1 px-6"
              >
                Remove
              </button>
            )}
          </div>
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
        </div>

        <div className="w-full lg:w-2/3 h-[600px] lg:h-[500px] bg-white flex flex-col rounded-2xl p-4 px-6 gap-4 shadow-md">
          <h4 className="text-2xl font-bold mb-3">Product Information</h4>

          <div className="flex flex-col md:flex-row w-full gap-3">
            {[
              { label: "Name", id: "name", type: "text" },
              {
                label: "Category",
                id: "category",
                type: "select",
                options: Categories,
              },
            ].map(({ label, id, type, options }) => (
              <div key={id} className="flex flex-col gap-2 w-full md:w-[50%]">
                <label htmlFor={id} className="font-bold text-sm">
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    id={id}
                    className="p-2 border border-gray-200 rounded-lg"
                    {...formik.getFieldProps(id)}
                  >
                    <option value="">-- Choose a {label} --</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id}
                    type={type}
                    className="rounded-lg p-2 border-gray-200 border"
                    {...formik.getFieldProps(id)}
                  />
                )}
                {formik.touched[id] && formik.errors[id] && (
                  <p className="text-red-500 text-sm">{formik.errors[id]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row w-full gap-3">
            {[
              { label: "Price", id: "price", type: "number" },
              {
                label: "Price After Sale",
                id: "priceAfterSale",
                type: "number",
              },
              {
                label: "Tags",
                id: "tags",
                type: "select",
                options: ["sale", "new", "bestseller", "featured"],
              },
            ].map(({ label, id, type, options }) => (
              <div key={id} className="flex flex-col gap-2 w-full md:w-[33%]">
                <label htmlFor={id} className="font-bold text-sm">
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    id={id}
                    className="p-2 border border-gray-200 rounded-lg"
                    {...formik.getFieldProps(id)}
                  >
                    <option value="">-- Choose a {label} --</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={id}
                    type={type}
                    className="rounded-lg p-2 border-gray-200 border"
                    {...formik.getFieldProps(id)}
                  />
                )}
                {formik.touched[id] && formik.errors[id] && (
                  <p className="text-red-500 text-sm">{formik.errors[id]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-bold text-sm">
              Description
            </label>
            <textarea
              id="description"
              className="rounded-lg w-full p-2 border-gray-200 border"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg text-white bg-custom-yellow-4 py-2 px-6 font-bold"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
}
