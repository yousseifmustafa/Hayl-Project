import { useMutation } from "@tanstack/react-query";
import {
  Login,
  Logout,
  Signup,
  ForgetPassword,
  ResetPassword,
  Sync,
  regenerateOtp,
  confirmEmail,
  validateResetOtp,
  regeneratePasswordOtp,
} from "../Api/Auth";

export const useLogin = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (credentials) => Login(credentials),
    onSuccess,
    onError,
  });
};

export const useSync = () => {
  return useMutation({
    mutationFn: ({ virtualCart, virtualWishlist }) =>
      Sync({ virtualCart, virtualWishlist }),
  });
};

export const useLogout = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: Logout,
    onSuccess,
    onError,
  });
};

export const useSignup = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (credentials) => Signup(credentials),
    onSuccess,
    onError,
  });
};

export const useForgetPassword = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (email) => ForgetPassword(email),
    onSuccess,
    onError,
  });
};

export const useResetPassword = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ credentials, token }) => ResetPassword(credentials, token),
    onSuccess,
    onError,
  });
};
export const useRegenerateOtp = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (email) => regenerateOtp(email),
    onSuccess,
    onError,
  });
};
export const useConfirmEmail = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ email, otpCode }) => confirmEmail({ email, otpCode }),
    onSuccess,
    onError,
  });
};

export const useValidateResetOtp = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ email, otpCode }) => validateResetOtp({ email, otpCode }),
    onSuccess,
    onError,
  });
};

export const useRegeneratePasswordOtp = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (email) => regeneratePasswordOtp(email),
    onSuccess,
    onError,
  });
};
