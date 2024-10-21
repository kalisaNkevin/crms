import { TOKEN_NAME } from "@/lib/constants";
import { getCookies, removeCookies } from "@/lib/storage";
import { Token } from "@/service/types";
import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

import { BASE_API_URL } from "./env";
import { MOCKAROO_API_KEY } from "./env";

const BASE_URL = BASE_API_URL;

axios.defaults.baseURL = BASE_URL;

interface CustomConfig extends AxiosRequestConfig {
  headers: AxiosHeaders;
}

const createCustomAxiosInstance = (authToken: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
  });

  instance.interceptors.request.use(
    async (config: CustomConfig) => {
      config.headers["X-API-Key"] = MOCKAROO_API_KEY;
      config.headers["Content-Type"] = "application/json";
      config.headers["Accept"] = "application/json";
      const token = getCookies(authToken) as Token | undefined;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token.value}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
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
    },
  );

  return instance;
};

export const httpClient = createCustomAxiosInstance(TOKEN_NAME);
