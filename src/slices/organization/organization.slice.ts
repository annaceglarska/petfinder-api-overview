import { createSlice } from "@reduxjs/toolkit";
import { OrganizationState } from "./organization.types";
import { getOrganizationAsync } from "./organization.api-actions";
import { RootState } from "../../app/store";
import { Organization } from "../../services/api/organization/organization.type";

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
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationAsync.pending, (state) => {
        state.organizations.status = "pending";
      })
      .addCase(getOrganizationAsync.fulfilled, (state, action) => {
        state.organizations.status = "ready";
        state.organizations.value = action.payload || null;
      })
      .addCase(getOrganizationAsync.rejected, (state) => {
        state.organizations.status = "failed";
      });
  },
});

export const {} = organizationSlice.actions;

export const getOrganizations = (state: RootState): Organization[] =>
  state.organization.organizations.value?.organizations || [];

export default organizationSlice.reducer;
