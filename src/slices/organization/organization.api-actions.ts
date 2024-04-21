import { createAsyncThunk } from "@reduxjs/toolkit";
import { OrganizationQueryParam } from "../../services/api/organization/organization.type";
import organizationService from "../../services/api/organization/organization.service";

export const getOrganizationAsync = createAsyncThunk(
  "organization/getOrganization",
  async (params?: OrganizationQueryParam) => {
    return organizationService.getOrganization(params);
  }
);
