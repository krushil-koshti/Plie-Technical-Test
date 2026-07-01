import axios from 'axios';
import APIConstant from './APIConstant';
import store from '../Store/redux/store';

const APIManager = axios.create({
  baseURL: APIConstant.BASE_URL,
  timeout: 15000,
});

// Request interceptor to dynamically attach the Bearer token from Redux store
APIManager.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    if (token && token !== 'guest_token') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to log all API responses and errors
APIManager.interceptors.response.use(
  response => {
    console.log(
      `[API SUCCESS] ${response.config.method?.toUpperCase()} ${
        response.config.url
      }:`,
      JSON.stringify(response.data, null, 2),
    );
    return response;
  },
  error => {
    console.log(
      `[API ERROR] ${error.config?.method?.toUpperCase()} ${
        error.config?.url
      }:`,
      JSON.stringify(error.response?.data || error.message, null, 2),
    );
    return Promise.reject(error);
  },
);

export default APIManager;
