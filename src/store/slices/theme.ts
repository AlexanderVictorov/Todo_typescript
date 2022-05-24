import { createSlice } from '@reduxjs/toolkit';

type TTheme = 'light' | 'dark'
interface ITheme {
  theme: TTheme
}
const initialState:ITheme = {
  theme: 'light',
};

const customTheme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changedTheme(state, action) {
      state.theme = action.payload;
    },
  },
});
const { reducer } = customTheme;
export const { changedTheme } = customTheme.actions;
export default reducer;
