import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export const getMe = async () => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${BASE_URL}/Me`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response?.data?.user;
};
export const getAddress = async () => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${BASE_URL}/Address`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response?.data?.data;
};

export const removeAddress = async (id) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(`${BASE_URL}/Address`, {
    data: { id },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};

export const setDefaultAddress = async (id) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.patch(
    `${BASE_URL}/DefaultAddress`,
    { id },
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

export const UpdateMe = async ({
  email,
  FirstName,
  LastName,
  phone,
  gender,
}) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.patch(
    `${BASE_URL}/Me`,
    {
      email,
      FirstName,
      LastName,
      phone,
      gender,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data?.user;
};

export const addAddress = async ({
  name,
  department,
  street,
  building,
  city,
  state,
  phone,
  isDefault,
  postalCode,
}) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.post(
    `${BASE_URL}/Address`,
    {
      name,
      department,
      street,
      building,
      city,
      state,
      phone,
      isDefault,
      postalCode,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
};
export const editAddress = async ({
  id,
  name,
  department,
  street,
  building,
  city,
  state,
  phone,
  isDefault,
  postalCode,
}) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.patch(
    `${BASE_URL}/Address`,
    {
      id,
      name,
      department,
      street,
      building,
      city,
      state,
      phone,
      isDefault,
      postalCode,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response?.data;
};

export const DeleteMe = async () => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(`${BASE_URL}/Me`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
