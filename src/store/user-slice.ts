import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("getUser", async (token: string) => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ token, formData }: { token: string; formData: FormData }) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    const data = await response.json();
    return data;
  }
);

export interface UserState {
  firstName: string;
  lastName: string;
  editing: boolean;
  getUserState: {
    isLoading: boolean;
    error: string;
  };
  updateUserState: {
    isLoading: boolean;
    error: string;
  };
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  editing: false,
  getUserState: {
    isLoading: false,
    error: "",
  },
  updateUserState: {
    isLoading: false,
    error: "",
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEditing: (state, action: PayloadAction<boolean | undefined>) => {
      state.editing =
        action.payload === undefined ? !state.editing : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.getUserState.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.getUserState.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.getUserState.error =
        action.error.message || "Une erreur est survenue";
      state.getUserState.isLoading = false;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.updateUserState.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.updateUserState.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.updateUserState.error =
        action.error.message || "Une erreur est survenue";
      state.updateUserState.isLoading = false;
    });
  },
});

export const { setFirstName, setLastName, setEditing } = UserSlice.actions;

export default UserSlice.reducer;
