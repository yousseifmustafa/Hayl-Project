import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useResetPassword,
  useForgetPassword,
  useValidateResetOtp,
  useRegeneratePasswordOtp,
} from "@/Hooks/useAuth";
import { toastStyles } from "@/app/toastStyle";

export const useForgetHandler = () => {
  const router = useRouter();

  const ForgetPasswordMutation = useForgetPassword({
    onSuccess: (data) => {
      toast.dismiss();
      sessionStorage.setItem("email", data);
      router.push("/ResetValidate");
      toast.success("A password reset OTP has been sent.", {
        position: "top-right",
        duration: 6000,
        style: toastStyles.success,
      });
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(
        `${
          error?.response?.data?.message || "No account found with this email."
        }`,
        {
          position: "top-right",
          style: toastStyles.error,
        }
      );
    },
  });

  return ForgetPasswordMutation;
};

export const useResetHandler = () => {
  const router = useRouter();
  const ResetPasswordMutation = useResetPassword({
    onSuccess: (data) => {
      sessionStorage.removeItem("email");
      toast.dismiss();
      router.push("/login");
      toast.success(
        data?.response?.data?.message ||
          "Your password has been successfully changed.",
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

  return ResetPasswordMutation;
};

export const useRegeneratePasswordOtpHandler = () => {
  const useRegeneratePasswordOtpMutation = useRegeneratePasswordOtp({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(
        data?.response?.data?.message ||
          "A new OTP has been sent successfully.",
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

  return useRegeneratePasswordOtpMutation;
};

export const useValidateResetOtpHandler = () => {
  const router = useRouter();
  const ValidateResetOtpMutation = useValidateResetOtp({
    onSuccess: () => {
      toast.dismiss();
      router.push("/resetPassword");
      toast.success("OTP verified successfully.", {
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

  return ValidateResetOtpMutation;
};
