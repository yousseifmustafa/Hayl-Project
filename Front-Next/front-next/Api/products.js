import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

export const getProducts = async (category, sort, limit, page) => {
  const url = category
    ? `${BASE_URL}/products?limit=${limit}&sort=${sort}&page=${page}&category=${category}`
    : `${BASE_URL}/products?limit=${limit}&sort=${sort}&page=${page}`;

  const response = await axios.get(url);
  return {
    products: response.data?.data?.products || [],
    totalPages: response.data?.pagination?.totalPages || 1,
  };
};

export const getProductsByIds = async (ids) => {
  if (!ids || ids.length === 0) return { products: [] };

  const url = `${BASE_URL}/products?ids=${ids.join(",")}`;
  const response = await axios.get(url);

  return {
    products: response.data?.data?.products || [],
  };
};

export const getWishlist = async () => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(`${BASE_URL}/wishlist`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response?.data?.data;
};

export const toggleWishlist = async (id) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.post(
    `${BASE_URL}/wishlist`,
    { productId: id },
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

export const clearWishlist = async () => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(`${BASE_URL}/Wishlist/clear`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};

export const getCart = async () => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.get(`${BASE_URL}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};

export const clearCart = async () => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(`${BASE_URL}/cart/clear`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};




export const toCart = async (data) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.post(
    `${BASE_URL}/cart`,
    {
      product: data?.id,
      quantity: Number(data?.quantity),
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

export const removeFromCart = async (id) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.delete(`${BASE_URL}/cart`, {
    data: { product: id },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response?.data?.data;
};

export const updateCart = async ({ quantity, productId }) => {
  const token = sessionStorage.getItem("jwt");

  const response = await axios.patch(
    `${BASE_URL}/cart`,
    {
      quantity: Number(quantity),
      product: productId,
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

export const searchProduct = async (search, sort, limit, page) => {
  const response = await axios.get(
    `${BASE_URL}/products/search/${search}?limit=${limit}&sort=${sort}&page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return {
    products: response.data?.data?.products || [],
    totalPages: response.data?.pagination?.totalPages || 1,
  };
};
