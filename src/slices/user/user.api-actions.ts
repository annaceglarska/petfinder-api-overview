import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserCredential } from "./user.types";
import authApiService from "../../services/api/auth/auth.service";

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (userCredential: UserCredential) => {
    return authApiService.login(userCredential);
  }
);
