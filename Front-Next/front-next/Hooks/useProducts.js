import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProducts,
  getProductById,
  getWishlist,
  removeFromCart,
  toCart,
  getCart,
  clearCart,
  updateCart,
  searchProduct,
  clearWishlist,
  toggleWishlist,
  getProductsByIds,
} from "@/Api/products";

export const useProducts = (category, sort, limit, page) => {
  return useQuery({
    queryKey: ["products", category, sort, limit, page],
    queryFn: () => getProducts(category, sort, limit, page),
  });
};
export const useProductsByIds = (ids) => {
  return useQuery({
    queryKey: ["TempData", ids],
    queryFn: () => getProductsByIds(ids),
  });
};

export const useSearch = (searchTerm, sort, limit, page) => {
  return useQuery({
    queryKey: ["products", searchTerm, sort, limit, page],
    queryFn: () => searchProduct(searchTerm, sort, limit, page),
    enabled: !!searchTerm,
  });
};

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

export const useClearCart = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useToCart = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => toCart(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useUpdateCart = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateCart(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useRemoveFromCart = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => removeFromCart(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });
};

export const useProductById = (id, quantity) => {
  return useQuery({
    queryKey: ["product", id, quantity],
    queryFn: () => getProductById(id, quantity),
    enabled: !!id,
  });
};

export const useToggleWishlist = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => toggleWishlist(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["wishlist"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useClearWishlist = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearWishlist,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["wishlist"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
