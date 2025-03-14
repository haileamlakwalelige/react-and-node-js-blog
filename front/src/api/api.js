import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token"); // Retrieve token from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Set token in the Authorization header
  }
  return config;
});

export default api;
