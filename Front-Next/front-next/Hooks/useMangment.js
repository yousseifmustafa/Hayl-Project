import { addProduct } from "@/Api/mangment";

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
