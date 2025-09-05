import axios from "axios";
import type { AxiosInstance } from "axios";

const TokenReq: AxiosInstance = axios.create({
  headers: {
    accept: "application/json",
  },
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL,
});

export { TokenReq };
