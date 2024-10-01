import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserCredential } from "./user.types";
import authApiService from "../../services/api/backend/auth/auth.service";
import axios from "axios";
import { RootState } from "../../app/store";
import { UserData } from "../../services/api/backend/auth/auth.types";
import userService from "../../services/api/backend/user/user.service";

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (userCredential: UserCredential) => {
    return authApiService.login(userCredential);
  }
);

export const protectedAsync = createAsyncThunk(
  "user/protected",
  async (_, redux) => {
    const token: string | undefined = (redux.getState() as RootState).user.user
      .value?.token;
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/test/protected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editUserDataAsync = createAsyncThunk(
  "user/edit",
  async (userUpdatedData: UserData, redux) => {
    const token: string | undefined = (redux.getState() as RootState).user.user
      .value?.token;
    return userService.editUserData(userUpdatedData, token || "");
  }
);

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (_, redux) => {
    const token: string | undefined = (redux.getState() as RootState).user.user
      .value?.token;
    return userService.getUserData(token);
  }
)
