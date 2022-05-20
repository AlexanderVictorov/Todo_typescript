import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todos';
import authSlice from './slices/auth';

const appReducer = combineReducers({
  auth: authSlice,
  todos: todoSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/pending') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
