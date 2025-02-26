import {
  useClearCart,
  useRemoveFromCart,
  useToCart,
  useUpdateCart,
} from "@/Hooks/useProducts";
import toast from "react-hot-toast";
import { toastStyles } from "@/app/toastStyle";

export const clearCartHandler = () => {
  const clearCartMutation = useClearCart({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("All cart items have been removed successfully!", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to remove cart items. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        style: toastStyles.error,
      });
    },
  });

  return clearCartMutation;
};

export const clearCartItemHandler = () => {
  const clearCartItemMutation = useRemoveFromCart({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Cart item removed successfully!", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to remove cart item. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return clearCartItemMutation;
};

export const toCartHandler = () => {
  const toCartMutation = useToCart({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Product added to cart successfully!", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      let errorMessage = "An error occurred.";
      if (error?.response?.data?.message === "Unauthorized: No token found") {
        errorMessage = "Please log in first.";
      }

      toast.error(errorMessage, {
        position: "top-right",
        style: toastStyles.error,
      });
    },
  });

  return toCartMutation;
};

export const updateCartHandler = () => {
  const updateCartMutation = useUpdateCart({
    onSuccess: (data) => {},
    onError: (error) => {
      toast.dismiss();
      let errorMessage = "An error occurred.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return updateCartMutation;
};

export const removeFromCartHandler = () => {
  const removeFromCartMutation = useRemoveFromCart({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Product removed from cart successfully!", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to remove product from cart. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return removeFromCartMutation;
};
