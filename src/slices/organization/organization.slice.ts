import { createSlice } from "@reduxjs/toolkit";
import { OrganizationState } from "./organization.types";

const initialState: OrganizationState = {
  organizations: {
    status: "ready",
    value: null,
  },
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = organizationSlice.actions;

export default organizationSlice.reducer;
