import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PetsState } from "./pets.types";
import {
  getPetAsync,
  getPetTypesAsync,
  getPetsAsync,
} from "./pets.api-actions";
import { RootState } from "../../app/store";
import {
  AnimalType,
  AnimalTypesDetails,
  Pet,
} from "../../services/api/petfinder/pets/pets.types";

const initialState: PetsState = {
  pets: {
    status: "ready",
    value: null,
  },
  types: {
    status: "ready",
    value: null,
  },
  pet: {
    status: "ready",
    value: null,
  },
};

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    clearPets: (state, _: PayloadAction) => {
      state.pets.value = null;
    },
    clearTypes: (state, _: PayloadAction) => {
      state.types.value = null;
    },
    clearPet: (state, _: PayloadAction) => {
      state.pet.value = null;
    },
  },
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
      })
      .addCase(getPetAsync.pending, (state) => {
        state.pet.status = "pending";
      })
      .addCase(getPetAsync.fulfilled, (state, action) => {
        state.pet.status = "ready";
        state.pet.value = action.payload || null;
      })
      .addCase(getPetAsync.rejected, (state) => {
        state.pet.status = "failed";
      });
  },
});

export const { clearPets, clearTypes, clearPet } = petsSlice.actions;

export const getPets = (state: RootState): Pet[] =>
  state.pets.pets.value?.animals || [];

export const getPetTypeInfoByTypeName =
  (type: AnimalType) =>
    (state: RootState): AnimalTypesDetails | null =>
      state.pets.types.value?.types.find(
        (typeInfo) => typeInfo.name.toLowerCase() === type
      ) || null;

export const getPet = (state: RootState): Pet | undefined =>
  state.pets.pet.value?.animal;

export const isPetDataPending = (state: RootState): boolean => state.pets.pet.status === "pending"

export default petsSlice.reducer;
