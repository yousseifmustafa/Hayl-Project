import {
  useClearCart,
  useRemoveFromCart,
  useToCart,
  useUpdateCart,
} from "@/Hooks/useProducts";
import toast from "react-hot-toast";

export const clearCartHandler = () => {
  const clearCartMutation = useClearCart({
    onSuccess: (data) => {
      toast.success("All Cart Items removed Successfully!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to remove  cart items. Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return clearCartMutation;
};
export const clearCartItemHandler = () => {
  const clearCartItemMutation = useRemoveFromCart({
    onSuccess: (data) => {
      toast.success("Cart Items Removed Successfully!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to remove  cart item. Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return clearCartItemMutation;
};

export const toCartHandler = () => {
  const toCartMutation = useToCart({
    onSuccess: (data) => {
      toast.success("Product Added to cart!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      let errorMessage = "Error Happened ";
      if (error?.response?.data?.message == "Unauthorized: No token found") {
        errorMessage = "Please Login First.";
      }

      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return toCartMutation;
};

export const updateCartHandler = () => {
  const updateCartMutation = useUpdateCart({
    onSuccess: (data) => {},
    onError: (error) => {
      let errorMessage = "Error Happened ";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return updateCartMutation;
};

export const removeFromCartHandler = () => {
  const removeFromCartMutation = useRemoveFromCart({
    onSuccess: (data) => {
      toast.success("Product removed from cart!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to remove from cart . Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return removeFromCartMutation;
};
