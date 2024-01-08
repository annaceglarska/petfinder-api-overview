import { createAsyncThunk } from "@reduxjs/toolkit";
import petsApiService from "../../services/api/pets/pets.service";
import { PetsQueryParams } from "../../services/api/pets/pets.types";

export const getPetsAsync = createAsyncThunk(
  "pets/getPets",
  async (params?: PetsQueryParams) => {
    return petsApiService.getAnimals(params);
  }
);
