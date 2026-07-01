import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import favouriteReducer from './slices/favouriteSlice';
import storage from '../../utils/storage';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favourite: favouriteReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.token) {
    storage.setItem('auth_token', state.auth.token);
  } else {
    storage.removeItem('auth_token');
  }

  if (state.auth.userData) {
    storage.setItem('auth_user_data', JSON.stringify(state.auth.userData));
  } else {
    storage.removeItem('auth_user_data');
  }

  storage.setItem('favourite_events', JSON.stringify(state.favourite.favouriteEvents));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
