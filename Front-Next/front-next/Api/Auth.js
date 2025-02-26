import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export const Login = async (credentials) => {
  const { data } = await axios.post(`${BASE_URL}/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return data;
};

export const Sync = async ({ virtualCart, virtualWishlist }) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.post(
    `${BASE_URL}/sync`,
    {
      virtualCart: JSON.parse(virtualCart),
      virtualWishlist: JSON.parse(virtualWishlist),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response;
};

export const Logout = async () => {
  const { data } = await axios.post(
    `${BASE_URL}/logout`,
    {},
    { withCredentials: true }
  );
  return data;
};

export const Signup = async (credentials) => {
  credentials;
  const { data } = await axios.post(`${BASE_URL}/signup`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return credentials;
};

export const ForgetPassword = async (email) => {
  const { data } = await axios.post(
    `${BASE_URL}/forgetPassword`,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return email;
};

export const ResetPassword = async (credentials) => {
  console.log("ana el reset Validation : ", credentials);

  const { data } = await axios.patch(`${BASE_URL}/resetPassword`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

export const UpdatePassword = async ({
  oldPassword,
  newPassword,
  passwordConfirm,
}) => {
  const token = sessionStorage.getItem("jwt");

  console.log(
    "ana el Update Validation : ",
    oldPassword,
    newPassword,
    passwordConfirm
  );

  const { data } = await axios.patch(
    `${BASE_URL}/updatePassword`,
    { oldPassword, newPassword, passwordConfirm },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return data;
};

export const confirmEmail = async ({ email, otpCode }) => {
  const { data } = await axios.post(
    `${BASE_URL}/confirmEmail`,
    {
      email,
      otpCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
export const regeneratePasswordOtp = async (email) => {
  const { data } = await axios.post(
    `${BASE_URL}/regeneratePasswordOtp`,
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
export const validateResetOtp = async ({ email, otpCode }) => {
  const { data } = await axios.post(
    `${BASE_URL}/validateResetOtp`,
    {
      email,
      otpCode,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
export const regenerateOtp = async (email) => {
  const { data } = await axios.post(
    `${BASE_URL}/regenerateOtp`,
    {
      email,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data;
};
