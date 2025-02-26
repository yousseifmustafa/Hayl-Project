"use client";
import EmptyCart from "./EmptyCart";
import { useCart } from "@/Hooks/useProducts";
import { useState, useCallback } from "react";
import ShippingForm from "./ShippingForm";
import CartItems from "./CartItems";
import { FaArrowLeft } from "react-icons/fa";
import UnauthorizedCart from "./UnauthorizedCart";

export default function Cart() {
  const [view, setView] = useState("cart");
  const { data, isLoading, isError } = useCart();
  const cartItems = data?.data?.data;
  const isAuthenticated = !!sessionStorage.getItem("jwt");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    department: "",
    Street: "",
    Building: "",
    city: "",
    state: "",
    postalCode: "",
  });

  if (!isAuthenticated) return <UnauthorizedCart />;

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-2/3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex space-x-4 p-4 border-b"
              >
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/3">
            <div className="animate-pulse p-4 border border-gray-200 rounded-lg">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data?.data?.totalCartItems === 0) {
    return <EmptyCart />;
  }

  return (
    <div>
      {view != "cart" && (
        <button
          onClick={() => setView("cart")}
          className="flex  items-center  gap-2 text-gray-700 hover:text-black cursor-pointer font-semibold text-lg"
        >
          <FaArrowLeft />
          Go Back
        </button>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-4">
          {view == "cart" ? (
            <CartItems cartItems={cartItems} />
          ) : (
            <ShippingForm
              formData={formData}
              handleChange={handleChange}
              setView={setView}
              setFormData={setFormData}
            />
          )}
          <div className="w-full lg:w-1/3  mt-3">
            <div className="sticky top-4 border  border-gray-200 p-4 rounded-lg shadow-sm">
              <h2 className="font-bold text-lg mb-3 text-emerald-950">
                Order Summary
              </h2>
              <div className="flex justify-between mb-3">
                <p className="text-gray-400">
                  Subtotal ({data?.data?.totalCartItems.toFixed(0)} items)
                </p>
                <p className="text-gray-400">
                  EGP {data?.data?.totalCartPrice.toFixed(0)}
                </p>
              </div>
              <div className="flex justify-between mb-3">
                <p className="text-gray-400">Shipping Fee</p>
                <p className="text-emerald-600 font-bold">FREE</p>
              </div>
              <hr className="mb-3" />
              <div className="flex justify-between mb-3">
                <p className="text-emerald-950 font-bold text-lg">Total</p>
                <p className="text-emerald-950 font-bold text-lg">
                  EGP {data?.data?.totalCartPrice.toFixed(0)}
                </p>
              </div>
              <div className="flex   gap-3 items-end justify-center">
                {view == "cart" ? (
                  <button
                    onClick={() => {
                      window.scroll({ top: 0, behavior: "smooth" });
                      setView("Address");
                    }}
                    className="flex items-center  gap-3 hover:cursor-pointer rounded-lg shadow-sm
                 justify-center w-full   bg-custom-yellow-4   hover:bg-custom-yellow-4/80
                 p-2 text-white font-extrabold  mt-3 text-xl b-2"
                    type="button"
                    disabled={0 === "0.00"}
                  >
                    <p>Check Out</p>
                  </button>
                ) : (
                  <button
                    className="flex items-center  gap-3 hover:cursor-pointer rounded-lg shadow-sm
                 justify-center w-full   bg-custom-yellow-4   hover:bg-custom-yellow-4/80
                 p-2 text-white font-extrabold  mt-3 text-xl b-2"
                    type="button"
                    disabled={0 === "0.00"}
                  >
                    <p>Continue to Payment</p>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
