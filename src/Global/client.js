import axios from "axios";

const instance = axios.create();

export const clientState = {
  requesting: false,
  refreshingToken: false,
};

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const requestAPI = async ({
  method = "GET",
  endpoint,
  data,
  headers,
  isLogin = false,
}) => {
  let result = {};
  const url = `http://localhost:8001/api/v1${endpoint}`;
  const timeout = process.env.REACT_APP_DEFAULT_TIMEOUT;
  const token = localStorage.getItem("token");
  console.log('token', token)

  let optHeaders = {
    ...headers,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Content-Type": "application/json",
    Accept: "application/vnd.api+json",
  };
  if (!isLogin) optHeaders = { ...optHeaders, Authorization: `Bearer ${token}` };

  const reqConfig = { url, method, timeout, headers: optHeaders, data };
  if (!endpoint) throw new Error("Parameter url diperlukan");
  
  clientState.requesting = true;

  try {
    const apiResponse = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = new Error("Waktu Permintaan Habis");
        error.code = "E_REQUEST_TIMOUT";
        error.message = `Waktu Permintaan Habis selama ${timeout} ms`;
        reject(error);
      }, timeout);
      try {
        const res = axios.request(reqConfig);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
    result = { ...apiResponse.data, isError: false };
    
    clientState.requesting = false;

    return result;
  } catch (error) {
    if (error.response.status === 401) {
      if (!clientState.refreshingToken) { 
        clientState.refreshingToken = true;
      }
    }
    
    clientState.requesting = false;
    result = {
      status: error.response.status,
      error: error.response.data,
      isError: true,
    };
    return result;
  }
};

export default {
  requestAPI,
};