import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAddress,
  defaultAddress,
  DeleteMe,
  editAddress,
  getAddress,
  getMe,
  removeAddress,
  setDefaultAddress,
  UpdateMe,
} from "@/Api/user";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });
};

export const useAddress = () => {
  return useQuery({
    queryKey: ["Address"],
    queryFn: getAddress,
  });
};
export const useDefault = () => {
  return useQuery({
    queryKey: ["defaultAddress"],
    queryFn: defaultAddress,
  });
};

export const useUpdateMe = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (email, FirstName, LastName, phone, gender) =>
      UpdateMe(email, FirstName, LastName, phone, gender),
    onSuccess,
    onError,
  });
};
export const useAddAddress = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      name,
      department,
      street,
      building,
      city,
      state,
      phone,
      isDefault,
      postalCode
    ) =>
      addAddress(
        name,
        department,
        street,
        building,
        city,
        state,
        phone,
        isDefault,
        postalCode
      ),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["Address"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
export const useEditAddress = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      id,
      name,
      department,
      street,
      building,
      city,
      state,
      phone,
      isDefault,
      postalCode
    ) =>
      editAddress(
        id,
        name,
        department,
        street,
        building,
        city,
        state,
        phone,
        isDefault,
        postalCode
      ),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["Address"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useDeleteMe = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: DeleteMe,
    onSuccess,
    onError,
  });
};

export const useDeleteAddress = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => removeAddress(id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["Address"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};

export const useDefaultAddress = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => setDefaultAddress(id),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["Address"]);
      onSuccess && onSuccess(data);
    },
    onError,
  });
};
