import { createSlice } from "@reduxjs/toolkit";
import { getPetfinderTokenAsync } from "./config.api-actions";
import { ConfigState } from "./config.types";
import { RootState } from "../../app/store";

const initialState: ConfigState = {
  petfinderToken: {
    status: "ready",
    value: null,
  },
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPetfinderTokenAsync.pending, (state) => {
        state.petfinderToken.status = "pending";
      })
      .addCase(getPetfinderTokenAsync.fulfilled, (state, action) => {
        state.petfinderToken.status = "ready";
        state.petfinderToken.value = action.payload;
      })
      .addCase(getPetfinderTokenAsync.rejected, (state) => {
        state.petfinderToken.status = "failed";
      });
  },
});

export const {} = configSlice.actions;

export const getPetfinderToken = (state: RootState): string | undefined =>
  state.config.petfinderToken.value?.access_token;

export const isPetfinderTokenStatus = (state: RootState): boolean =>
  state.config.petfinderToken.status === "ready";

export default configSlice.reducer;
