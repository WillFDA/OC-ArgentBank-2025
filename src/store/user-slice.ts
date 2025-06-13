import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  firstName: string;
  lastName: string;
  editing: boolean;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  editing: false,
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
    setEditing: (state) => {
      state.editing = !state.editing;
    },
  },
});

export const { setFirstName, setLastName, setEditing } = UserSlice.actions;

export default UserSlice.reducer;
