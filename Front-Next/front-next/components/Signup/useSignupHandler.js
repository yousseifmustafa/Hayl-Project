"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useConfirmEmail, useRegenerateOtp, useSignup } from "@/Hooks/useAuth";
import { toastStyles } from "@/app/toastStyle";

export const useSignupHandler = () => {
  const router = useRouter();

  const SignupMutation = useSignup({
    onSuccess: (data) => {
      sessionStorage.setItem("email", data?.email);
      toast.dismiss();

      toast.success(
        data?.response?.data?.message ||
          "A confirmation OTP has been sent to your email.",
        {
          position: "top-right",
          duration: 6000,
          style: toastStyles.success,
        }
      );
      router.push("/RegisterValidate");
    },
    onError: (error) => {
      toast.dismiss();

      toast.error(
        `${
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        }`,
        {
          position: "top-right",
          style: toastStyles.error,
        }
      );
    },
  });

  return SignupMutation;
};

export const useRegenerateOtpHandler = () => {
  const regenerateOtpMutation = useRegenerateOtp({
    onSuccess: (data) => {
      toast.dismiss();

      toast.success(
        data?.response?.data?.message || "A new OTP has been sent successfully.",
        {
          position: "top-right",
          duration: 6000,
          style: toastStyles.success,
        }
      );
    },
    onError: (error) => {
      toast.dismiss();

      toast.error(
        `${
          error?.response?.data?.message ||
          "An error occurred. Please try again."
        }`,
        {
          position: "top-right",
          style: toastStyles.error,
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
      toast.dismiss();

      toast.success("Your account has been successfully created.", {
        position: "top-right",
        duration: 6000,
        style: toastStyles.success,
      });
    },
    onError: (error) => {
      toast.dismiss();

      toast.error(
        `${error?.response?.data?.message || "Invalid OTP. Please try again."}`,
        {
          position: "top-right",
          style: toastStyles.error,
        }
      );
    },
  });

  return ConfirmEmailMutation;
};
