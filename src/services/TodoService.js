import $api from './apiService';

export const TodoService = {
  postTodos(todo) {
    return $api.post('/todos', {
      todos: todo,
    });
  },
  getTodos() {
    return $api.get('/todos');
  },
};
