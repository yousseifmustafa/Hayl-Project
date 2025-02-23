import toast from "react-hot-toast";

export const useVirtualCart = () => {
  const getCart = () => {
    const storedCart = localStorage.getItem("virtualCart");
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const addToCart = (item) => {
    const cart = getCart();
    cart.push(item);
    localStorage.setItem("virtualCart", JSON.stringify(cart));

    toast.success("Item Added to Cart Successfully", {
      position: "top-right",
    });

    return cart;
  };

  const removeFromCart = (product) => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.product !== product);
    localStorage.setItem("virtualCart", JSON.stringify(updatedCart));

    toast.success("Item Removed from Cart Successfully", {
      position: "top-right",
    });

    return updatedCart;
  };

  const clearCart = () => {
    localStorage.setItem("virtualCart", JSON.stringify([]));
    toast.success("Cart is Empty Now!", {
      position: "top-right",
    });
  };

  return { cart: getCart(), addToCart, removeFromCart, clearCart };
};
