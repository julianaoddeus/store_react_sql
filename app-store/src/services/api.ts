import axios from "axios";
import { logout } from "../store/slices/auth_slice";

export const HOST_API = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${HOST_API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    import("../store").then(({ store }) => store.dispatch(logout()));
  }
  return Promise.reject(error);
});