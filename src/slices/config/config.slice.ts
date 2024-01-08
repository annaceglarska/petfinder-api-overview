import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = configSlice.actions;

export default configSlice.reducer;
