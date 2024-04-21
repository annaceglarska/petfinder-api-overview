import { createAsyncThunk } from "@reduxjs/toolkit";
import petsApiService from "../../services/api/pets/pets.service";
import {
  AnimalType,
  PetsQueryParams,
} from "../../services/api/pets/pets.types";

export const getPetsAsync = createAsyncThunk(
  "pets/getPets",
  async (params?: PetsQueryParams) => {
    return petsApiService.getAnimals(params);
  }
);

export const getPetTypesAsync = createAsyncThunk(
  "pets/getTypes",
  async (params?: AnimalType) => {
    return petsApiService.getAnimalTypes(params);
  }
);
