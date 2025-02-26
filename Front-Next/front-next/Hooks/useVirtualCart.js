import toast from "react-hot-toast";
import { toastStyles } from "@/app/toastStyle";

export const useVirtualCart = () => {
  const getCart = () => {
    const storedCart = localStorage.getItem("virtualCart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const addToCart = (item) => {
    const cart = getCart();
    cart.push(item);
    localStorage.setItem("virtualCart", JSON.stringify(cart));
    toast.dismiss();

    toast.success("Product added to cart.", {
      style: toastStyles.success,
      position: "top-right",
    });

    return cart;
  };

  const removeFromCart = (product) => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.product !== product);
    localStorage.setItem("virtualCart", JSON.stringify(updatedCart));
    toast.dismiss();

    toast.success("Product removed from cart.", {
      position: "top-right",
      style: toastStyles.success,
    });

    return updatedCart;
  };

  const clearCart = () => {
    localStorage.setItem("virtualCart", JSON.stringify([]));
    toast.dismiss();

    toast.success("Cart is now empty.", {
      style: toastStyles.success,
      position: "top-right",
    });
  };

  return { cart: getCart(), addToCart, removeFromCart, clearCart };
};
