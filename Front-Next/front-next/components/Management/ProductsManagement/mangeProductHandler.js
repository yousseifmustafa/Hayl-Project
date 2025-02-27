import { toastStyles } from "@/app/toastStyle";
import {
  useAddProduct,
  useDeleteImage,
  useDeleteProduct,
  useUpdateProduct,
  useUploadImage,
} from "@/Hooks/useMangment";
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
export const UpdateProductHandler = () => {
  const UpdateProductMutation = useUpdateProduct({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Product Updated successfully.", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage = "Error Happened. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });
  return UpdateProductMutation;
};
export const UploadImageHandler = () => {
  const uploadImageMutation = useUploadImage({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Image Uploaded successfully.", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage = "Error Happened. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });
  return uploadImageMutation;
};
export const DeleteImageHandler = () => {
  const DeleteImageMutation = useDeleteImage({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Image Deleted successfully.", {
        style: toastStyles.success,
        position: "top-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.dismiss();
      const errorMessage = "Error Happened. Please try again.";
      toast.error(errorMessage, {
        style: toastStyles.error,
        position: "top-right",
      });
    },
  });
  return DeleteImageMutation;
};
export const DeleteProductHandler = () => {
  const deleteProductMutation = useDeleteProduct({
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Product Deleted successfully.", {
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
  return deleteProductMutation;
};
