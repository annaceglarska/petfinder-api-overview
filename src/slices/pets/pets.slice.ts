import { createSlice } from "@reduxjs/toolkit";
import { PetsState } from "./pets.types";
import { getPetsAsync } from "./pets.api-actions";

const initialState: PetsState = {
  pets: {
    status: "ready",
    value: null,
  },
};

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPetsAsync.pending, (state) => {
        state.pets.status = "pending";
      })
      .addCase(getPetsAsync.fulfilled, (state, action) => {
        state.pets.status = "ready";
        state.pets.value = action.payload || null;
      })
      .addCase(getPetsAsync.rejected, (state) => {
        state.pets.status = "failed";
      });
  },
});

export const {} = petsSlice.actions;

export default petsSlice.reducer;
