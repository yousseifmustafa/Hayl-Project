"use client";
import { useUpdatePassword } from "@/Hooks/useAuth";
import {
  useAddAddress,
  useDefaultAddress,
  useDeleteAddress,
  useDeleteMe,
  useEditAddress,
  useUpdateMe,
} from "@/Hooks/useUser";
import toast from "react-hot-toast";
import { toastStyles } from "@/app/toastStyle";
import { useRouter } from "next/navigation";

export const UpdateMeHandler = () => {
  const UpdateMeMutation = useUpdateMe({
    onSuccess: async (data) => {
      toast.remove();
      toast.success("Your information has been updated successfully.", {
        position: "top-right",
        style: toastStyles.success,
      });
    },
    onError: async (error) => {
      toast.remove();
      toast.error(
        error?.data?.data?.message ||
          "An error occurred while updating your information. Please try again.",
        {
          position: "top-right",
          style: toastStyles.error,
        }
      );
    },
  });
  return UpdateMeMutation;
};

export const useUpdateHandler = () => {
  const updatePasswordMutation = useUpdatePassword({
    onSuccess: (data) => {
      toast.remove();
      toast.success(
        data?.response?.data?.message ||
          "Your password has been changed successfully.",
        { position: "top-right", style: toastStyles.success }
      );
    },
    onError: (error) => {
      toast.remove();
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password. Please try again.",
        { position: "top-right", style: toastStyles.error }
      );
    },
  });

  return updatePasswordMutation;
};

export const useDeleteHandler = () => {
  const router = useRouter();
  const DeleteMeMutation = useDeleteMe({
    onSuccess: (data) => {
      sessionStorage.setItem("role", "guest");
      sessionStorage.setItem("jwt", "");
      toast.remove();
      router.push("/");
      toast.success(
        data?.response?.data?.message ||
          "Your account has been deleted successfully.",
        { position: "top-right", style: toastStyles.success }
      );
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error) => {
      toast.remove();
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete account. Please try again later.",
        { position: "top-right", style: toastStyles.error }
      );
    },
  });

  return DeleteMeMutation;
};

export const useDeleteAddressHandler = () => {
  const DeleteAddressMutation = useDeleteAddress({
    onSuccess: (data) => {
      toast.remove();
      toast.success(
        data?.response?.data?.message || "Address deleted successfully.",
        { position: "top-right", style: toastStyles.success }
      );
    },
    onError: (error) => {
      toast.remove();
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete the address. Please try again later.",
        { position: "top-right", style: toastStyles.error }
      );
    },
  });

  return DeleteAddressMutation;
};

export const useSetDefaultAddressHandler = () => {
  const DefaultAddressMutation = useDefaultAddress({
    onSuccess: (data) => {
      toast.remove();
      toast.success(
        data?.response?.data?.message || "Default address set successfully.",
        {
          position: "top-right",
          style: toastStyles.success,
        }
      );
    },
    onError: (error) => {
      toast.remove();
      toast.error(
        error?.response?.data?.message ||
          "Failed to set default address. Please try again.",
        { position: "top-right", style: toastStyles.error }
      );
    },
  });

  return DefaultAddressMutation;
};

export const useAddAddressHandler = () => {
  const addAddressMutation = useAddAddress({
    onSuccess: (data) => {
      toast.remove();
      toast.success(
        data?.response?.data?.message || "Address added successfully.",
        { position: "top-right", style: toastStyles.success }
      );
    },
    onError: (error) => {
      toast.remove();
      toast.error("Failed to add the address. Please try again.", {
        position: "top-right",
        style: toastStyles.error,
      });
    },
  });

  return addAddressMutation;
};

export const useEditAddressHandler = () => {
  const editAddressMutation = useEditAddress({
    onSuccess: (data) => {
      toast.remove();
      toast.success(
        data?.response?.data?.message || "Address updated successfully.",
        { position: "top-right", style: toastStyles.success }
      );
    },
    onError: (error) => {
      toast.remove();
      toast.error("Failed to update the address. Please try again.", {
        position: "top-right",
        style: toastStyles.error,
      });
    },
  });

  return editAddressMutation;
};
