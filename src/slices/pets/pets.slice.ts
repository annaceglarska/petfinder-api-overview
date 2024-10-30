import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PetsState } from "./pets.types";
import { PetsQueryParams } from "../../services/api/petfinder/pets/pets.types";
import { RootState } from "../../app/store";

const initialState: PetsState = {
  getPetsQueryParams: {}
};

export const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setPetsQueryParams: (state, value: PayloadAction<PetsQueryParams>) => {
      state.getPetsQueryParams = value.payload
    },
    clearPetsFilters: (state) => {
      state.getPetsQueryParams = {};
    }
  },
});

export const { setPetsQueryParams, clearPetsFilters } = petsSlice.actions;

export const getPetsFilters = (state: RootState): PetsQueryParams => state.pets.getPetsQueryParams || {};

export default petsSlice.reducer;
