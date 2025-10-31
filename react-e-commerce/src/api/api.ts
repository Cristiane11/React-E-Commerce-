import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};

export const getProductsByCategory = async (category: string) => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};

export default api;
