"use client";

import Image from "next/image";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { DeleteProductHandler } from "./mangeProductHandler";

export default function ProductList({ displayedProducts, setView, setId }) {
  const deleteProductMutation = DeleteProductHandler();

  const ClearHandler = (id) => {
    deleteProductMutation.mutate(id);
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200 text-gray-500">
          {["Product", "Category", "Price", "Status", "Action"].map(
            (heading) => (
              <th key={heading} className="text-left p-3 font-semibold">
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {displayedProducts?.length > 0 ? (
          displayedProducts.map(
            ({ _id, name, category, price, status, image }, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="p-3 flex items-center gap-3">
                  <Image
                    src={image || "/default-image.jpg"}
                    alt={name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded"
                  />
                  <span className="font-medium">{name}</span>
                </td>
                <td className="p-3">{category}</td>
                <td className="p-3">{price}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      status === "in"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {status === "in" ? "IN Sale" : "OUT OF Sale"}
                  </span>
                </td>
                <td className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setView("edit");
                      setId(_id);
                    }}
                    className="p-2 bg-gray-300 rounded-full hover:cursor-pointer"
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={() => {
                      ClearHandler(_id);
                      setId(_id);
                    }}
                    className="p-2 bg-gray-300 text-red-600 rounded-full hover:cursor-pointer"
                  >
                    <MdOutlineDelete />
                  </button>
                  <button
                    onClick={() => {
                      setView("preview");
                      setId(_id);
                    }}
                    className="p-2 bg-gray-300 text-green-600 rounded-full hover:cursor-pointer"
                  >
                    <FaRegEye />
                  </button>
                </td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan="6" className="text-center p-4 text-gray-500">
              No products available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
