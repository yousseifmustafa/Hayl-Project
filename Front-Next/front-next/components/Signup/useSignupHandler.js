"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useConfirmEmail, useRegenerateOtp, useSignup } from "@/Hooks/useAuth";
import { regenerateOtp } from "@/Api/Auth";

export const useSignupHandler = () => {
  const router = useRouter();

  const SignupMutation = useSignup({
    onSuccess: (data) => {
      sessionStorage.setItem("email", data?.email);
      toast.success(
        data?.response?.data?.message ||
          "A confirmation OTP has been sent to your email.",
        {
          position: "top-right",
          duration: 6000,
          style: {
            background: "#28a745",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "700",
            maxWidth: "500px",
            animation: "slideIn 0.5s ease-out",
          },
        }
      );
      router.push("/RegisterValidate");
    },
    onError: (error) => {
      toast.error(
        `${
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        }`,
        {
          position: "top-right",
          style: {
            background: "#dc3545",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "700",
            maxWidth: "500px",
            animation: "slideIn 0.5s ease-out",
          },
        }
      );
    },
  });

  return SignupMutation;
};

export const useRegenerateOtpHandler = () => {
  const regenerateOtpMutation = useRegenerateOtp({
    onSuccess: (data) => {
      toast.success(
        data?.response?.data?.message || "OTP has been sent successfully.",
        {
          position: "top-right",
          duration: 6000,
          style: {
            background: "#28a745",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "700",
            maxWidth: "500px",
            animation: "slideIn 0.5s ease-out",
          },
        }
      );
    },
    onError: (error) => {
      toast.error(
        `${
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        }`,
        {
          position: "top-right",
          style: {
            background: "#dc3545",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "700",
            maxWidth: "500px",
            animation: "slideIn 0.5s ease-out",
          },
        }
      );
    },
  });

  return regenerateOtpMutation;
};

export const useConfirmEmailHandler = () => {
  const router = useRouter();

  const ConfirmEmailMutation = useConfirmEmail({
    onSuccess: () => {
      router.push("/Login");
      sessionStorage.removeItem("email");
      toast.success("Your account has been created successfully.", {
        position: "top-right",
        duration: 6000,
        style: {
          background: "#28a745",
          color: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px 40px",
          fontSize: "18px",
          fontWeight: "700",
          maxWidth: "500px",
          animation: "slideIn 0.5s ease-out",
        },
      });
    },
    onError: (error) => {
      toast.error(
        `${error?.response?.data?.message || "Invalid OTP. Please try again."}`,
        {
          position: "top-right",
          style: {
            background: "#dc3545",
            color: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px 40px",
            fontSize: "18px",
            fontWeight: "700",
            maxWidth: "500px",
            animation: "slideIn 0.5s ease-out",
          },
        }
      );
    },
  });

  return ConfirmEmailMutation;
};
