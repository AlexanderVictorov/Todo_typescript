import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AXIOS_URL, BASE_URL } from '../config';
import { userIsAuthorized } from '../store/slices/auth';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
const apiService = axios.create({
  withCredentials: true,
  baseURL: AXIOS_URL,
});
const onRequest = (config: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && !config?.url?.includes('auth')) {
    config.headers = {
      ...config.headers || {},
      authorization: `Bearer ${token}`,
    };
  }
  return config;
};

const logout = async () => {
  const importStore = await import('../store/index');
  importStore.store.dispatch(userIsAuthorized(false));
};

const onResponse = (response: AxiosResponse) => response;
const onResponseError = async (error: AxiosError) => {
  const code = error?.response?.status;
  if (code === 401) {
    try {
      const res = await apiService.get('refresh');
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      error.config.headers = {
        ...error.config.headers || {},
        authorization: `Bearer ${newToken}`,
      };
      return $api(error.config);
    } catch (e) {
      if (e.response.status === 401) {
        localStorage.removeItem('token');
        await logout();
      }
    }
  }
  return Promise.reject(error);
};

$api.interceptors.request.use(onRequest);
$api.interceptors.response.use(onResponse, onResponseError);
export default $api;
