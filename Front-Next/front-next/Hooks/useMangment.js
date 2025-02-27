import {
  addProduct,
  deleteImage,
  deleteProducts,
  UpdateProduct,
  uploadImage,
} from "@/Api/mangment";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddProduct = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
export const useUpdateProduct = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => UpdateProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
export const useUploadImage = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => uploadImage(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
export const useDeleteImage = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteImage(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
export const useDeleteProduct = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProducts(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
