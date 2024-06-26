import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import useReducer from '../module/User/UserSlice';

export const store = configureStore({
  reducer: {
    user: useReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
