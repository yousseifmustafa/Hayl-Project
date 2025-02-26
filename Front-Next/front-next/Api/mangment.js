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
