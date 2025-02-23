import { getMe, UpdateMe } from "@/Api/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
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
