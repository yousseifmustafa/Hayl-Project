"use client";
import OrderRow from "./OrderRow";

export default function OrderTable({ orders, onSelect }) {
  return (
    <div className="bg-white text-gray-400 text-sm rounded-xl shadow-md p-4 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="p-3"></th>
            <th className="p-3">ID</th>
            <th className="p-3">DATE</th>
            <th className="p-3">STATUS</th>
            <th className="p-3">CUSTOMER</th>
            <th className="p-3">PRODUCT</th>
            <th className="p-3">REVENUE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
