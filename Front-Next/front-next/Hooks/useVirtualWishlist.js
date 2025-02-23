"use Client";
import { useState } from "react";
import toast from "react-hot-toast";

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

      toast.success("Item removed From Wishlist Successfully", {
        position: "top-right",
      });
    } else {
      Wishlist.push(productId);
      toast.success("Item Added to Wishlist Successfully", {
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
