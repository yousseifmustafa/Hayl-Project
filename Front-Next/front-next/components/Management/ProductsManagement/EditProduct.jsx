'use client';

import { useState } from "react";
import { products, Categories } from "../../../Data/Data";

export default function EditProduct({ id }) {
  const product = products.find((p) => p.id === id) || products[0];

  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    priceAfterSale: product.priceAfterSale,
    status: product.status,
    desc: product.desc,
  });

  const [image, setImage] = useState(product.image);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div className="flex flex-col justify-center items-start p-4">
      <div className="p-4 flex w-full mb-4 items-center justify-between">
        <h3 className="text-2xl">Make the changes below</h3>
        <button className="rounded-xl shadow-xl text-white bg-custom-yellow-4 py-2 px-6 font-bold">
          Save
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 w-full">
        <div className="w-full lg:w-1/3 h-auto lg:h-[500px] bg-white rounded-2xl flex flex-col p-6">
          <h4 className="text-2xl font-bold mb-3">Product Image</h4>
          {image ? (
            <img src={image} className="w-full rounded-2xl shadow-xl mb-6" alt="Product" />
          ) : (
            <div className="w-full h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div className="flex mt-4 gap-2">
            <input type="file" id="imageUpload" className="hidden" onChange={handleImageUpload} />
            <label htmlFor="imageUpload" className="cursor-pointer rounded-xl text-white bg-custom-yellow-4 py-1 px-8">
              {image ? "Change" : "Upload"}
            </label>
            {image && (
              <button onClick={handleImageRemove} className="rounded-xl main-color border-[#d4b257] border py-1 px-6">
                Remove
              </button>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/3 h-auto lg:h-[500px] bg-white flex flex-col rounded-2xl p-4 gap-4">
          <h4 className="text-2xl font-bold mb-3">Product Information</h4>

          <div className="flex flex-col lg:flex-row w-full gap-3">
            {[{ label: "Name", id: "name", type: "text", value: formData.name },
              { label: "Category", id: "category", type: "select", value: formData.category, options: Categories }].map(({ label, id, type, value, options }) => (
              <div key={id} className="flex flex-col gap-2 w-full lg:w-[50%]">
                <label htmlFor={id} className="font-bold text-sm">{label}</label>
                {type === "select" ? (
                  <select id={id} className="p-2 border border-gray-200 rounded-lg" value={value} onChange={handleChange}>
                    <option value="">-- Choose a {label} --</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input id={id} type={type} className="rounded-lg p-2 border-gray-200 border" value={value} onChange={handleChange} />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row w-full gap-3">
            {[{ label: "Price", id: "price", type: "number", value: formData.price },
              { label: "Price After Sale", id: "priceAfterSale", type: "number", value: formData.priceAfterSale },
              { label: "Status", id: "status", type: "select", value: formData.status, options: ["In Sale", "Out Sale"] }].map(({ label, id, type, value, options }) => (
              <div key={id} className="flex flex-col gap-2 w-full lg:w-[30%]">
                <label htmlFor={id} className="font-bold text-sm">{label}</label>
                {type === "select" ? (
                  <select id={id} className="p-2 border border-gray-200 rounded-lg" value={value} onChange={handleChange}>
                    <option value="">-- Choose a {label} --</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input id={id} type={type} className="rounded-lg p-2 border-gray-200 border" value={value} onChange={handleChange} />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="desc" className="font-bold text-sm">Description</label>
            <textarea id="desc" className="rounded-lg w-full p-2 border-gray-200 border" value={formData.desc} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}