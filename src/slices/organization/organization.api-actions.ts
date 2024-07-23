import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrganizationQueryParam } from "../../services/api/petfinder/organization/organization.type";
import organizationService from "../../services/api/petfinder/organization/organization.service";
import { RootState } from "../../app/store";

export const getOrganizationsAsync = createAsyncThunk(
  "organization/getOrganizations",
  async (params: OrganizationQueryParam, redux) => {
    const token: string | undefined = (redux.getState() as RootState).config
      .petfinderToken.value?.access_token;
    return organizationService.getOrganizations(params, token);
  }
);

export const getOrganizationAsync = createAsyncThunk("organization/getOrganization",
  async (id: string | undefined, redux) => {
    const token: string | undefined = (redux.getState() as RootState).config
      .petfinderToken.value?.access_token;
    return organizationService.getOrganizationById(id, token);
  }
)
