import { useClearWishlist, useToggleWishlist } from "@/Hooks/useProducts";
import toast from "react-hot-toast";
import { toastStyles } from "@/app/toastStyle";

export const toggleWishlistHandler = () => {
  const toggleWishlistMutation = useToggleWishlist({
    onSuccess: (data) => {
      toast.dismiss();

      toast.success(data?.data?.message, {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      let errorMessage = "An error occurred.";
      if (error?.response?.data?.message === "Unauthorized: No token found") {
        errorMessage = "Please log in first.";
      }

      toast.dismiss();

      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return toggleWishlistMutation;
};

export const clearWishlistHandler = () => {
  const removeFromWishlistMutation = useClearWishlist({
    onSuccess: () => {
      toast.dismiss();

      toast.success("Your wishlist is now empty!", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to clear wishlist. Please try again.";

      toast.dismiss();

      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return removeFromWishlistMutation;
};
