import { useClearWishlist, useToggleWishlist } from "@/Hooks/useProducts";
import toast from "react-hot-toast";

export const toggleWishlistHandler = () => {
  const toggleWishlistMutation = useToggleWishlist({
    onSuccess: (data) => {
      console.log("data :", data);
      toast.success(data?.data?.message, {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      let errorMessage = "Error Happened";
      if (error?.response?.data?.message == "Unauthorized: No token found") {
        errorMessage = "Please Login First.";
      }

      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return toggleWishlistMutation;
};

export const clearWishlistHandler = () => {
  const removeFromWishlistMutation = useClearWishlist({
    onSuccess: (data) => {
      toast.success("Your Wishlist is Empty Now!", {
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to Clear Wishlist . Please try again.";
      toast.error(errorMessage, { position: "top-right" });
    },
  });

  return removeFromWishlistMutation;
};
