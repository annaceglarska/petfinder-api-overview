import { createAsyncThunk } from "@reduxjs/toolkit";
import authApiService from "../../services/api/backend/auth/auth.service";

export const getPetfinderTokenAsync = createAsyncThunk(
  "config/getPetfinderToken",
  async () => {
    return authApiService.getPetfinderAuthorizationToken();
  }
);
