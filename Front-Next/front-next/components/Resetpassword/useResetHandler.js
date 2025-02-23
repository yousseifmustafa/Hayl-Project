import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useResetPassword,
  useForgetPassword,
  useValidateResetOtp,
  useRegeneratePasswordOtp,
} from "@/Hooks/useAuth";

export const useForgetHandler = () => {
  const router = useRouter();

  const ForgetPasswordMutation = useForgetPassword({
    onSuccess: (data) => {
      console.log(data);

      sessionStorage.setItem("email", data);
      router.push("/ResetValidate");
      toast.success("Password reset OTP sent", {
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
        `${error?.response?.data?.message || "No user with this email"}`,
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

  return ForgetPasswordMutation;
};

export const useResetHandler = () => {
  const router = useRouter();
  const ResetPasswordMutation = useResetPassword({
    onSuccess: (data) => {
      sessionStorage.removeItem("email");

      router.push("/login");
      toast.success(
        data?.response?.data?.message || "Password Changed successfully ",
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
      router.push("/Login");
    },
    onError: (error) => {
      router.push("/login");
      console.log("error : ", error);

      toast.error(
        `${error?.response?.data?.message || "Sorry There is an Error Occur"}`,
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

  return ResetPasswordMutation;
};

export const useRegeneratePasswordOtpHandler = () => {
  const useRegeneratePasswordOtpMutation = useRegeneratePasswordOtp({
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

  return useRegeneratePasswordOtpMutation;
};

export const useValidateResetOtpHandler = () => {
  const router = useRouter();

  const ValidateResetOtpMutation = useValidateResetOtp({
    onSuccess: () => {
      router.push("/resetPassword");
      toast.success("Valid OTP.", {
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

  return ValidateResetOtpMutation;
};
