import { toastStyles } from "@/app/toastStyle";
import { useAddProduct } from "@/Hooks/useMangment";
import toast from "react-hot-toast";

export const AddProductHandler = () => {
  const AddProductMutation = useAddProduct({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Product Added successfully.", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage =
        error?.response?.data?.message || "Error Happened. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });
  return AddProductMutation;
};
