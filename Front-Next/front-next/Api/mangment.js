import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export const addProduct = async ({
  name,
  price,
  category,
  description,
  priceAfterSale,
  image,
  slug,
}) => {
  const token = sessionStorage.getItem("jwt");
  const response = axios.post(
    `${BASE_URL}/products`,
    { name, price, category, description, priceAfterSale, image, slug },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export const UpdateProduct = async ({
  name,
  price,
  category,
  description,
  priceAfterSale,
  slug,
  id,
}) => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.patch(
    `${BASE_URL}/products`,
    {
      name,
      price,
      category,
      description,
      priceAfterSale,
      slug,
      id,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const uploadImage = async ({ id, file }) => {
  const formData = new FormData();
  formData.append("image", file);
  const token = sessionStorage.getItem("jwt");

  const response = await axios.patch(
    `${BASE_URL}/products/image/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteImage = async (productId) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(
    `${BASE_URL}/products/image/${productId}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteProducts = async (id) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(`${BASE_URL}/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};
