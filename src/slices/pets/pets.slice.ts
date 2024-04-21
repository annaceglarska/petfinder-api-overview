import { createSlice } from "@reduxjs/toolkit";
import { PetsState } from "./pets.types";
import { getPetTypesAsync, getPetsAsync } from "./pets.api-actions";
import { RootState } from "../../app/store";
import {
  AnimalType,
  AnimalTypesDetails,
  Pet,
} from "../../services/api/pets/pets.types";

const initialState: PetsState = {
  pets: {
    status: "ready",
    value: null,
  },
  types: {
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
      })
      .addCase(getPetTypesAsync.pending, (state) => {
        state.types.status = "pending";
      })
      .addCase(getPetTypesAsync.fulfilled, (state, action) => {
        state.types.status = "ready";
        state.types.value = action.payload || null;
      })
      .addCase(getPetTypesAsync.rejected, (state) => {
        state.types.status = "failed";
      });
  },
});

export const {} = petsSlice.actions;

export const getPets = (state: RootState): Pet[] =>
  state.pets.pets.value?.animals || [];

export const getPetTypeInfoByTypeName =
  (type: AnimalType) =>
  (state: RootState): AnimalTypesDetails | null =>
    state.pets.types.value?.types.find(
      (typeInfo) => typeInfo.name.toLowerCase() === type
    ) || null;

export default petsSlice.reducer;
