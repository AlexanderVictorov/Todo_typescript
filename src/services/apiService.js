import axios from 'axios';
import { BASE_URL, AXIOS_URL } from '../config';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});
const apiService = axios.create({
  withCredentials: true,
  baseURL: AXIOS_URL,
});

const onRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.includes('auth')) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};
const onResponse = (response) => response;
const onResponseError = async (error) => {
  const code = error.response.status;
  if (code === 401) {
    try {
      const res = await apiService.get('refresh');
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      error.config.headers.authorization = `Bearer ${newToken}`;
      return $api(error.config);
    } catch (e) {
      if (e.response.status === 401) {
        // store.dispatch(userIsAuthorized(false));
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    }
  }
  return Promise.reject(error);
};

$api.interceptors.request.use(onRequest);
$api.interceptors.response.use(onResponse, onResponseError);
export default $api;
