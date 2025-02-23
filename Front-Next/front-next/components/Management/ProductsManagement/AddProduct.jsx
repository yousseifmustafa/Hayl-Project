"use client";
import { useState } from "react";
import { Categories } from "../../../Data/Data";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    priceAfterSale: "",
    status: "",
    desc: "",
    image: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file })); 
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Product submitted:", formData);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-4 flex w-full mb-4 items-center justify-between">
        <h3 className="text-2xl">Fill in the details below</h3>
        <button 
          onClick={handleSubmit}
          className="rounded-xl shadow-xl text-white bg-custom-yellow-4 py-2 px-6 font-bold"
        >
          Add Product
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
        
        {/* Product Image Section */}
        <div className="w-full lg:w-1/3 h-[500px] bg-white rounded-2xl flex flex-col p-6 shadow-md">
          <h4 className="text-2xl font-bold mb-3">Product Image</h4>
          <div className="w-[230px] h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
            {formData.image ? (
              <img src={URL.createObjectURL(formData.image)} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
            ) : (
              <span className="text-gray-500">No Image Selected</span>
            )}
          </div>
          <div className="flex mt-4 gap-2">
            <label className="rounded-xl text-white bg-custom-yellow-4 py-1 px-8 cursor-pointer">
              Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
            {formData.image && (
              <button onClick={() => setFormData((prev) => ({ ...prev, image: null }))} className="rounded-xl main-color border-[#d4b257] border py-1 px-6">
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full lg:w-2/3 h-[600px] lg:h-[500px] bg-white flex flex-col rounded-2xl p-4 px-6 gap-4 shadow-md">
          <h4 className="text-2xl font-bold mb-3">Product Information</h4>

          {/* Name & Category */}
          <div className="flex flex-col md:flex-row w-full gap-3">
            {[{ label: "Name", id: "name", type: "text", value: formData.name },
              { label: "Category", id: "category", type: "select", value: formData.category, options: Categories },
            ].map(({ label, id, type, value, options }) => (
              <div key={id} className="flex flex-col gap-2 w-full md:w-[50%]">
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

          {/* Price & Status */}
          <div className="flex flex-col md:flex-row w-full gap-3">
            {[{ label: "Price", id: "price", type: "number", value: formData.price },
              { label: "Price After Sale", id: "priceAfterSale", type: "number", value: formData.priceAfterSale },
              { label: "Status", id: "status", type: "select", value: formData.status, options: ["In Sale", "Out Sale"] },
            ].map(({ label, id, type, value, options }) => (
              <div key={id} className="flex flex-col gap-2 w-full md:w-[33%]">
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

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="desc" className="font-bold text-sm">Description</label>
            <textarea id="desc" className="rounded-lg w-full p-2 border-gray-200 border" value={formData.desc} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
