import $api from './apiService';
import { IAction } from '../types/types';

export const AuthService = {
  login({ username, email, password }:IAction) {
    return $api.post('/auth/login', { username, email, password });
  },
  registration({ username, email, password }:IAction) {
    return $api.post('/auth/registration', { username, email, password });
  },
  logout() {
    return $api.post('/auth/logout');
  },
};
