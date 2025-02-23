import { useUpdateMe } from "@/Hooks/useUser";
import toast from "react-hot-toast";

export const UpdateMeHandler = () => {
  const UpdateMeMutation = useUpdateMe({
    onSuccess: async (data) => {
      toast.success("Data Updated Successfully", {
        position: "top-right",
      });
    },
    onError: async (error) => {
      toast.error(error?.data?.data?.message || "Sorry Error Occur", {
        position: "top-right",
      });
    },
  });
  return UpdateMeMutation;
};
