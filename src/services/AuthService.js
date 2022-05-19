import $api from './apiService';

export const AuthService = {
  login({ username, email, password }) {
    return $api.post('/auth/login', { username, email, password });
  },
  registration({ username, email, password }) {
    return $api.post('/auth/registration', { username, email, password });
  },
  logout() {
    return $api.post('/auth/logout');
  },
};
