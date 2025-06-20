import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
  "signinUser",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export interface SigninState {
  email: string;
  password: string;
  rememberMe: boolean;
  token: string;
  error: string;
  isLoading: boolean;
}

const initialState: SigninState = {
  email: "",
  password: "",
  rememberMe: false,
  token: "",
  error: "",
  isLoading: false,
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
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      const token = action.payload.body.token;
      state.token = token;
      state.isLoading = false;
      if (state.rememberMe) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.error = action.error.message || "Une erreur est survenue";
      state.isLoading = false;
    });
    builder.addCase(signInUser.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setEmail, setPassword, setRememberMe, setToken } =
  SigninSlice.actions;

export default SigninSlice.reducer;
