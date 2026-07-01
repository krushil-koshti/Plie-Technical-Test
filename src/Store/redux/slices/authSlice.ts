import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userData: any | null;
}

const initialState: AuthState = {
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; user?: any }>
    ) => {
      state.token = action.payload.token;
      state.userData = action.payload.user || null;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
