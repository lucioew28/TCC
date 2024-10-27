import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
