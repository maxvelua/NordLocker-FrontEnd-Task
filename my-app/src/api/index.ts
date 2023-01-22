import axios, { AxiosRequestConfig } from "axios";
import { getAuthCookieToken } from "../services/cookie.service";

export const API = axios.create({
  baseURL: "https://playground.tesonet.lt/v1/",
});

API.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAuthCookieToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Accept = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject({ message: "Username or password is incorrect" });
    }

    if (error.code === "ERR_NETWORK") {
      return Promise.reject({
        message: "Network error, please try again later",
      });
    }

    return Promise.reject(error);
  }
);
