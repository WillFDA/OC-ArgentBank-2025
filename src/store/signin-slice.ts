import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SigninState {
  email: string;
  password: string;
  rememberMe: boolean;
  token: string;
}

const initialState: SigninState = {
  email: "",
  password: "",
  rememberMe: false,
  token: "",
};

export const SigninSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setEmail, setPassword, setRememberMe, setToken } =
  SigninSlice.actions;

export default SigninSlice.reducer;
