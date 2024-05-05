import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrganizationQueryParam } from "../../services/api/petfinder/organization/organization.type";
import organizationService from "../../services/api/petfinder/organization/organization.service";
import { RootState } from "../../app/store";

export const getOrganizationAsync = createAsyncThunk(
  "organization/getOrganization",
  async (params: OrganizationQueryParam, redux) => {
    const token: string | undefined = (redux.getState() as RootState).config
      .petfinderToken.value?.access_token;
    return organizationService.getOrganization(params, token);
  }
);
