import { createSlice } from "@reduxjs/toolkit";
import { OrganizationState } from "./organizations.types";

const initialState: OrganizationState = {};

export const organizationSlice = createSlice({
    name: "organizations",
    initialState,
    reducers: {},
});

export const { } = organizationSlice.actions;

export default organizationSlice.reducer;
