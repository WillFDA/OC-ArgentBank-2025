import { configureStore } from "@reduxjs/toolkit";
import SigninReducer from "./signin-slice";
import UserReducer from "./user-slice";

export const store = configureStore({
  reducer: {
    signin: SigninReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
