import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./user.types";
import { loginUserAsync } from "./user.api-actions";

const initialState: UserState = {
  user: {
    status: "ready",
    value: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.user.status = "pending";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user.status = "ready";
        state.user.value = action.payload || null;
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.user.status = "failed";
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
