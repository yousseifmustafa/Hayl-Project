"use client";
import Image from "next/image";
import {
  clearCartHandler,
  clearCartItemHandler,
  updateCartHandler,
} from "./CartHandler";
import { MdDeleteForever } from "react-icons/md";

export default function CartItems({ cartItems }) {
  const updateCartMutation = updateCartHandler();
  const clearCartItemMutation = clearCartItemHandler();
  const clearCartMutation = clearCartHandler();

  function clearHandler() {
    clearCartMutation.mutate();
  }

  function ClearItemHandler(id) {
    clearCartItemMutation.mutate(id);
  }

  function UpdateHandler(quantity, productId) {
    if (quantity < 1) return;
    updateCartMutation.mutate({ quantity, productId });
  }

  return (
    <div className="w-full lg:w-2/3 border-[1px] rounded-lg p-4 mt-3 overflow-x-auto">
      <div className="my-2 flex items-center justify-between mb-6">
        <h3 className="text-4xl font-extrabold text-gray-800/80">Cart</h3>
        <button
          className="flex items-center justify-center group text-gray-800/80"
          onClick={clearHandler}
        >
          <MdDeleteForever className="text-gray-700 group-hover:rotate-[360deg] transition-all duration-700" />
          <p>Remove</p>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm text-start text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 text-center">Image</th>
              <th className="px-4 py-3 text-center">Product</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item) => (
              <tr
                key={item?.product?._id}
                className="bg-white border-b-[1px] border-gray-100 text-center"
              >
                <td className="p-4">
                  <Image
                    src={item?.product?.image}
                    width={64}
                    height={64}
                    alt={item?.product?.description}
                    className="w-16 h-16 bg-cover rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-4 font-semibold">
                  {item?.product?.name}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3 justify-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        UpdateHandler(
                          Number(e.target.value),
                          item?.product?._id
                        )
                      }
                      className="w-14 text-center font-semibold text-gray-800 border rounded-2xl px-2 py-1 outline-none focus:ring-2 focus:ring-custom-yellow-4"
                      onBlur={(e) =>
                        UpdateHandler(
                          Number(e.target.value),
                          item?.product?._id
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          UpdateHandler(
                            Number(e.target.value),
                            item?.product?._id
                          );
                        }
                      }}
                    />
                  </div>
                </td>
                {item?.totalItemPrice &&
                item?.totalPriceAfterSale < item?.totalItemPrice ? (
                  <td className="px-4 py-4 font-semibold flex flex-col items-center justify-center gap-3">
                    <span className="line-through">
                      EGP {item?.totalItemPrice.toFixed(2)}
                    </span>
                    <span>EGP {item?.totalPriceAfterSale?.toFixed(2)}</span>
                  </td>
                ) : (
                  <td className="px-4 py-4 font-semibold flex items-center justify-center gap-3">
                    <span className="text-center pt-4">
                      EGP {item?.totalPriceAfterSale?.toFixed(2)}
                    </span>
                  </td>
                )}
                <td className="ps-2 md:ps-8 py-4">
                  <button
                    className="flex items-center justify-center group text-gray-800/80"
                    onClick={() => ClearItemHandler(item?.product?._id)}
                  >
                    <MdDeleteForever className="text-gray-700 group-hover:rotate-[360deg] transition-all duration-700" />
                    <p>Remove</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
