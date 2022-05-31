import $api from './apiService';
import { ITodo } from '../types/types';

export const TodoService = {
  postTodos(todo: ITodo[]) {
    return $api.post('/todos', {
      todos: todo,
    });
  },
  getTodos() {
    return $api.get('/todos');
  },
};
