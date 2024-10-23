import { createAsyncThunk } from "@reduxjs/toolkit";
import petsApiService from "../../services/api/petfinder/pets/pets.service";
import {
  AnimalType,
  PetsQueryParams,
} from "../../services/api/petfinder/pets/pets.types";
import { RootState } from "../../app/store";

export const getPetsAsync = createAsyncThunk(
  "pets/getPets",
  async (_: undefined, redux) => {
    const store = (redux.getState() as RootState)
    const token: string | undefined = store.config
      .petfinderToken.value?.access_token;
    const queryParams: PetsQueryParams = store.pets.pets.queryParams || {}
    return petsApiService.getAnimals(queryParams, token);
  }
);

export const getPetTypesAsync = createAsyncThunk(
  "pets/getTypes",
  async (params: AnimalType | null, redux) => {
    const token: string | undefined = (redux.getState() as RootState).config
      .petfinderToken.value?.access_token;
    return petsApiService.getAnimalTypes(params, token);
  }
);

export const getPetAsync = createAsyncThunk(
  "pets/getPet",
  async (id: number | null, redux) => {
    const token: string | undefined = (redux.getState() as RootState).config
      .petfinderToken.value?.access_token;
    return petsApiService.getAnimalById(id, token);
  }
);
