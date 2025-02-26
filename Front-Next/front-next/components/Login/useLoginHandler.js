"use client";
import { useRouter } from "next/navigation";
import { useLogin, useLogout, useSync } from "@/Hooks/useAuth";
import toast from "react-hot-toast";
import { toastStyles } from "@/app/toastStyle";

export const useLoginHandler = () => {
  const router = useRouter();
  const Sync = useSync();
  const loginMutation = useLogin({
    onSuccess: async (data) => {
      const userRole = data?.data?.user?.role || "guest";
      sessionStorage.setItem("role", userRole);
      sessionStorage.setItem("jwt", data?.token);
      const virtualCart = localStorage.getItem("virtualCart");
      const virtualWishlist = localStorage.getItem("virtualWishlist");
      toast.dismiss();
      toast.success("Welcome back! You have successfully logged in.", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
      Sync.mutate({ virtualCart, virtualWishlist });

      localStorage.removeItem("virtualCart");
      localStorage.removeItem("virtualWishlist");
      router.push("/");
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return loginMutation;
};

export const useLogoutHandler = () => {
  const router = useRouter();

  const logoutMutation = useLogout({
    onSuccess: () => {
      toast.dismiss();
      toast.success("You have successfully logged out.", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
      sessionStorage.setItem("role", "guest");
      sessionStorage.setItem("jwt", "");
      setTimeout(() => {
        window.location.reload();
      }, 500);

      router.push("/");
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message || "Logout failed. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });

  return logoutMutation;
};
