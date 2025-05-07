import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "X-API-TOKEN": import.meta.env.VITE_LOCAL_API_KEY //Insert here your random token
  }
});

export default api;