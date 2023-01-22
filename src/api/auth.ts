import { AxiosError } from "axios";
import { API } from ".";
import { setAuthCookie } from "../services/cookie.service";
import { LoginCredentials } from "../types/types";

export const authAPI = {
  login: (payload: LoginCredentials) => {
    return API.post("tokens", payload)
      .then((res) => {
        setAuthCookie(res.data.token);
        return res.data;
      })
      .catch((err: AxiosError) => {
        return Promise.reject(err);
      });
  },
};
