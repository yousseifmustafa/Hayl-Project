"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import OrderTable from "./OrderTable";
import SearchInput from "./OrderSearch";
import ActionButtons from "./ActionButtons";
import OrderDetails from "./OrderDetails";

const ordersData = [
  {
    id: "#10421",
    date: "1 Nov, 10:20 AM",
    status: "Paid",
    customer: "Orlando Imieto",
    product: "Nike Sport V2",
    revenue: "$140.20",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "#10422",
    date: "1 Nov, 10:53 AM",
    status: "Paid",
    customer: "Alice Murinho",
    product: "Valvet T-shirt",
    revenue: "$42.00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "#10423",
    date: "1 Nov, 11:13 AM",
    status: "Refunded",
    customer: "Michael Mirra",
    product: "Leather Wallet",
    revenue: "$25.50",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export default function OrderManagement() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState("discover");
  const [id, setId] = useState(null);

  const filteredOrders = ordersData.filter(
    (order) =>
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase())
  );

  if (view === "discover") {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-custom-yellow-4 text-white py-2 rounded-xl px-6 shadow-md font-bold">
            <span className="text-sm">New Order</span>
          </button>
          <ActionButtons />
        </div>

        <div className="bg-white">
          <div className="pt-4 pe-4 w-full flex items-center my-4 justify-end">
            <SearchInput
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <OrderTable
            orders={filteredOrders}
            onSelect={(id) => {
              setId(id);
              setView("Preview");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => {
          setView("discover");
          setId(null);
        }}
        className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer font-semibold text-lg my-4"
      >
        <FaArrowLeft />
        Go Back
      </button>
      {view === "Preview" && <OrderDetails id={id} />}
    </div>
  );
}
