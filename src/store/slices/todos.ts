import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TodoService } from '../../services/TodoService';
import { ITodo } from '../../types/types';
import { RootState } from '../index';

interface IState {
  todos: ITodo[];
  loading: boolean;
}

const initialState: IState = {
  todos: [],
  loading: false,
};
export const fetchTodos = createAsyncThunk('todoSlice/fetchTodos', async () => {
  const response = await TodoService.getTodos();
  return response.data;
});

export const saveTodoOnServer = createAsyncThunk('todoSlice/saveTodoOnServer', async (_, state) => {
  const appState = state.getState() as RootState;
  const { todos } = appState.todos;
  await TodoService.postTodos(todos);
});

const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action) {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    changeStatus(state, action) {
      state.todos = state.todos.map((item) => {
        if (item.id !== action.payload.id) return item;
        if (action.payload.statusTodoDone) {
          return {
            ...item,
            status: action.payload.statusTodoDone,
          };
        }
        if (action.payload.statusTodoActive) {
          return {
            ...item,
            status: action.payload.statusTodoActive,
          };
        }
        if (action.payload.statusTodoTrash) {
          return {
            ...item,
            status: action.payload.statusTodoTrash,
          };
        }
        return item;
      });
    },
    changeTodos(state, action) {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.newText,
          };
        }
        return item;
      });
    },
    leadTimeTodo(state, action) {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            validity: action.payload.newTime,
          };
        }
        return item;
      });
    },
    overdueTask(state, action) {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            overdue: action.payload.activeTime,
          };
        }
        return item;
      });
    },
    validForExecution(state, action) {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            overdue: action.payload.timeOver,
          };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { state.loading = true; })
      .addCase(fetchTodos.rejected, (state) => {
        console.log('fetchTodos.rejected');
        state.loading = false;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }) => {
        state.todos = payload;
        state.loading = false;
      });
  },
});

export const {
  addTodo, deleteTodo, changeTodos, changeStatus, leadTimeTodo, overdueTask, validForExecution,
} = todoSlice.actions;
export default todoSlice.reducer;
