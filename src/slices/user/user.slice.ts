import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./user.types";
import { loginUserAsync, protectedAsync } from "./user.api-actions";
import { RootState } from "../../app/store";
import { UserInfo } from "../../services/api/backend/auth/auth.types";

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
      })
      .addCase(protectedAsync.fulfilled, () => console.log("Great success"))
      .addCase(protectedAsync.rejected, () => console.log("Failed."));
  },
});

export const {} = userSlice.actions;

// Selectors
export const getUser = (state: RootState): UserInfo | null =>
  state.user.user.value;
export const isUserLogged = (state: RootState): boolean =>
  Boolean(state.user.user.value);

export default userSlice.reducer;
