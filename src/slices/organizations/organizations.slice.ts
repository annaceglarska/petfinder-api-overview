import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrganizationState } from "./organizations.types";
import { getOrganizationAsync, getOrganizationsAsync } from "./organizations.api-actions";
import { RootState } from "../../app/store";
import { Organization } from "../../services/api/petfinder/organizations/organizations.type";
import { Pagination } from "../../services/api/petfinder/pets/pets.types";

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
  name: "organizations",
  initialState,
  reducers: {
    clearOrganizations: (state, _: PayloadAction) => {
      state.organizations.value = null;
    },
    clearOrganization: (state, _: PayloadAction) => {
      state.organization.value = null;
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

export const { clearOrganizations, clearOrganization } = organizationSlice.actions;

export const getOrganizations = (state: RootState): Organization[] =>
  state.organization.organizations.value?.organizations || [];

export const isOrganizationsDataPending = (state: RootState): boolean => state.organization.organizations.status === 'pending';

export const getOrganizationsPaginationInfo = (state: RootState): Pagination | undefined => state.organization.organizations.value?.pagination

export const getOrganization = (state: RootState): Organization | null => state.organization.organization.value?.organization || null;

export const isOrganizationDataPending = (state: RootState): boolean => state.organization.organization.status === "pending";

export default organizationSlice.reducer;
