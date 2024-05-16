import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./user.types";
import { loginUserAsync, protectedAsync } from "./user.api-actions";
import { RootState } from "../../app/store";
import { UserInfo } from "../../services/api/backend/auth/auth.types";

const initialState: UserState = {
  user: {
    status: "ready",
    value: null,
    error: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state, _: PayloadAction) => {
      state.user.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.user.status = "pending";
        state.user.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user.status = "ready";
        state.user.value = action.payload || null;
        state.user.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.user.status = "failed";
        state.user.error = action.error;
      })
      .addCase(protectedAsync.fulfilled, () => console.log("Great success"))
      .addCase(protectedAsync.rejected, () => console.log("Failed."));
  },
});

export const { clearErrors } = userSlice.actions;

// Selectors
export const getUser = (state: RootState): UserInfo | null =>
  state.user.user.value;
export const isUserLogged = (state: RootState): boolean =>
  Boolean(state.user.user.value);

export const getError = (state: RootState): any => state.user.user.error;

export const isUserSignInPending = (state: RootState): boolean =>
  state.user.user.status === "pending";

export default userSlice.reducer;
