import { LOGIN_TOKEN_NAME } from "../constants";

export const setAuthCookie = (token: string) => {
  document.cookie = `loginToken=${token}`;
};

export const getAuthCookieToken = (): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${LOGIN_TOKEN_NAME}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();

  return undefined;
};

export const deleteAuthCookie = () => {
  document.cookie = `${LOGIN_TOKEN_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;}`;
};

export const isAuthCookieExists = (): boolean => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${LOGIN_TOKEN_NAME}=`);

  if (parts.length === 2) {
    return true;
  }

  return false;
};
