"use client";

export default function OrderRow({ order, onSelect }) {
  return (
    <tr
      onClick={() => onSelect(order.id)}
      className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
    >
      <td className="p-3"></td>
      <td className="p-3">{order.id}</td>
      <td className="p-3">{order.date}</td>
      <td className="p-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            order.status === "Paid"
              ? "bg-green-100 text-green-600"
              : order.status === "Refunded"
              ? "bg-gray-200 text-gray-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {order.status}
        </span>
      </td>
      <td className="p-3 flex items-center gap-2">
        <img
          src={order.avatar}
          alt={order.customer}
          className="w-8 h-8 rounded-full"
        />
        {order.customer}
      </td>
      <td className="p-3">{order.product}</td>
      <td className="p-3">{order.revenue}</td>
    </tr>
  );
}
