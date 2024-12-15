import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number | Date;
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export const setCookie = (
  key: string,
  value: string,
  options?: CookieOptions
): void => {
  Cookies.set(key, value, options);
};

export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

export const removeCookie = (key: string, options?: CookieOptions): void => {
  Cookies.remove(key, options);
};
