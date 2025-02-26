"use client";

export default function ShippingForm({ handleChange, formData }) {
  return (
    <div className="w-full lg:w-2/3 mt-3">
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <div className="flex  items-center justify-between  font-semibold">
          <p className="text-lg font-semibold mb-4">Shipping Address</p>
          <button className="text-md mb-4 text-custom-yellow-4 hover:cursor-pointer">
            <p>Use Default</p>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
          />
          <input
            name="Street"
            placeholder="Street"
            value={formData.Street}
            onChange={handleChange}
            className="input"
          />
          <input
            name="Building"
            placeholder="Building"
            value={formData.Building}
            onChange={handleChange}
            className="input"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input"
          />
          <input
            name="region"
            placeholder="Region"
            value={formData.region}
            onChange={handleChange}
            className="input"
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>
    </div>
  );
}
