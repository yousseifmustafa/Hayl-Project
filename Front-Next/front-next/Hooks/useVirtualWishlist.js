"use Client";
import { useState } from "react";
import toast from "react-hot-toast";
import { toastStyles } from "@/app/toastStyle";

export const useVirtualWishlist = () => {
  const [refresh, setRefresh] = useState(false);
  const wishlist = JSON.parse(localStorage.getItem("virtualWishlist")) || [];
  const toggleWishlist = (productId) => {
    let Wishlist = JSON.parse(localStorage.getItem("virtualWishlist")) || [];

    const isFound = Wishlist.some((item) => {
      const match = item === productId;
      return match;
    });

    if (isFound) {
      Wishlist = Wishlist.filter((item) => item !== productId);

      localStorage.setItem("virtualWishlist", JSON.stringify(Wishlist));
      toast.dismiss();
      toast.success("Product removed from wishlist.", {
        style: toastStyles.success,
        position: "top-right",
      });
    } else {
      Wishlist.push(productId);
      toast.dismiss();
      toast.success("Product added to wishlist.", {
        style: toastStyles.success,
        position: "top-right",
      });
    }

    localStorage.setItem("virtualWishlist", JSON.stringify(Wishlist));
    return Wishlist;
  };

  const clearWishlist = () => {
    localStorage.setItem("virtualWishlist", JSON.stringify([]));
    setRefresh(!refresh);
  };

  return { wishlist, toggleWishlist, clearWishlist };
};
