import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrganizationState } from "./organization.types";
import { getOrganizationAsync, getOrganizationsAsync } from "./organization.api-actions";
import { RootState } from "../../app/store";
import { Organization } from "../../services/api/petfinder/organization/organization.type";

const initialState: OrganizationState = {
  organizations: {
    status: "ready",
    value: null,
  },
  organization: {
    status: "ready",
    value: null,
  }
};

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    clearOrganizations: (state, _: PayloadAction) => {
      state.organizations.value = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationsAsync.pending, (state) => {
        state.organizations.status = "pending";
      })
      .addCase(getOrganizationsAsync.fulfilled, (state, action) => {
        state.organizations.status = "ready";
        state.organizations.value = action.payload || null;
      })
      .addCase(getOrganizationsAsync.rejected, (state) => {
        state.organizations.status = "failed";
      })
      .addCase(getOrganizationAsync.pending, (state) => {
        state.organization.status = "pending";
      })
      .addCase(getOrganizationAsync.fulfilled, (state, action) => {
        state.organization.status = "ready";
        state.organization.value = action.payload || null;
      })
      .addCase(getOrganizationAsync.rejected, (state) => {
        state.organization.status = "failed";
      });
  },
});

export const { clearOrganizations } = organizationSlice.actions;

export const getOrganizations = (state: RootState): Organization[] =>
  state.organization.organizations.value?.organizations || [];

export const getOrganization = (state: RootState): Organization | null => state.organization.organization.value?.organization || null;

export default organizationSlice.reducer;
