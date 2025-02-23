import { FaCheckCircle } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";

// Dummy orders data (Move this to a shared file if needed)
const ordersData = [
  {
    id: "#10421",
    date: "1 Nov, 10:20 AM",
    status: "Paid",
    customer: "Orlando Imieto",
    product: "Nike Sport V2",
    revenue: "$140.20",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    deliveryStatus: "DELIVERED",
    paymentMethod: "**** **** **** 7852",
    billing: {
      name: "Orlando Imieto",
      company: "Nike Corp",
      email: "orlando@nike.com",
      vat: "FRB5678910",
    },
    priceDetails: { productPrice: 120, delivery: 14, taxes: 6.20 },
  },
  {
    id: "#10422",
    date: "1 Nov, 10:53 AM",
    status: "Paid",
    customer: "Alice Murinho",
    product: "Valvet T-shirt",
    revenue: "$42.00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    deliveryStatus: "SHIPPED",
    paymentMethod: "**** **** **** 4521",
    billing: {
      name: "Alice Murinho",
      company: "Valvet Co",
      email: "alice@valvet.com",
      vat: "FRB9021345",
    },
    priceDetails: { productPrice: 35, delivery: 5, taxes: 2.00 },
  },
];

export default function OrderDetails({ id }) {
  const order = ordersData.find((order) => order.id === id);

  if (!order) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
          <h2 className="text-lg font-semibold text-red-500">Order Not Found</h2>
          <p className="text-gray-600">No order found with ID: {id}</p>
        </div>
      </div>
    );
  }

  const { product, date, status, avatar, deliveryStatus, paymentMethod, billing, priceDetails } = order;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        {/* Order Header */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold">Order Details</h2>
          <p className="text-gray-600">Order no. <span className="font-semibold">{id}</span> from <span className="font-semibold">{date}</span></p>
        </div>

        {/* Product Info */}
        <div className="flex gap-4 items-center border-b pb-4 mb-4">
          <img src={avatar} alt={product} className="w-16 h-16 rounded-md object-cover"/>
          <div>
            <h3 className="font-semibold">{product}</h3>
            <p className="text-sm text-gray-500">Status: {status}</p>
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-semibold">{deliveryStatus}</span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="border-t border-b py-4 mb-4">
          <h3 className="font-semibold text-lg mb-2">Payment details</h3>
          <div className="flex items-center gap-3">
            <FiCreditCard className="text-red-500 text-2xl"/>
            <span className="text-gray-700 font-semibold">{paymentMethod}</span>
          </div>
        </div>

        {/* Billing Information */}
        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold text-lg mb-2">Billing Information</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><span className="font-semibold">{billing.name}</span></p>
            <p className="text-gray-600">Company Name: <span className="font-semibold">{billing.company}</span></p>
            <p className="text-gray-600">Email: <span className="font-semibold">{billing.email}</span></p>
            <p className="text-gray-600">VAT Number: <span className="font-semibold">{billing.vat}</span></p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          <div className="text-gray-600 space-y-1">
            <p>Product Price: <span className="font-semibold">${priceDetails.productPrice}</span></p>
            <p>Delivery: <span className="font-semibold">${priceDetails.delivery}</span></p>
            <p>Taxes: <span className="font-semibold">${priceDetails.taxes}</span></p>
            <p className="text-xl font-bold">Total: ${priceDetails.productPrice + priceDetails.delivery + priceDetails.taxes}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded-md font-bold shadow-md">Invoice</button>
        </div>
      </div>
    </div>
  );
}
