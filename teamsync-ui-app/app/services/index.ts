import axios, { AxiosRequestConfig } from "axios";
import { config } from "../configs/config";

const DataService = {
  get: (url: string, options: AxiosRequestConfig = {}) => {
    options.method = "GET";
    return sendRequest(url, options);
  },
  post: (url: string, options: AxiosRequestConfig = {}) => {
    options.method = "POST";
    return sendRequest(url, options);
  },
  update: (url: string, options: AxiosRequestConfig = {}) => {
    options.method = "PUT";
    return sendRequest(url, options);
  },
  patch: (url: string, options: AxiosRequestConfig = {}) => {
    options.method = "PATCH";
    return sendRequest(url, options);
  },
  delete: (url: string, options: AxiosRequestConfig = {}) => {
    options.method = "DELETE";
    return sendRequest(url, options);
  },
};

const sendRequest = async (url: string, options: AxiosRequestConfig) => {
  const { responseType = "json", headers = {}, params, data } = options || {};
  const fullUrl = config().API_SERVER_URL + url;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(headers || {}),
  };

  try {
    const response = await axios({
      url: fullUrl,
      method: options.method,
      headers: defaultHeaders,
      params,
      data,
      responseType,
    });

    return response.data;
  } catch (error: any) {
    console.error("API Error:", error?.response || error.message);
    throw error?.response?.data || { message: "Something went wrong" };
  }
};

export default DataService;
