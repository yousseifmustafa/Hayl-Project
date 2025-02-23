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
export const UpdateMe = async ({
  email,
  FirstName,
  LastName,
  phone,
  gender,
}) => {
  const token = sessionStorage.getItem("jwt");
  console.log(
    "Here is Updated Data ",
    email,
    FirstName,
    LastName,
    phone,
    gender
  );

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
