import { LOGIN_TOKEN_NAME } from "../constants";
import {
  setAuthCookie,
  getAuthCookieToken,
  deleteAuthCookie,
  isAuthCookieExists,
} from "../services/cookie.service";

describe("Cookie service", () => {
  afterEach(() => {
    document.cookie = `${LOGIN_TOKEN_NAME}=1; expires=1 Jan 1970 00:00:00 GMT;`;
  });

  it("should set auth cookie", () => {
    const token = "test";

    setAuthCookie(token);

    expect(document.cookie).toBe(`${LOGIN_TOKEN_NAME}=${token}`);
  });

  it("should return auth cookie", () => {
    const token = "test";
    let authCookieToken;

    setAuthCookie(token);
    authCookieToken = getAuthCookieToken();

    expect(authCookieToken).toBe(token);
  });

  it("should return undefined when cookie is not set", () => {
    const authCookieToken = getAuthCookieToken();

    expect(authCookieToken).toBeUndefined();
  });

  it("should delete auth cookie", () => {
    const token = "test";
    let authCookieToken;

    setAuthCookie(token);
    deleteAuthCookie();
    authCookieToken = getAuthCookieToken();

    expect(authCookieToken).toBeUndefined();
  });

  it("should return true if auth cookie exist", () => {
    const token = "test";
    let isExist;

    setAuthCookie(token);
    isExist = isAuthCookieExists();

    expect(isExist).toBeTruthy();
  });

  it("should return false if auth cookie don't exist", () => {
    const isExist = isAuthCookieExists();

    expect(isExist).toBeFalsy();
  });
});
