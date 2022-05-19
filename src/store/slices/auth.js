import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../services/AuthService';

const initialState = {
  isLogin: false,
};

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

export const RegistrationInServer = createAsyncThunk('auth/RegistrationInServer', async (action) => {
  await AuthService.registration(action);
});

export const LoginInServer = createAsyncThunk('auth/LoginInServer', async (action, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(action);
    const { token } = response.data;
    return token;
  } catch (error) {
    console.log('Пользователь не зарегестрирован');
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userIsAuthorized(state, action) {
      state.isLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginInServer.rejected, () => console.log('logout/rejected'))
      .addCase(LoginInServer.fulfilled, (state, action) => {
        state.isLogin = true;
        localStorage.setItem('token', action.payload);
        localStorage.setItem('isAuth', 'true');
      });
  },
});

const { reducer } = authSlice;
export const { userIsAuthorized } = authSlice.actions;
export default reducer;
