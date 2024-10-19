import { TOKEN_NAME } from "@/lib/constants";
import { getCookies, removeCookies } from "@/lib/storage";
import { Token } from "@/service/types";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export const BASE_API_URL = process.env.NEXT_PUBLIC_API;

const BASE_URL = BASE_API_URL;

axios.defaults.baseURL = BASE_URL;

interface CustomConfig extends AxiosRequestConfig {
  headers: AxiosHeaders;
}

function isTokenExpired(expireTime: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return expireTime < currentTime;
}

const createCustomAxiosInstance = (authToken: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
  });
  instance.interceptors.request.use(
    async (config: CustomConfig) => {
      const accessToken = getCookies(authToken);
      const parsedToken: Token = accessToken && JSON.parse(accessToken);

      if (parsedToken) {
        if (isTokenExpired(parsedToken.expireTime)) {
          removeCookies(TOKEN_NAME);
          window.location.href = "/auth/login";
          return Promise.reject("Token expired");
        }
        config.headers.Authorization = `Bearer ${parsedToken.value}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        removeCookies(TOKEN_NAME);
        console.log("AxiosError", error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const httpClient = createCustomAxiosInstance(TOKEN_NAME);
