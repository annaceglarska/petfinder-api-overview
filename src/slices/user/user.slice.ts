import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./user.types";
import {
  editUserDataAsync,
  getUserAsync,
  loginUserAsync
} from "./user.api-actions";
import { RootState } from "../../app/store";
import { UserInfo } from "../../services/api/backend/auth/auth.types";
import TokenService from "../../services/token/token";

const initialState: UserState = {
  user: {
    status: "ready",
    value: null,
    error: null,
  },
  editionStatus: "unset",
  editionError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state, _: PayloadAction) => {
      state.user.error = null;
    },
    clearUserData: (state) => {
      state.user.value = null;
    },
    clearUserEditionStatus: (state) => {
      state.editionStatus = "unset";
    },
    saveToken: (state, { payload }: PayloadAction<{ token: string }>) => {
      state.user.value = { ...state.user.value || {}, token: payload.token }
    }
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
      .addCase(editUserDataAsync.fulfilled, (state, action) => {
        state.user.value = {
          token: state.user.value?.token!,
          ...action.payload,
        };
        state.editionStatus = "ready";
        state.editionError = null;
      })
      .addCase(editUserDataAsync.rejected, (state, action) => {
        state.editionError = action.error;
        state.editionStatus = "failed";
      })
      .addCase(editUserDataAsync.pending, (state) => {
        state.editionStatus = "pending";
      })
      .addCase(getUserAsync.pending, (state) => {
        state.user.status = "pending"
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user.status = "ready";
        state.user.value = { ...state.user.value || {}, ...action.payload }
        state.user.error = null;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.user.status = "failed";
        state.user.error = action.error;
      })
  },
});

export const { clearErrors, clearUserData, clearUserEditionStatus, saveToken } =
  userSlice.actions;

// Selectors
export const getUser = (state: RootState): Partial<UserInfo> | null =>
  state.user.user.value;
export const isUserLogged = (state: RootState): boolean =>
  state.user.user.value?.token ? TokenService.validateToken(state.user.user.value.token) : false

export const getError = (state: RootState): any => state.user.user.error;

export const isUserSignInPending = (state: RootState): boolean =>
  state.user.user.status === "pending";

export const isUserEditionReady = (state: RootState): boolean =>
  state.user.editionStatus === "ready";

export default userSlice.reducer;
