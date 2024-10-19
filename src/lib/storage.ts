import Cookies from "js-cookie";

export const setCookies = (title: string, value: any, expires?: number) => {
  Cookies.set(title, value, { expires });
};

export const removeCookies = (title: string) => {
  Cookies.remove(title);
};

export const getCookies = (title: string) => {
  return Cookies.get(title);
};
